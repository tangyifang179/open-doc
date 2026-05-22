---
sidebar_label: OAuth 协议细节
title: 金数据 MCP Server OAuth 协议细节
---

# OAuth 协议细节

下面是支持 OAuth 方式接入时的协议流程。大多数用户不需要手动执行这些步骤；如果你正在开发自己的 MCP 客户端或调试授权流程，可以参考本节。

## 第 1 步：请求 MCP Server，获取资源元数据地址

```http
GET https://jinshuju.net/mcp
```

服务器返回 `401`，响应头中包含：

```http
WWW-Authenticate: Bearer resource_metadata="https://jinshuju.net/.well-known/oauth-protected-resource"
```

## 第 2 步：获取受保护资源元数据

```http
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

## 第 3 步：获取授权服务器元数据

```http
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

## 第 4 步：动态客户端注册

```http
POST https://account.jinshuju.net/oauth/register
Content-Type: application/json
```

```json
{
  "client_name": "OpenClaw",
  "redirect_uris": ["http://localhost:PORT/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "none"
}
```

服务器返回 `client_id` 等信息，用于后续授权。

## 第 5 步：发起 OAuth 授权码流程（使用 PKCE）

1. 生成 `code_verifier` 和 `code_challenge`（S256）。
2. 引导用户在浏览器中打开授权地址：

```text
https://account.jinshuju.net/oauth/authorize?
  response_type=code&
  client_id=CLIENT_ID&
  redirect_uri=http://localhost:PORT/callback&
  scope=public+profile+forms+read_entries+write_entries&
  code_challenge=CODE_CHALLENGE&
  code_challenge_method=S256
```

3. 用户授权后，浏览器回调至 `redirect_uri`，携带 `code` 参数。

## 第 6 步：用授权码换取访问令牌

```http
POST https://account.jinshuju.net/oauth/token
Content-Type: application/x-www-form-urlencoded
```

```text
grant_type=authorization_code&
code=AUTHORIZATION_CODE&
redirect_uri=http://localhost:PORT/callback&
client_id=CLIENT_ID&
code_verifier=CODE_VERIFIER
```

## 第 7 步：使用访问令牌访问 MCP Server

```http
GET https://jinshuju.net/mcp
Authorization: Bearer ACCESS_TOKEN
```
