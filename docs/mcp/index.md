---
sidebar_label: MCP Server
title: 金数据 MCP Server
---

# 金数据 MCP Server

> 金数据 MCP（Model Context Protocol）Server，允许 AI 助手（如 Claude、ChatGPT 等）通过标准化的 MCP 协议，直接与金数据平台进行交互。通过 MCP Server，AI 助手可以帮助用户管理表单、查询和操作数据，极大地提升工作效率。

## 什么是 MCP？

MCP（Model Context Protocol）是一种开放的标准化协议，用于连接 AI 助手与外部数据源和工具。通过 MCP，AI 助手可以安全、高效地访问外部系统，执行查询、创建和修改等操作。

## 金数据 MCP Server 能做什么？

| 功能 | 说明 |
| ------ | ------ |
| 管理表单 | 查询表单列表、获取表单详情、创建新表单、编辑表单结构与设置 |
| 表单设置 | 配置表单提交后行为、发布/停止收集、提交限制、访问密码/可见人群、Webhook 等，详见[表单设置 Schema](/api_v1/schemas/form_setting) |
| 管理数据 | 查询数据列表、获取单条数据、新增数据、修改数据、删除数据 |
| 账单查询 | 查询发票信息、查询付款记录 |

> MCP 的 `create_form` / `edit_form` / `get_form` 工具中 `setting` 对象的字段与 v1 API 完全对齐；未在白名单里的 key 会被静默忽略，因此所有可用字段必须来自[表单设置 Schema](/api_v1/schemas/form_setting)。

## 认证方式

金数据 MCP Server 支持以下两种认证方式：

| 认证方式 | 适用场景 | 说明 |
| ------ | ------ | ------ |
| API Key/Secret | 企业内部集成 | 通过金数据后台获取 Key/Secret，使用 HTTP Basic 认证，拥有全部权限 |
| OAuth 2.0 | 第三方应用 | 标准 OAuth 2.0 授权流程，按 scope 控制权限 |

API Key/Secret 的获取方式参考 [API v1 认证方式](/api_v1/authentication) 中的「获取 Key/Secret」部分。

生成 `BASE64_ENCODED_CREDENTIALS`：

```bash
echo -n "api_key:api_secret" | base64
```

将输出的字符串替换下方配置中的 `BASE64_ENCODED_CREDENTIALS` 即可。

## 在 Claude Code 中配置

### 使用 API Key/Secret 认证

项目级别配置（仅当前项目生效）：

```bash
claude mcp add jinshuju --transport http https://jinshuju.net/mcp \
  --header "Authorization: Basic BASE64_ENCODED_CREDENTIALS"
```

用户级别配置（所有项目生效）：

```bash
claude mcp add jinshuju -s user --transport http https://jinshuju.net/mcp \
  --header "Authorization: Basic BASE64_ENCODED_CREDENTIALS"
```

### 使用 OAuth 认证

项目级别配置（仅当前项目生效）：

```bash
claude mcp add jinshuju --transport http https://jinshuju.net/mcp
```

用户级别配置（所有项目生效）：

```bash
claude mcp add jinshuju -s user --transport http https://jinshuju.net/mcp
```

使用 OAuth 方式时，Claude Code 会自动引导你完成授权流程。

## 在 Cursor 中配置

在 Cursor 的 MCP 设置中添加：

### 使用 API Key/Secret 认证

```json
{
  "mcpServers": {
    "jinshuju": {
      "url": "https://jinshuju.net/mcp",
      "headers": {
        "Authorization": "Basic BASE64_ENCODED_CREDENTIALS"
      }
    }
  }
}
```

### 使用 OAuth 认证

```json
{
  "mcpServers": {
    "jinshuju": {
      "url": "https://jinshuju.net/mcp"
    }
  }
}
```

使用 OAuth 方式时，Cursor 会自动引导你完成授权流程。

## 在 Windsurf 中配置

编辑 Windsurf MCP 配置文件（`~/.codeium/windsurf/mcp_config.json`）：

### 使用 API Key/Secret 认证

```json
{
  "mcpServers": {
    "jinshuju": {
      "serverUrl": "https://jinshuju.net/mcp",
      "headers": {
        "Authorization": "Basic BASE64_ENCODED_CREDENTIALS"
      }
    }
  }
}
```

### 使用 OAuth 认证

```json
{
  "mcpServers": {
    "jinshuju": {
      "serverUrl": "https://jinshuju.net/mcp"
    }
  }
}
```

## 在 OpenClaw 中配置

将本网页发送给你的模型，并告诉它帮你安装金数据 MCP 即可。OpenClaw 会自动通过系统自带的 mcporter skill 完成安装和配置。

> 使用前请确保已安装系统自带的 **mcporter** skill。

### OAuth 授权流程说明

**第 1 步：请求 MCP Server，获取资源元数据地址**

```
GET https://jinshuju.net/mcp
```

服务器返回 `401`，响应头中包含：

```
WWW-Authenticate: Bearer resource_metadata="https://jinshuju.net/.well-known/oauth-protected-resource"
```

**第 2 步：获取受保护资源元数据**

```
GET https://jinshuju.net/.well-known/oauth-protected-resource
```

响应：

```json
{
  "resource": "https://jinshuju.net",
  "authorization_servers": ["https://account.jinshuju.net"],
  "scopes_supported": ["public", "profile", "forms", "read_entries", "write_entries", "form_setting", "read_contacts", "users"]
}
```

从中获取授权服务器地址：`https://account.jinshuju.net`

**第 3 步：获取授权服务器元数据**

```
GET https://account.jinshuju.net/.well-known/oauth-authorization-server
```

响应中包含各端点地址：

```json
{
  "issuer": "https://account.jinshuju.net",
  "authorization_endpoint": "https://account.jinshuju.net/oauth/authorize",
  "token_endpoint": "https://account.jinshuju.net/oauth/token",
  "registration_endpoint": "https://account.jinshuju.net/oauth/register",
  "code_challenge_methods_supported": ["S256"],
  "token_endpoint_auth_methods_supported": ["client_secret_basic", "client_secret_post", "none"]
}
```

**第 4 步：动态客户端注册**

```
POST https://account.jinshuju.net/oauth/register
Content-Type: application/json

{
  "client_name": "OpenClaw",
  "redirect_uris": ["http://localhost:PORT/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "none"
}
```

服务器返回 `client_id` 等信息，用于后续授权。

**第 5 步：发起 OAuth 授权码流程（使用 PKCE）**

1. 生成 `code_verifier` 和 `code_challenge`（S256）
2. 引导用户在浏览器中打开授权地址：

```
https://account.jinshuju.net/oauth/authorize?
  response_type=code&
  client_id=CLIENT_ID&
  redirect_uri=http://localhost:PORT/callback&
  scope=public+profile+forms+read_entries+write_entries&
  code_challenge=CODE_CHALLENGE&
  code_challenge_method=S256
```

3. 用户授权后，浏览器回调至 `redirect_uri`，携带 `code` 参数

**第 6 步：用授权码换取访问令牌**

```
POST https://account.jinshuju.net/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTHORIZATION_CODE&
redirect_uri=http://localhost:PORT/callback&
client_id=CLIENT_ID&
code_verifier=CODE_VERIFIER
```

**第 7 步：使用访问令牌访问 MCP Server**

```
GET https://jinshuju.net/mcp
Authorization: Bearer ACCESS_TOKEN
```

## 在其他支持 MCP 的工具中配置

金数据 MCP Server 遵循标准的 MCP 协议，理论上支持所有兼容 MCP 协议的 AI 工具和平台（如 ChatGPT、Cline、Continue 等）。

配置时只需提供以下信息：

| 配置项 | 值 |
| ------ | ------ |
| MCP Server URL | `https://jinshuju.net/mcp` |
| 认证方式（API Key/Secret） | `Authorization: Basic BASE64(api_key:api_secret)` |
| 认证方式（OAuth） | 无需额外配置，工具会自动发起 OAuth 授权流程 |

> 不同工具的配置方式可能略有差异，请参考对应工具的 MCP 配置文档。核心配置只需要 **Server URL** 和 **认证信息** 两项。

## 验证连接

配置完成后，你可以在 AI 助手中尝试以下操作来验证连接是否成功：

- 询问"列出我的所有表单"
- 询问"查看某个表单的数据"

如果 AI 助手能够正确返回你的表单信息，说明配置成功。
