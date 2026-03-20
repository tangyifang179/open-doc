# v1 API 获取表单数据列表

> API使用者，可以通过本接口，获取自己单个表单的数据列表

| 功能 | 免费版 | 专业版/专业增强版 | 企业基础版 | 企业协作版 | 企业高级版 |
| ------ | ------ | ------ | ------ | ------ | ------ |
| 获取表单数据列表 | | | ✔️ | ✔️ | ✔️ |


## 认证方式

[V1 Basic 认证方式](/api_v1/authentication)

## headers 设置

需要在请求中设置如下 headers

* `Content-Type: application/json`
* `Accept: application/json`
* `Authorization: 放入上一步骤生成的CODE`

## 接口说明

* 个人版用户/企业子账号用户，只可以获取 __自己创建__ 的表单数据。无法获取共享的表单。
* 企业全局 API，可以获取整个企业所有表单的数据。
* 数据过多时，接口会返回分页数据。每页 50 个。接口会返回下一页的标记。

## 接口描述

### Request

```
# 第一页
GET https://jinshuju.net/api/v1/forms/FORM_TOKEN/entries

# 如果数据过多，请求后续的数据
GET https://jinshuju.net/api/v1/forms/FORM_TOKEN/entries?next=
```

| 参数名称       | 是否必须 | 类型 | 说明                   |
|------------|------| ------ |----------------------|
| FORM_TOKEN | 是    | String | 表单Token              |
| created_at | 否    | String | 根据时间筛选数据，返回该时间点以后的数据 |
| next       | 否    | String | 分页参数。返回本次ID记录之后的数据   |

### 注意

> `created_at` 目前接受两种格式的时间，所有时间均为北京时间，且不支持时区

```json
{
    "created_at": "2012-12-25",    // 年月日
    "created_at": "2012-12-25 12:13:15"    // 包含时分秒
}
```

### Response

```json
{
    "total": 828,
    "count": 50,
    "data": [
        {
            "serial_number": 1,
            "field_1": "张三",
            "field_2": "13000000000",
            "info_filling_duration": 28,
            "creator_name": "",
            "created_at": "2020-08-28T08:00:00.000Z",
            "updated_at": "2020-08-28T08:00:00.000Z"
        },
        {
            "serial_number": 2,
            "field_1": "李四",
            "field_2": "13000000001",
            "info_filling_duration": 23,
            "creator_name": "子账号",
            "created_at": "2020-08-28T08:00:00.000Z",
            "updated_at": "2020-08-28T08:00:00.000Z"
        }
    ],
    "next": 51
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| total | 是 | Number | 表单数据总数 |
| count | 是 | Number | 本次请求返回的数据数量 |
| data | 是 | Array | 数据数组 |
| data[].serial_number | 是 | String | 数据序号（标识符） |
| data[].field_* | 是 | | 对应字段的值 |
| data[].info_filling_duration | 否 | Number | 本条数据的填写时长（Excel导入、API提交，此值为空） |
| data[].creator_name | 否 | String | 本条数据的填写者（仅对系统内录入数据有效） |
| data[].created_at | 是 | Date | 数据提交时间 |
| data[].updated_at | 是 | Date | 数据最后一次变更时间 |
| next | 否 | String | 分页参数。本次请求分页ID。可用于请求下一页数据 |

> 数据详细结构，请[参考文档](/api_v1/schemas/entry)

> 注意：数据中的日期时间，使用的是 UTC 时间（例如：`"2021-09-28T02:59:42.539Z"`），接受者需要自行转换为自己所需要的时区（例如北京时间）

## 示例代码

### 伪代码

```
api_key = "YOUR_API_KEY"
api_secret = "YOUR_API_SECRET"

credentials = api_key + ":" + api_secret

encoded_creadentials = base64_encode(credentials)

auth_header_payload = "Basic " + encoded_creadentials

headers = {"Authorization": auth_header_payload}

form_token = "YOUR_FORM_TOKEN"

http.get("https://jinshuju.net/api/v1/forms/${form_token}/entries", headers)
```

### HTTP

```http
GET https://jinshuju.net/api/v1/forms/$FORM_TOKEN/entries

Content-Type: application/json
Accept: application/json
Authorization: Basic BASE_64_ENCODED_CREDENTIALS
```

### Postman

```
GET https://jinshuju.net/api/v1/forms/$FORM_TOKEN/entries

authorization 选择 `Basic Auth`

Username 输入 API Key
Password 输入 API Secret
```

### Java

```java
package net.jinshuju.v1api.demo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;

public class GetFormEntriesService {

    public void run(String apiKey, String apiSecret, String formToken) throws IOException {
        String authHeaderPayload = getAuthHeaderPayload(apiKey, apiSecret);

        BufferedReader httpResponseReader = null;
        try {
            URL apiEndpointUrl = new URL("https://jinshuju.net/api/v1/forms/" + formToken + "/entries");
            HttpURLConnection urlConnection = (HttpURLConnection) apiEndpointUrl.openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.addRequestProperty("Authorization", authHeaderPayload);

            httpResponseReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));
            String lineRead;
            while ((lineRead = httpResponseReader.readLine()) != null) {
                System.out.println(lineRead);
            }
        } finally {
            if (httpResponseReader != null) {
                try {
                    httpResponseReader.close();
                } catch (IOException ignored) {
                }
            }
        }
    }

    private String getAuthHeaderPayload(String apiKey, String apiSecret) {
        String credentials = apiKey + ":" + apiSecret;

        String base64EncodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());
        return "Basic " + base64EncodedCredentials;
    }

}

```

### Python

```python
import requests

api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'

form_token = 'YOUR_FORM_TOKEN'

api_endpoint_url = 'https://jinshuju.net/api/v1/forms/' + form_token + '/entries

response = requests.get(api_endpoint_url, auth = (api_key, api_secret))

print(response.text)
```

### Ruby

```ruby
require 'net/http'
require 'uri'

form_token = 'YOUR_FORM_TOKEN'

uri = URI.parse("https://jinshuju.net/api/v1/forms/#{form_token}/entries")
api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'

request = Net::HTTP::Get.new(uri)
request.basic_auth(api_key, api_secret)

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
  http.request(request)
end

puts(response.body)
```
