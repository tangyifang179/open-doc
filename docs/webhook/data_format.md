# Webhook 数据格式

## 概述

Webhook 将会使用 HTTP Post 的方式，发送请求到表单对应配置的服务器地址。

Post 的数据格式如下：

```json
{
  "form": "ABC123",
  "form_name": "表单标题",
  "entry": {
    // 数据详情
  }
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| form | 是 | String | 表单 Token 标识符 |
| form_name | 是 | String | 表单标题 |
| entry | 是 | Hash | 新增或者修改后的数据详情 |

## 字段具体数据格式

```json
{
  "form": "ABC123",    // 表单 Token 标识符
  "form_name": "表单标题",    // 表单标题
  "entry": {    // 推送的数据
    "serial_number": 59,    // 序号（数据唯一标识符）
    "total_price": 0,    // 支付总金额（当表单有商品字段和支付时）
    "field_1": "一行文字",    // 单行文字
    "field_2": "第一行\r\n第二行",    // 多行文字
    "field_3": "选项 A",    // 单项选择
    "field_4": [    // 多项选择
      "选项 A",
      "选项 B",
      "选项 C"
    ],
    "field_5": "图片 A",    // 图片单选
    "field_6": [    // 图片多选
      "图片 A",
      "图片 B"
    ],
    "field_7": "选项 A",    // 下拉框
    "field_8": {    // 多级下拉框
      "level_1": "一级选项 1",
      "level_2": "二级选项 2"
    },
    "field_9": 1215,    // 数字字段
    "field_10": [    // 数组。支持多个附件
      "https://gd-pri.jinshujufiles.com/en/ABC123/image.jpg?TOKEN"    // 附件地址
    ],    // 上传文件
    "field_11": "12:15",    // 时间
    "field_12": "2012-12-15 12:13:14",    // 日期
    "field_13": "https://jinshuju.net",    // 网址
    "field_14": {    // 地理信息
      "latitude": "34.341568",
      "longitude": "108.940174",
      "address": "陕西省西安市雁塔区高新五路4号汇诚国际大厦"
    },
    "field_15": [    // 配图商品
      {
        "name": "配图商品 A",
        "number": 100
      },
      {
        "name": "配图商品 B",
        "number": 10
      }
    ],
    "field_16": [    // 无图商品
      {
        "name": "无图商品 A",
        "number": 20
      },
      {
        "name": "无图商品 B",
        "number": 2
      }
    ],
    "field_17": "金数据",    // 姓名
    "field_18": "13888888888",    // 手机
    "field_19": "test@jinshuju.net",    // 邮件
    "field_20": "029-88888888",    // 电话
    "field_21": {    // 地址
      "province": "陕西省",    // 地址字段：省
      "city": "西安市",    // 地址字段：市
      "district": "雁塔区",    // 地址字段：区
      "street": "高新五路4号汇诚国际大厦16层"    // 地址字段：详细地址
    },
    "field_22": [    // 矩阵填空
      {
        "statement": "题目1",    // 第一个题目
        "dimensions": {    // 对应项目
          "项目A": "白日依山尽",
          "项目B": "正确",
          "项目C": "12345"
        }
      },
      {
        "statement": "题目2",
        "dimensions": {
          "项目A": "黄河入海流",
          "项目B": "错误"
        }
      },
      {
        "statement": "题目3",
        "dimensions": {}
      }
    ],
    "field_23": [    // 矩阵单选
      {
        "statement": "题目1",    // 题目
        "choice": "选项A"    // 选项
      },
      {
        "statement": "题目2",
        "choice": "选项B"
      },
      {
        "statement": "题目3",
        "choice": "选项C"
      }
    ],
    "field_24": [    // 表格字段。数组，每个元素为表格字段中的一行
      {
        "项目A": "11",    // 第一行
        "项目B": "22",
        "项目C": "33"
      },
      {
        "项目A": "44",    // 第二行
        "项目B": "55",
        "项目C": "66"
      }
    ],
    "field_33": [    // 矩阵量表
      {
        "statement": "题目1",
        "dimensions": {
          "评分": "4"
        }
      },
      {
        "statement": "题目2",
        "dimensions": {
          "评分": "3"
        }
      },
      {
        "statement": "题目3",
        "dimensions": {
          "评分": "3"
        }
      }
    ],
    "field_34": {    // 横向填空
      "field_1": "白日依山尽",
      "field_2": "黄河入海流"
    },
    "field_25": "员工张三",    // 表单关联字段
    "field_25_associated_field_2": "13888888888",    // 表单关联展示字段
    "field_26": "8",    // 评分字段
    "field_27": 8,    // NPS 字段
    "field_28": [    //排序字段
      {
        "rank": 1,
        "choice": "选项B"
      },
      {
        "rank": 2,
        "choice": "选项A"
      },
      {
        "rank": 3,
        "choice": "选项C"
      }
    ],
    "field_29": "https://gd-pri.jinshujufiles.com/ABC123_field_29_1633512345.0978332_signature.png?TOKEN",    // 签名字段
    "field_30": {    // 语音字段
      "url": "https://gd-pri.jinshujufiles.com/ABC123_field_30_1755051534.webm?TOKEN",
      "audio_text": "Hello, World"
    },
    "field_31": 2,    // 计算字段。计算结果
    "gen_code": "699745239963",    // 确认码。（当表单开启了确认码功能时）
    "x_field_1": "",    // 扩展字段。（当表单收集到扩展属性字段数据时）
    "creator_name": "张三",    // 提交人。（当数据是内部提交时）
    "created_at": "2021-09-28T02:59:42.539Z",    // 提交时间。（注意：UTC 时间）
    "updated_at": "2021-09-28T03:41:31.995Z",    // 最后修改时间。（注意：UTC 时间）
    "info_filling_duration": 213,    // 提交时长。（单位：秒）
    "info_platform": "iPhone",    // 填写设备
    "info_os": "iOS 14.8",    // 操作系统
    "info_browser": "Wechat Browser 8.0.13",    // 浏览器
    "info_region": {    //填写地区
      "country": "中国",
      "province": "陕西省",
      "city": "西安市",
      "country_iso_code": "CN"
    },
    "info_remote_ip": "114.114.114.114"    // IP 地址
  }
}
```

> 注意：数据中的日期时间，使用的是 UTC 时间（例如：`"2021-09-28T02:59:42.539Z"`），接受者需要自行转换为自己所需要的时区（例如北京时间）

## 数据推送示例
例如指定 URL 为 http://url.com/jinshuju/callback 则金数据以 JSON 格式 POST 该数据的 Entry 信息。
发送的 JSON 数据以字段的 Key 来展示，字段对照表将列出 Key 与 Label 的对应关系
```json
POST http://url.com/jinshuju/callback
Content-Type: application/json
X-Requested-By: jinshuju
```

```json
{
    "form": "xJfeTv",
    "entry": {
        "field1": 123,
        "field2": "Hello, World",
        "field3": "It's very good."
    }
}
```
## Outboard IP List
金数据服务器出口 IP 列表。如果你对接的服务器有 IP 白名单限制，请将以下对应 IP 地址加入白名单中。
```
jinshuju.net

52.82.74.116
52.82.89.22
52.82.100.17
54.223.160.170 (2019年6月19日0时弃用)
54.223.152.10 (2019年6月19日0时弃用)
```
## 注意事项

1. 多级下拉框字段只在金数据企业版中支持，二级下拉框字段在金数据个人版中支持。
2. 计算字段仅在金数据企业版中支持，金数据个人版中不支持。
3. 以下情况修改的数据都会推送：
    - 通过对外查询、结果分享修改的数据。
    - 通过数据页面后台修改的数据。
4. 除去服务器返回异常外，以下几种情况会无法接收数据：
    - 数据推送在推送高峰期时会出现排队的情况，具体时间视排队情况而定。
    - 如果表单配置了商品字段和支付方式，用户提交表单并且未付款的数据。
    - 之前开启了推送且接受了数据，但服务器未返回 2xx 状态码导致重连失败。
    - 你的服务器是否设定了 IP 地址白名单且我们的 IP 不在名单内。
