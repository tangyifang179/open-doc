---
sidebar_label: Tools 列表
title: MCP Tools 列表
---

# MCP Tools 列表

金数据 MCP Server 提供以下 Tools，供 AI 助手调用。

## 表单相关

### list_forms

列出当前认证用户可访问的表单列表，支持分页。

| 参数 | 类型 | 必填 | 说明 |
| ------ | ------ | ------ | ------ |
| `name` | string | 否 | 按表单名称筛选（支持正则匹配） |
| `next` | string | 否 | 分页游标，用于获取下一页 |
| `limit` | integer | 否 | 每页返回数量，默认 50 |

**所需 scope**：`forms`

---

### get_form

获取指定表单的详细信息，包括字段结构。

| 参数 | 类型 | 必填 | 说明 |
| ------ | ------ | ------ | ------ |
| `token` | string | 是 | 表单的 token 或 ID |

**所需 scope**：`forms`

---

### create_form

创建一个新表单。

| 参数 | 类型 | 必填 | 说明 |
| ------ | ------ | ------ | ------ |
| `title` | string | 是 | 表单标题 |
| `description` | string | 否 | 表单描述 |
| `fields` | array | 是 | 字段定义数组 |
| `setting` | object | 否 | 表单设置（如提交成功提示语） |

**字段定义（fields 数组中的每项）：**

| 参数 | 类型 | 必填 | 说明 |
| ------ | ------ | ------ | ------ |
| `type` | string | 是 | 字段类型 |
| `label` | string | 是 | 字段标题 |
| `required` | boolean | 否 | 是否必填，默认 false |
| `choices` | array | 否 | 选项（用于单选、多选、下拉等） |
| `notes` | string | 否 | 字段说明 |

**支持的字段类型：** `TextField`（单行文本）、`TextArea`（多行文本）、`RadioButton`（单选）、`CheckBox`（多选）、`DropDown`（下拉）、`NumberField`（数字）、`EmailField`（邮箱）、`DateTimeField`（日期时间）、`MobileField`（手机号）、`RatingField`（评分）等。

**所需 scope**：`forms`

## 数据相关

### list_entries

列出指定表单的数据列表，支持分页和按创建时间筛选。

| 参数 | 类型 | 必填 | 说明 |
| ------ | ------ | ------ | ------ |
| `form_token` | string | 是 | 表单的 token 或 ID |
| `next` | integer | 否 | 分页游标（serial_number），用于获取下一页 |
| `created_at` | string | 否 | 筛选此时间之后创建的数据（ISO 8601 格式） |

**所需 scope**：`read_entries`

---

### get_entry

获取指定表单中的单条数据详情。

| 参数 | 类型 | 必填 | 说明 |
| ------ | ------ | ------ | ------ |
| `form_token` | string | 是 | 表单的 token 或 ID |
| `serial_number` | integer | 是 | 数据的序列号 |

**所需 scope**：`read_entries`

---

### create_entry

向指定表单新增一条数据。

| 参数 | 类型 | 必填 | 说明 |
| ------ | ------ | ------ | ------ |
| `form_token` | string | 是 | 表单的 token 或 ID |
| `entry` | object | 是 | 数据内容，字段值以 API code 为 key（如 `field_1`、`field_2`） |

数据格式参考：[数据结构说明(POST)](/docs/api_v1/schemas/entry_post)

**所需 scope**：`write_entries`

---

### update_entry

修改指定表单中的一条数据。支持全量替换（PUT）和部分更新（PATCH）。

| 参数 | 类型 | 必填 | 说明 |
| ------ | ------ | ------ | ------ |
| `form_token` | string | 是 | 表单的 token 或 ID |
| `serial_number` | integer | 是 | 数据的序列号 |
| `entry` | object | 是 | 数据内容，字段值以 API code 为 key |
| `is_put` | boolean | 否 | 为 true 时全量替换（PUT），为 false 时部分更新（PATCH），默认 false |

**所需 scope**：`write_entries`

---

### delete_entry

删除指定表单中的一条数据。

| 参数 | 类型 | 必填 | 说明 |
| ------ | ------ | ------ | ------ |
| `form_token` | string | 是 | 表单的 token 或 ID |
| `serial_number` | integer | 是 | 数据的序列号 |

**所需 scope**：`write_entries`

## 账单相关

### list_invoices

查询当前用户的电子发票和未开票金额。

无需传入参数。

**所需 scope**：`public`

---

### list_payment_histories

查询当前用户的付款记录。支持按日期范围和类型筛选。

| 参数 | 类型 | 必填 | 说明 |
| ------ | ------ | ------ | ------ |
| `start_date` | string | 否 | 开始日期（YYYY-MM-DD） |
| `end_date` | string | 否 | 结束日期（YYYY-MM-DD） |
| `verb` | string | 否 | 按交易类型筛选 |
| `limit` | integer | 否 | 最大返回条数，默认 50，最大 1000 |
| `include_balance` | boolean | 否 | 是否返回当前余额和配额，默认 false |

**所需 scope**：`public`
