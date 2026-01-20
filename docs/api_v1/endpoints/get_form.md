# v1 API 获取表单详细结构

> API使用者，可以通过本接口，获取单个表单的详细接口（字段 Schema）

| 功能 | 免费版 | 专业版/专业增强版 | 企业基础版 | 企业协作版 | 企业高级版 |
| ------ | ------ | ------ | ------ | ------ | ------ |
| 获取表单详细结构 | | | ✔️ | ✔️ | ✔️ |

## 认证方式

[V1 Basic 认证方式](api_v1/authentication)

## headers 设置

需要在请求中设置如下 headers

* `Content-Type: application/json`
* `Accept: application/json`
* `Authorization: 放入上一步骤生成的CODE`

## 接口说明

* 个人版用户/企业子账号用户，只可以获取 __自己创建__ 的表单。无法获取共享的表单。
* 企业全局 API，可以获取整个企业所有的表单。

## 接口描述

### Request

```
GET https://jinshuju.net/api/v1/forms/FORM_TOKEN
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| FORM_TOKEN | 是 | String | 表单Token |

### Response

```json
{
    "name": "产品需求调研表",
    "description": "感谢您能抽出几分钟时间填写以下内容，现在我们马上开始吧！",
    "fields": [
        {
            "field_1": {
                "label": "姓名",
                "type": "single_line_text",
                "notes": "",
                "private": false,
                "validation": {}
            },
        },
        {
            "field_2": {
                "label": "手机",
                "type": "mobile",
                "notes": "",
                "private": false,
                "validation": {}
            }
        }
    ]
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| name | 是 | String | 表单标题 |
| description | 是 | String | 表单描述 |
| fields | 是 | Array | 表单字段数据 |
| field_* | 是 | String | 字段标识符（Key） |
| field_*.label | 是 | String | 字段标题 |
| field_*.type | 是 | String | 字段类型 |
| field_*.notes | 是 | String | 字段提示 |
| field_*.private | 是 | Bool | 字段隐藏 |
| field_*.validation | 否 | Object | 字段校验信息 |

> 字段详细数据，请[参考文档](api_v1/schemas/field)

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

http.get("https://jinshuju.net/api/v1/forms/${form_token}", headers)
```

### HTTP

```http
GET https://jinshuju.net/api/v1/forms/$FORM_TOKEN

Content-Type: application/json
Accept: application/json
Authorization: Basic BASE_64_ENCODED_CREDENTIALS
```

### Postman

```
GET https://jinshuju.net/api/v1/forms/$FORM_TOKEN

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

public class GetFormService {

    public void run(String apiKey, String apiSecret, String formToken) throws IOException {
        String authHeaderPayload = getAuthHeaderPayload(apiKey, apiSecret);

        BufferedReader httpResponseReader = null;
        try {
            URL apiEndpointUrl = new URL("https://jinshuju.net/api/v1/forms/" + formToken);
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

api_endpoint_url = 'https://jinshuju.net/api/v1/forms/' + form_token

response = requests.get(api_endpoint_url, auth = (api_key, api_secret))

print(response.text)
```

### Ruby

```ruby
require 'net/http'
require 'uri'

form_token = 'YOUR_FORM_TOKEN'

uri = URI.parse("https://jinshuju.net/api/v1/forms/#{form_token}")
api_key = 'YOUR_API_KEY'
api_secret = 'YOUR_API_SECRET'

request = Net::HTTP::Get.new(uri)
request.basic_auth(api_key, api_secret)

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
  http.request(request)
end

puts(response.body)
```
