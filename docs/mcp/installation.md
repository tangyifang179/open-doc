---
sidebar_label: 安装与配置
title: MCP Server 安装与配置
---

# MCP Server 安装与配置

## 认证方式

金数据 MCP Server 支持以下三种认证方式：

| 认证方式 | 适用场景 | 说明 |
| ------ | ------ | ------ |
| API Key/Secret | 企业内部集成 | 通过金数据后台获取 Key/Secret，使用 HTTP Basic 认证，拥有全部权限 |
| JWT Token | 系统间调用 | 使用金数据签发的 JWT Token 进行 Bearer Token 认证，拥有全部权限 |
| OAuth 2.0 | 第三方应用 | 标准 OAuth 2.0 授权流程，按 scope 控制权限 |

API Key/Secret 的获取方式参考 [API v1 认证方式](/docs/api_v1/authentication) 中的「获取 Key/Secret」部分。

## 在 Claude Desktop 中配置

编辑 Claude Desktop 配置文件（macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`）：

### 使用 API Key/Secret 认证

```json
{
  "mcpServers": {
    "jinshuju": {
      "url": "https://jinshuju.net/api/mcp",
      "headers": {
        "Authorization": "Basic BASE64_ENCODED_CREDENTIALS"
      }
    }
  }
}
```

其中 `BASE64_ENCODED_CREDENTIALS` 为 `api_key:api_secret` 的 Base64 编码值。

### 使用 OAuth 认证

```json
{
  "mcpServers": {
    "jinshuju": {
      "url": "https://jinshuju.net/api/mcp"
    }
  }
}
```

使用 OAuth 方式时，Claude Desktop 会自动引导你完成授权流程。

## 在 Claude Code 中配置

### 使用 API Key/Secret 认证

```bash
claude mcp add jinshuju -- https://jinshuju.net/api/mcp \
  --header "Authorization: Basic BASE64_ENCODED_CREDENTIALS"
```

## 在 Cursor 中配置

在 Cursor 的 MCP 设置中添加：

### 使用 API Key/Secret 认证

```json
{
  "mcpServers": {
    "jinshuju": {
      "url": "https://jinshuju.net/api/mcp",
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
      "url": "https://jinshuju.net/api/mcp"
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
      "serverUrl": "https://jinshuju.net/api/mcp",
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
      "serverUrl": "https://jinshuju.net/api/mcp"
    }
  }
}
```

## 在其他支持 MCP 的工具中配置

金数据 MCP Server 遵循标准的 MCP 协议，理论上支持所有兼容 MCP 协议的 AI 工具和平台（如 ChatGPT、Cline、Continue 等）。

配置时只需提供以下信息：

| 配置项 | 值 |
| ------ | ------ |
| MCP Server URL | `https://jinshuju.net/api/mcp` |
| 认证方式（API Key/Secret） | `Authorization: Basic BASE64(api_key:api_secret)` |
| 认证方式（OAuth） | 无需额外配置，工具会自动发起 OAuth 授权流程 |

> 不同工具的配置方式可能略有差异，请参考对应工具的 MCP 配置文档。核心配置只需要 **Server URL** 和 **认证信息** 两项。

## 验证连接

配置完成后，你可以在 AI 助手中尝试以下操作来验证连接是否成功：

- 询问"列出我的所有表单"
- 询问"查看某个表单的数据"

如果 AI 助手能够正确返回你的表单信息，说明配置成功。
