# API V1 数据结构 Schema

通过 API 获取表单数据时，每条数据会返回如下类似结果：

```json
{
    "token":"kjFelJqi"   //唯一值，数据标识符
    "serial_number": 36,    // 序号（数据标识符）
    "total_price": 0,    // 总价（如果有商品时）
    "field_1": "一行文字",    // 单行文字
    "field_2": "多行文字第一行\r\n多行文字第二行",    // 多行文字
    "field_3": "选项 A",    // 单项选择
    "field_4": [    // 多项选择
        "选项 A",
        "选项 B"
    ],
    "field_5": "选项 A",    // 图片单选
    "field_6": [    // 图片多选
        "选项 A",
        "选项 B"
    ],
    "field_7": "选项 B",    // 下拉框
    "field_8": {    // 多级下拉框
        "level_1": "一级选项 A",
        "level_2": "二级选项 B"
    },
    "field_9": 198,    // 数字字段
    "field_10": [    //上传文件
        "https://gd-pri.jinshujufiles.com/en/boqcjo/test.jpg?TOKEN"
    ],
    "field_11": "08:28",    // 时间
    "field_12": "2021-09-23",    // 日期
    "field_13": "https://jinshuju.net",    // 网址
    "field_14": {    // 地理信息
        "latitude": "34.23083",
        "longitude": "108.89152",
        "address": "陕西省西安市雁塔区丈八沟街道汇诚国际"
    },
    "field_15": [    // 配图商品
        {
            "name": "商品 A",
            "number": 10,
            "price": 20.0,   // 商品价格
            "original_price": 25.0,  //商品划线价
            "inventory": 100,   // 库存
            "spec": {   // 规格
                "尺寸": "6寸",
                "颜色": "白色"
            }
        },
        {
            "name": "商品 B",
            "number": 100,
            "price": 20.0,   // 商品价格
            "original_price": 25.0,  //商品划线价
            "inventory": 100   // 库存
        }
    ],
    "field_16": [    // 无图商品
        {
            "name": "商品 A",
            "number": 10,
            "price": 20.0,   // 商品价格
            "original_price": 25.0,  //商品划线价
            "inventory": 100,   // 库存
            "spec": {   // 规格
                "尺寸": "6寸",
                "颜色": "白色"
            }
        }
    ],
    "field_17": "金数据",    // 姓名
    "field_18": "13888888888",    // 手机
    "field_19": "test@jinshuju.net",    // 邮箱
    "field_20": "029-88888888",    // 电话
    "field_21": {    // 地址
        "province": "陕西省",
        "city": "西安市",
        "district": "雁塔区",
        "street": "高新五路汇诚国际大厦"
    },
    "field_22": [    // 矩阵填空
        {
            "statement": "题目1",
            "dimensions": {
                "项目A": "项目A-题目1"
            }
        },
        {
            "statement": "题目2",
            "dimensions": {
                "项目A": "项目A-题目2"
            }
        },
        {
            "statement": "题目3",
            "dimensions": {
                "项目A": "项目A-题目3"
            }
        }
    ],
    "field_23": [    // 矩阵单选
        {
            "statement": "题目1",
            "choice": "选项A"
        }
    ],
    "field_24": [    // 表格
        {
            "项目A": "第一行项目A",
            "项目B": "第一行项目B"
        },
        {
            "项目A": "第二行项目A"
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
                "评分": "2"
            }
        }
    ],
    "field_34": {   // 横向填空
        "field_1": "西边",
        "field_2": "东边"
    },
    "field_25": "员工张三",    // 表单关联
    "field_26": "8",    // 评分
    "field_27": 8,    // NPS
    "field_28": [    // 排序
        {
            "rank": 1,
            "choice": "选项 B"
        },
        {
            "rank": 2,
            "choice": "选项 A"
        },
        {
            "rank": 3,
            "choice": "选项 C"
        }
    ],
    "field_29": "https://gd-pri.jinshujufiles.com/boqcjo_field_29_1signature.png?TOKEN",    // 电子签名
    "field_30": {    // 语音字段
      "url": "https://gd-pri.jinshujufiles.com/boqcjo_field_30_1755051534.webm?TOKEN",
      "audio_text": "Hello, World"
    },
    "field_31": 99,    // 计算字段
    "field_32": [     //预约字段
        {
          "number": 1,
          "item_name": "预约项目1",
          "scheduled_label": "2021-04-26"
        },
      {
        "number": 2,
        "item_name": "预约项目2",
        "scheduled_label": "2021-04-18 00:00-15:00"
      }
    ],
    "gen_code": "617663262151",    // 确认码
    "info_filling_duration": 193.51,    // 填写时长
}
```

> 注意：数据中的日期时间，使用的是 UTC 时间（例如：`"2021-09-28T02:59:42.539Z"`），接受者需要自行转换为自己所需要的时区（例如北京时间）
