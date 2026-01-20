# 金数据 URL 传参 - 全局字段 URL 传参

## 概述

在你的填表人打开金数据表单之前，可能已经经过了你的其他系统的身份认证和权限校验，或者你的其他系统的一些数据收集。如果你希望在填表人打开表单时，将这些信息传入到金数据表单中，无需填表人再次手工输入，可以使用金数据 __全局字段 URL 传参功能__ 。

__全局字段 URL 传参功能__ 与 __表单字段 URL 传参功能__ 不同的是，__全局字段 URL 传参功能__ 不需要在表单上提前创建需要传入数据的字段。

## 格式

`https://jinshuju.net/f/TOKEN?cusd=$JWT$`

其中，传入数据的 key 为 `cusd`。`$JWT$`是 JWT 编码字符串。原始数据格式为 `{"gf_1": "value_1", "gf_2": "value_2"}`

## 特点

* 不需要在表单上配置
* 支持传入多个字段的值
* 传入的数据，以原始字符串的格式保存
* 支持带有签名校验，防止篡改
* 不同的表单，全局字段的类型和 API CODE 相同

## 注意事项

* 当企业配置了「全局字段」后，企业中所有子账户创建的表单（含历史表单），都会自动添加「全局字段」。
  * 该字段只能通过参数传入，填表人在填写表单时不可见
  * 所有的表单，都支持给「全局字段」传参
* 「全局字段」暂不支持自行删除或变更，如需删除或变更请联系金数据客户成功经理协助操作

## 如何配置

__使用方法__

1. 将需要传入的数据配置为 JSON String 格式 `{"gf_1": "value_1", "gf_2": "value_2"}`
2. 使用企业的密钥（sign_secret）生成 JWT String
3. 将 JWT String 放入 表单 URL 参数中

> 注：目前只有企业高级版可以使用密钥，请联系你的客户成功经理

> 注意：JWT 编码字符串，只对原始数据做了签名，并未做加密，所以请勿传递私密信息

## 示例代码

### Python

```python
import jwt

sign_secret = "123456"

payload = {"gf_1": "张三", "gf_2": '研发部'}

encoded_jwt = jwt.encode(payload, sign_secret, algorithm="HS256")

form_token = "YOUR_FORM_TOKEN"

final_url = "https://jinshuju.net/f/" + form_token + "?cusd=" + encoded_jwt

print(final_url)
```

### Ruby

```ruby
require 'jwt'

sign_secret = '123456'

payload = {gf_1: '张三', gf_2: '研发部'}

jwt_string = JWT.encode(payload, sign_secret, 'HS256')

final_url = "https://jinshuju.net/f/TOKEN?cusd=#{jwt_string}"

print final_url
```
