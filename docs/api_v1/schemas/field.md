# API V1 字段结构 Schema

通过 API 获取表单结构时，会返回如下类似结果：

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

其中，`fields` 包含了该表单的所有字段。每个字段的 Key （例如 `field_1`, `field_2`）是该字段的唯一标识符，用于在获取数据或者新增数据时指定字段。

下面对每个字段的 Schema 做详细解释。

## 通用属性

以下列表为字段通用属性，即，每个自动都会包含如下属性：

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| label | 是 | String | 字段标题 |
| type | 是 | String | 字段类型 |
| notes | 是 | String | 字段提示（可能是 HTML 格式富文本） |
| private | 是 | Bool | 是否隐藏 |
| validation | 是 | Hash | 字段校验规则 |


## 字段 type 对应表

| type | 字段 |
| ------ | ------ |
| single_line_text | 单行文字，姓名 |
| paragraph_text | 多行文字 |
| single_choice | 单项选择，图片单选 |
| multiple_choice | 多项选择，图片多选 |
| drop_down | 下拉框 |
| cascade_drop_down | 多级下拉框 |
| number | 数字 |
| attachment | 上传文件 |
| time | 时间 |
| date_time | 日期 |
| link | 网址 |
| geo_location | 地理信息 |
| goods | 配图商品，无图商品 |
| mobile | 手机 |
| email | 邮箱 |
| phone | 电话 |
| address | 地址 |
| matrix | 矩阵填空 |
| likert | 矩阵单选 |
| table | 表格字段 |
| matrix_scale | 矩阵量表 |
| multiple_blanks | 横向填空 |
| form_association | 表单关联 |
| rating | 评分字段 |
| nps | NPS字段 |
| sort | 排序字段 |
| e_signature | 电子签名 |
| formula | 计算字段 |

## 通用校验（validation）属性

```json
{
  "validation": {
    "required": true,
    "unique": true,
    "access_control_list_limit": true,
    "access_control_type": "white"
  }
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| required | 否 | Bool | 是否必填 |
| unique | 否 | Bool | 是否不能与已有数据重复 |
| access_control_list_limit | 否 | Bool | 是否开启「白名单」「黑名单」限制 |
| access_control_type | 否 | String | 「白名单」「黑名单」限制类型。可选值：white, black |

## 字段特定属性

### 无特殊属性的字段

包括：

* 姓名
* 手机
* 电话
* 邮箱
* 电子签名
* 地址
* 网址
* 地理信息

> 这些字段无特殊属性，只包含上述的通用属性和通用校验类型

### 文本类字段（单行文字、多行文字）

```json
{
    "label": "多行文字",
    "type": "paragraph_text",
    "notes": "",
    "private": false,
    "validation": {
        "minimum_length": 100,
        "maximum_length": 10000
    }
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| validation.minimum_length | 否 | Number | 最少多少字 |
| validation.maximum_length | 否 | Number | 最多多少字 |

### 附件/文件上传

```json
{
    "field_10": {
        "label": "上传文件",
        "type": "attachment",
        "notes": "",
        "private": false,
        "validation": {},
        "max_file_quantity": 3,
        "media_type": {
            "type": "unlimited",
            "value": []
        }
    }
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| max_file_quantity | 是 | Number | 最大文件数量 |
| media_type | 是 | Hash | 文件上传类型 |
| media_type.type | 否 | String | 文件上传类型（unlimited 或制定类型） |
| media_type.value | 否 | Array | 允许上传的文件扩展名 |

### 数字字段

```json
{
    "label": "数字",
    "type": "number",
    "notes": "",
    "private": false,
    "validation": {
        "min": 10000.0,
        "max": 20000.0
    },
    "precision": 2,
    "thousands_separator": true
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| validation.min | 否 | Number | 最小值 |
| validation.max | 否 | Number | 最大值 |
| precision | 否 | Number | 精度（不超过几位小数） |
| thousands_separator | 否 | Bool | 显示千分分隔符 |
| display_as_percentage | 否 | Bool | 显示百分比 |

### 选项类字段

包括

* 单项选择
* 多项选择
* 下拉框
* 图片单选
* 图片多选
* 多级下拉框
* 排序字段

```json
{
    "label": "单项选择",
    "type": "single_choice",
    "notes": "",
    "private": false,
    "validation": {},
    "choices": [
        {
            "name": "选项 A",
            "value": "nSBX",
            "hidden": false,
            "quota": 10,
            "operand_value": 1.0
        },
        {
            "name": "选项 B",
            "value": "Ei3b",
            "hidden": true,
            "quota": 11,
            "operand_value": 2.0
        },
        {
            "name": "选项 C",
            "value": "jGwK",
            "hidden": false,
            "quota": 10,
            "operand_value": 3.0
        }
    ],
    "allow_other": false
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| choices | 是 | Array | 选项 |
| choices.name | 是 | String | 选项名称 |
| choices.value | 是 | String | 选项 API Code |
| choices.hidden | 是 | Bool | 隐藏选项 |
| choices.quota | 是 | Number | 选项名额 |
| choices.operand_value | 是 | Number | 选项赋值 |
| choices.sub_choices | 否 | Hash | 下级下拉框（仅对多级下拉框有效） |
| allow_other | 是 | Bool | 是否包含其他选项 |
| min_selected | 否 | Number | 最少选几项（多项选择，图片多选，排序字段） |
| max_selected | 否 | Number | 最多选几项（多项选择，图片多选，排序字段） |

### 日期字段

```json
{
    "label": "日期",
    "type": "date_time",
    "notes": "",
    "private": false,
    "validation": {
        "start": "2021-01-01",
        "end": "2021-12-15"
    },
    "precision": "day"
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| validation.start | 否 | Date | 起始日期 |
| validation.end | 否 | Date | 结束日期 |
| precision | 是 | String | 精度（格式）：second minute hour day month year |

### 时间

```json
{
    "label": "时间",
    "type": "time",
    "notes": "",
    "private": false,
    "include_second": true,
    "validation": {}
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| include_second | 否 | Bool | 精确到秒 |

### 配图商品、无图商品

```json
{
    "label": "配图商品",
    "type": "goods",
    "notes": "",
    "private": false,
    "validation": {},
    "goods_items": [
        {
            "name": "商品 A",
            "value": "2dZT",
            "description": null,
            "inventory": 100,
            "hidden": false,
            "price": 20.0,
            "original_price": 25.0,
            "skus": []
        },
        {
            "name": "商品 B",
            "value": "RPCC",
            "description": null,
            "inventory": 300,
            "hidden": false,
            "price": null,
            "original_price": null,
            "skus": [
                {
                    "spec": {
                        "规格1": "A1",
                        "规格2": "B1"
                    },
                    "price": 15.0,
                    "original_price": 20.0,
                    "inventory": 100
                },
                {
                    "spec": {
                        "规格1": "A2",
                        "规格2": "B1"
                    },
                    "price": 25.0,
                    "original_price": 30.0,
                    "inventory": 200
                },
            ]
        }
    ]
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| goods_items | 是 | Array | 商品项目 |
| goods_items.name | 是 | String | 商品名 |
| goods_items.value | 是 | String | 商品对应的 API Code |
| goods_items.description | 是 | String | 商品说明 |
| goods_items.inventory | 是 | Number | 库存 |
| goods_items.hidden | 是 | Bool | 隐藏选项 |
| goods_items.price | 是 | Number | 商品价格 |
| goods_items.original_price | 是 | Number | 商品划线价 |
| goods_items.skus | 是 | Array | 商品规格 |
| goods_items.skus.price | 是 | Number | 商品规格价格 |
| goods_items.skus.original_price | 是 | Number | 商品规格划线价 |
| goods_items.skus.inventory | 是 | Number | 商品规格库存 |
| goods_items.skus.spec | 是 | Hash | 商品规格描述 |

### 表单关联

```json
{
    "label": "表单关联",
    "type": "form_association",
    "notes": "",
    "private": false,
    "validation": {},
    "associated_form_token": "ABC123",
    "associated_field_api_codes": [
        "field_1"
    ],
    "display_field_settings": [
        {
            "api_code": "field_2",
            "privacy_safe": true,
            "public_display": false
        }
    ]
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| associated_form_token | 是 | String | 关联表单的 Token |
| associated_field_api_codes | 是 | String | 关联表单的字段 API Code（支持多个） |
| display_field_settings | 是 | Array | 展示字段列表 |
| display_field_settings.api_code | 是 | String | 展示字段 API Code |
| display_field_settings.privacy_safe | 是 | Bool | 展示字段是否开启隐私保护 |
| display_field_settings.public_display | 是 | Bool | 展示字段是否在公开表单展示 |

### 计算字段

```json
{
    "label": "计算字段",
    "type": "formula",
    "notes": "",
    "private": false,
    "validation": {},
    "formula": "field_1 + field_2",
    "formula_display": "$(语文成绩) + $(数学成绩)"
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| formula_display | 是 | String | 公式（用于表单管理员阅读） |
| formula | 是 | String | 公式（用于服务器后台计算） |

### 矩阵单选

```json
{
    "label": "矩阵单选",
    "type": "likert",
    "notes": "",
    "private": false,
    "validation": {},
    "choices": [
        {
            "name": "选项 A",
            "value": "2Y09",
            "hidden": false
        },
        {
            "name": "选项 B",
            "value": "v944",
            "hidden": false
        }
    ],
    "statements": [
        {
            "name": "题目 1",
            "value": "g4fI"
        },
        {
            "name": "题目 2",
            "value": "U5sl"
        }
    ]
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| choices | 是 | Array | 选项 |
| choices.name | 是 | String | 选项名称 |
| choices.value | 是 | String | 选项 API Code |
| choices.hidden | 是 | Bool | 隐藏选项 |
| statements | 是 | Array | 题目 |
| statements.name | 是 | String | 题目名称 |
| statements.value | 是 | String | 题目 API Code |

### 矩阵填空，矩阵量表

```json
{
    "label": "矩阵填空",
    "type": "matrix",
    "notes": "",
    "private": false,
    "validation": {},
    "statements": [
        {
            "name": "题目 1",
            "value": "4lwY"
        },
        {
            "name": "题目 2",
            "value": "GhAK"
        }
    ],
    "dimensions": [
        {
            "field_1": {
                "label": "项目 A",
                "type": "single_line_text",
                "notes": null,
                "private": false,
                "validation": {}
            }
        },
        {
            "field_2": {
                "label": "项目 B",
                "type": "single_line_text",
                "notes": null,
                "private": false,
                "validation": {}
            }
        }
    ]
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| statements | 是 | Array | 题目 |
| statements.name | 是 | String | 题目名称 |
| statements.value | 是 | String | 题目 API Code |
| dimensions | 是 | Array | 项目 |

> 每一个项目都是一个嵌入的 field，可以根据 field type 参考具体 field 的结构

### 横向填空

```json
 {
    "label": "横向填空",
    "type": "multiple_blanks",
    "notes": "",
    "private": false,
    "validation": {},
    "placeholder": "太阳${field_1}$ 升,${field_2}$ 落",
    "dimensions": [
        {
            "field_1": {
                "label": "",
                "type": "single_line_text",
                "notes": null,
                "private": false,
                "validation": {}
            }
        },
        {
            "field_2": {
                "label": "",
                "type": "single_line_text",
                "notes": null,
                "private": false,
                "validation": {}
            }
        }
    ]
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| placeholder | 是 | Array | 填空编辑内容（下划线使用 `${field_x}` 替换） |
| dimensions | 是 | Array | 项目 |

> 每一个项目都是一个嵌入的 field，默认固定位单行文字，可以参考单行文字的结构说明

### 表格

```json
{
    "label": "表格",
    "type": "table",
    "notes": "",
    "private": false,
    "validation": {},
    "dimensions": [
        {
            "field_1": {
                "label": "项目 A",
                "type": "single_line_text",
                "notes": null,
                "private": false,
                "validation": {}
            }
        },
        {
            "field_2": {
                "label": "项目 B",
                "type": "single_line_text",
                "notes": null,
                "private": false,
                "validation": {}
            }
        }
    ]
}
```

### NPS 字段

```json
{
    "label": "你有多大可能把我们推荐给朋友或同事？请从0分到10分打分。",
    "type": "nps",
    "notes": "",
    "private": false,
    "validation": {},
    "minimum_ratings_display_text": "不可能",
    "maximum_ratings_display_text": "极有可能",
    "highlight_color": "rgb(40,117,232)"
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| minimum_ratings_display_text | 是 | String | 最低分文案 |
| maximum_ratings_display_text | 是 | String | 最高分文案 |
| highlight_color | 是 | String | 颜色（不可编辑） |

### 评分字段

```json
{
    "label": "评分",
    "type": "rating",
    "notes": "",
    "private": false,
    "validation": {},
    "rating_type": "star",
    "rating_max": 10
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| rating_type | 是 | String | 外观 |
| rating_max | 是 | Number | 量级 |

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| dimensions | 是 | Array | 项目 |

> 每一个项目都是一个嵌入的 field，可以根据 field type 参考具体 field 的结构

### 预约字段

```json
{
    "field_1": {
        "private": false,
        "reservation_items": [
            {
                "hidden": false,
                "name": "预约项目1",
                "value": "9iVb"
            },
            {
                "hidden": false,
                "name": "预约项目2",
                "value": "lU4f"
            }
        ],
        "label": "选择预约项目",
        "type": "reservation",
        "validation": {
            "required": true
        }
    }
}
```

| 参数名称 | 是否必须 | 类型 | 说明 |
| ------ | ------ | ------ | ------ |
| reservation_items | 是 | Array | 预约项目 |
| reservation_items.hidden | 是 | Bool | 隐藏选项 |
| reservation_items.name | 是 | String | 项目名称 |
| reservation_items.value | 是 | String | 项目API Code |

