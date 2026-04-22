# v1 API 创建表单

> API使用者，可以通过本接口，创建一个新的表单，并配置字段

| 功能 | 免费版 | 专业版/专业增强版 | 企业基础版 | 企业协作版 | 企业高级版 |
| ------ | ------ | ------ | ------ | ------ | ------ |
| 创建表单 | | | ✔️ | ✔️ | ✔️ |

## 认证方式

[V1 Basic 认证方式](/api_v1/authentication)

## headers 设置

需要在请求中设置如下 headers

* `Content-Type: application/json`
* `Accept: application/json`
* `Authorization: 放入上一步骤生成的CODE`

## 接口说明

* 个人版用户/企业子账号用户，以自己身份创建表单。
* 企业全局 API，以企业 owner 身份创建表单。
* 可选地将新表单放入某个文件夹，需传入该文件夹的 token（`folder_id` 参数同时兼容文件夹 id 与 token）。

## 接口描述

### Request

```
POST https://jinshuju.net/api/v1/forms

{
    "name": "产品需求调研表",
    "description": "感谢您能抽出几分钟时间填写以下内容",
    "fields": [
        { "type": "TextField", "label": "姓名", "required": true },
        { "type": "MobileField", "label": "手机号" },
        {
            "type": "RadioButton",
            "label": "您对产品的整体评价",
            "choices": [
                { "value": "非常满意" },
                { "value": "满意" },
                { "value": "一般" },
                { "value": "不满意" }
            ]
        }
    ],
    "setting": { "success_message": "感谢您的反馈！" },
    "folder_id": "aZ9bQ3"
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| name | 是 | String | 表单标题 |
| fields | 是 | Array | 字段定义数组，至少一个字段 |
| fields[].type | 是 | String | 字段类型，见下方「支持的字段类型」 |
| fields[].label | 是 | String | 字段标题 |
| fields[].required | 否 | Bool | 是否必填（默认 false） |
| fields[].private | 否 | Bool | 是否隐藏字段（默认 false），与 required 互斥 |
| fields[].notes | 否 | String | 字段描述/提示文字 |
| fields[].choices | 否 | Array | 选项数组（仅适用于选择类字段） |
| fields[].choices[].value | 是 | String | 选项展示值 |
| fields[].choices[].quota | 否 | Number | 选项可选配额上限 |
| fields[].rating_max | 否 | Number | 评分字段最大分（支持 3/5/10，默认 5） |
| fields[].init_row_length | 否 | Number | 表格题初始行数（1-5，默认 3） |
| fields[].dimensions | 否 | Array | 表格题列定义 |
| description | 否 | String | 表单描述 |
| setting.success_message | 否 | String | 提交成功后展示的消息 |
| folder_id | 否 | String | 文件夹 id 或 token；设置后新表单会放入该文件夹 |

#### 支持的字段类型

`TextField` `TextArea` `NumberField` `EmailField` `MobileField` `IdCardField` `NameField` `RadioButton` `CheckBox` `DropDown` `DateTimeField` `RatingField` `TableField`

表格题（TableField）的列可选类型：`TextField` `TextArea` `NumberField` `EmailField` `MobileField` `IdCardField` `NameField` `CheckBox` `DropDown` `DateTimeField` `RatingField`

### Response

```json
{
    "name": "产品需求调研表",
    "description": "感谢您能抽出几分钟时间填写以下内容",
    "fields": [
        {
            "field_1": {
                "label": "姓名",
                "type": "single_line_text",
                "notes": "",
                "private": false,
                "validation": { "required": true }
            }
        },
        {
            "field_2": {
                "label": "手机号",
                "type": "mobile",
                "notes": "",
                "private": false,
                "validation": {}
            }
        }
    ]
}
```

响应结构与[获取单个表单结构](/api_v1/endpoints/get_form)相同。

### 状态码

| 状态码 | 说明 |
| ------ | ------ |
| 201 | 创建成功 |
| 400 | 参数校验失败（name 或 fields 为空、字段类型非法等） |
| 401 | 未认证 |
| 402 | 当前套餐不支持 V1 API |
| 404 | 指定的 folder_id 不存在，或当前账号无权管理该文件夹 |

## 示例代码

### 伪代码

```
api_key = "YOUR_API_KEY"
api_secret = "YOUR_API_SECRET"

credentials = api_key + ":" + api_secret
encoded_credentials = base64_encode(credentials)
auth_header_payload = "Basic " + encoded_credentials
headers = {"Authorization": auth_header_payload, "Content-Type": "application/json"}

body = {
  "name": "产品需求调研表",
  "fields": [{"type": "TextField", "label": "姓名", "required": true}]
}

http.post("https://jinshuju.net/api/v1/forms", headers, body)
```

### HTTP

```http
POST https://jinshuju.net/api/v1/forms

Content-Type: application/json
Accept: application/json
Authorization: Basic BASE_64_ENCODED_CREDENTIALS

{
  "name": "产品需求调研表",
  "fields": [{"type": "TextField", "label": "姓名", "required": true}]
}
```

### Postman

```
POST https://jinshuju.net/api/v1/forms

authorization 选择 `Basic Auth`
Username 输入 API Key
Password 输入 API Secret

Body (raw, JSON):
{
  "name": "产品需求调研表",
  "fields": [{"type": "TextField", "label": "姓名", "required": true}]
}
```

### Python

```python
import requests

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'

payload = {
    "name": "产品需求调研表",
    "fields": [{"type": "TextField", "label": "姓名", "required": True}]
}

response = requests.post(
    'https://jinshuju.net/api/v1/forms',
    auth=(api_key, api_secret),
    json=payload
)

print(response.text)
```

### Ruby

```ruby
require 'net/http'
require 'uri'
require 'json'

uri = URI.parse('https://jinshuju.net/api/v1/forms')
api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'

payload = {
  name: '产品需求调研表',
  fields: [{ type: 'TextField', label: '姓名', required: true }]
}

request = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json')
request.basic_auth(api_key, api_secret)
request.body = payload.to_json

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
  http.request(request)
end

puts(response.body)
```
