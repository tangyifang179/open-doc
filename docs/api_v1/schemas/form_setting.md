# API V1 表单设置 Schema

> 通过 [编辑表单](/api_v1/endpoints/update_form) / [创建表单](/api_v1/endpoints/create_form) / [获取表单](/api_v1/endpoints/get_form) 等接口，以及 MCP `edit_form` / `get_form` / `create_form` 工具，都可以使用下面的表单设置字段。读写 key 保持一致；omitted 的 key 不会被修改。

所有字段都位于请求/响应的 `setting` 对象下（除提及的除外）。

```json
{
    "setting": {
        "entry_submit_mode": "show_message",
        "success_message": "感谢您的反馈！",
        "success_redirect_url": "https://example.com/thanks",
        "success_redirect_fields": ["field_1"],
        "show_entry_on_success": true,
        "show_entry_on_success_button_text": "查看我的提交",
        "edit_entry_on_success": false,
        "show_serial_number_on_success": true,
        "show_submit_again": true,
        "hide_login_and_signup": false,

        "manually_close_rule": { "closed": false },
        "by_time_range_close_rule": {
            "start_time": "2026-05-01T09:00:00+08:00",
            "end_time": "2026-05-31T18:00:00+08:00"
        },
        "by_entries_close_rule": { "limit": 200 },
        "show_close_count_down": true,
        "show_form_before_open": false,

        "fill_frequency": {
            "fill_type": "repeatable",
            "condition": "by_ip",
            "cycle_period": "every_day",
            "cycles_per_period": 1,
            "limited_time": 3,
            "limited_field_api_codes": []
        },

        "password_required": true,
        "access_password": "abc123",
        "allowed_audience": "public",

        "entry_post_url": "https://example.com/webhook",
        "post_new_entry": true,
        "post_updated_entry": false
    }
}
```

## 提交后行为

| 参数名称 | 类型 | 说明 |
| ------ | ------ | ------ |
| entry_submit_mode | String | 提交成功后的行为；可选值：`show_message`（展示成功文案，默认）、`redirect`（跳转到 `success_redirect_url`）、`reports`（评估类场景使用）、`exam_score`（考试分数场景使用）。当 `success_redirect_url` 非空时自动切换为 `redirect`。 |
| success_message | String | 提交成功后展示的纯文本文案。 |
| success_message_rich_text | String | 富文本（HTML）格式的成功文案；需套餐支持。 |
| success_redirect_url | String | 提交后跳转的 URL；设置非空值后 `entry_submit_mode` 自动变为 `redirect`；需套餐支持。绑定到 `jinshujuapp.com` 子域名后不可修改。 |
| success_redirect_fields | Array\<String\> | 追加到跳转 URL 上的字段 `api_code` 列表；受套餐配额限制。 |
| show_entry_on_success | Bool | 是否在成功页显示已提交数据。 |
| show_entry_on_success_button_text | String | "查看已提交数据"按钮文案。 |
| edit_entry_on_success | Bool | 是否允许在成功页编辑刚提交的数据。 |
| show_serial_number_on_success | Bool | 是否在成功页显示数据编号。 |
| show_submit_again | Bool | 是否显示"再填一次"按钮。 |
| hide_login_and_signup | Bool | 是否在成功页隐藏登录/注册入口。（v1 API 独有；MCP 工具不暴露）|

## 表单状态（发布 / 停止收集）

`manually_close_rule`、`by_time_range_close_rule`、`by_entries_close_rule` 三类关闭规则互斥：保存任一类都会导致其他已有规则被清除。提交 `manually_close_rule: { closed: false }` 而当前并无手动关闭规则时不会创建空规则，也不会清其他规则。

| 参数名称 | 类型 | 说明 |
| ------ | ------ | ------ |
| manually_close_rule.closed | Bool | `true`：手动停止收集；`false`：开放收集。 |
| by_time_range_close_rule.start_time | ISO 8601 时间串 | 表单开放时间（可选；至少要提供 `start_time` 或 `end_time` 其一）。 |
| by_time_range_close_rule.end_time | ISO 8601 时间串 | 表单停止收集时间。 |
| by_entries_close_rule.limit | Integer | 达到该提交数后自动停止收集。 |
| show_close_count_down | Bool | 在表单上显示关闭倒计时；需配合 `by_time_range_close_rule` 或 `daily_repeat_close_rule`，否则保存时会被静默重置为 `false`。 |
| show_form_before_open | Bool | 未到开放时间前是否预览表单；同上需配合时间类关闭规则。 |

## 提交限制（次数 / IP / 字段限填）

`fill_frequency` 是嵌入对象，用于限制每个"提交者"在给定周期内可以提交的次数。

| 参数名称 | 类型 | 说明 |
| ------ | ------ | ------ |
| fill_frequency.fill_type | String | `unlimited` 取消限制；`once` 每个提交者只能提交一次；`repeatable` 每个提交者在 `cycle_period` 内最多提交 `limited_time` 次；`repeatable_by_day` 按天限次；`custom_repeatable` 自定义 `cycles_per_period` 个 `cycle_period` 内可提交 `limited_time` 次。 |
| fill_frequency.condition | String | 如何识别"同一个提交者"；可选：`by_ip`（按客户端 IP）、`by_device`（按浏览器 client id）、`by_weixin`（按微信 openid）、`by_fields`（按字段值组合）；留空则按登录用户识别。 |
| fill_frequency.cycle_period | String | 周期单位：`every_hour` / `every_day`（默认） / `every_week` / `every_month`；仅在 `repeatable` / `custom_repeatable` 下生效。 |
| fill_frequency.cycles_per_period | Integer | 自定义周期中的周期数（范围 1–1000）；仅在 `custom_repeatable` 下生效。 |
| fill_frequency.limited_time | Integer | 每个周期内允许的最大次数；必须大于 0。 |
| fill_frequency.limited_field_api_codes | Array\<String\> | `condition=by_fields` 时用于去重的字段 `api_code` 列表；此模式下必填，否则请求会被拒绝。 |

## 权限 / 可见性

| 参数名称 | 类型 | 说明 |
| ------ | ------ | ------ |
| password_required | Bool | 是否启用访问密码。设为 `true` 时必须同请求提供 `access_password`，或表单已有存储的密码，否则请求被拒绝。设为 `false` 会自动清空 `access_password`。 |
| access_password | String | 访问表单所需密码，仅当 `password_required=true` 时生效。若要在启用密码的同时清空密码，请改发 `password_required=false`。 |
| allowed_audience | String | 可见人群：`public`（所有人）、`internal`（企业成员，需套餐支持）、`private`（仅表单角色成员）、`gd_user_only`（任意已登录金数据用户）、`weixin_followers_only` / `weixin_qiye_followers_only`（需微信绑定）。切换到 `public` 时若 `fill_frequency` 使用的是提交人身份字段做限制，服务端会自动将 `fill_frequency.fill_type` 重置为 `unlimited`。`submitter_only` 还需要额外的成员组配置，本接口不涉及。 |

## Webhook / 集成

| 参数名称 | 类型 | 说明 |
| ------ | ------ | ------ |
| entry_post_url | String | Webhook 接收地址。传空字符串可以清除（即关闭 webhook）。Webhook 的实际投递仍受套餐限制。 |
| post_new_entry | Bool | 是否在新建数据时触发 webhook（默认 `true`）。设为 `false` 可在保留地址的同时暂停新建触发。 |
| post_updated_entry | Bool | 是否在更新数据时触发 webhook（默认 `false`）。 |

## 通知规则（notification_rules）

`setting.notification_rules` 用于配置企微 / 钉钉 / Webhook 类高级通知规则。每条规则在表单提交后触发，把数据推送到指定地址。

> **REPLACE 语义**：`update` 接口里只要传了 `notification_rules` 字段（哪怕是空数组 `[]`），都会先**清空当前 API 创建的所有通知规则**再重建。如不希望覆盖现有规则，请省略 `notification_rules` 字段；后台手工配置的规则不会被清。

```json
"notification_rules": [
  {
    "approach": "WXWORK",
    "url": "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx",
    "content": "新报名：{{field_1}}（{{field_2}}）",
    "trigger_scope": "all_new",
    "enabled": true
  },
  {
    "approach": "DING_TALK",
    "url": "https://oapi.dingtalk.com/robot/send?access_token=xxx",
    "mentioned_mobile_list": ["13800000000"],
    "trigger_scope": "all_new"
  }
]
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| approach | 是 | String | 通知方式：`WXWORK`（企业微信）、`DING_TALK`（钉钉）、`WEBHOOK`（自定义 Webhook） |
| url | 是 | String | 接收地址。每种 approach 对应固定的目标平台 URL 格式 |
| content | 否 | String | 通知正文模板。可使用 `{{field_X}}` 引用字段值 |
| trigger_scope | 否 | String | 触发范围。默认 `all_new`（每条新提交都触发） |
| mentioned_mobile_list | 否 | Array&lt;String&gt; | 被提及的手机号列表（仅 `DING_TALK` 等支持 `@` 用户的渠道有效） |
| enabled | 否 | Bool | 是否启用。默认 `true` |

> 短信、邮件、微信一次性订阅等需要收件人 / 模板的通知形式（`SMS` / `EMAIL` / `WEIXIN_ONETIME` 等）目前不支持通过 v1 API 配置，需登录后台或使用专门的接口。

## 错误处理

下列校验失败都会返回 `400 Bad Request`，错误信息中会直接说明问题所在（可直接给 Agent 做反馈）：

- `password_required=true` 但既没传 `access_password` 也无已存储密码
- `fill_frequency.condition=by_fields` 但 `limited_field_api_codes` 为空
- `by_time_range_close_rule.start_time` 和 `end_time` 同时为空
- `by_time_range_close_rule.end_time < start_time`
- `fill_frequency.fill_type=repeatable` / `custom_repeatable` 但 `limited_time ≤ 0`
- `fill_frequency.cycles_per_period` 超出 [1, 1000]
