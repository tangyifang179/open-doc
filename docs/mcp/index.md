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
| 管理表单 | 查询表单列表、获取表单详情、创建新表单 |
| 管理数据 | 查询数据列表、获取单条数据、新增数据、修改数据、删除数据 |
| 账单查询 | 查询发票信息、查询付款记录 |

## 认证方式

金数据 MCP Server 支持以下两种认证方式：

| 认证方式 | 适用场景 | 说明 |
| ------ | ------ | ------ |
| API Key/Secret | 企业内部集成 | 通过金数据后台获取 Key/Secret，使用 HTTP Basic 认证，拥有全部权限 |
| OAuth 2.0 | 第三方应用 | 标准 OAuth 2.0 授权流程，按 scope 控制权限 |

API Key/Secret 的获取方式参考 [API v1 认证方式](/api_v1/authentication) 中的「获取 Key/Secret」部分。

## 在 Claude Desktop 中配置

编辑 Claude Desktop 配置文件（macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`）：

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

其中 `BASE64_ENCODED_CREDENTIALS` 为 `api_key:api_secret` 的 Base64 编码值。

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

使用 OAuth 方式时，Claude Desktop 会自动引导你完成授权流程。

## 在 Claude Code 中配置

### 使用 API Key/Secret 认证

```bash
claude mcp add jinshuju -- https://jinshuju.net/mcp \
  --header "Authorization: Basic BASE64_ENCODED_CREDENTIALS"
```

### 使用 OAuth 认证

```bash
claude mcp add jinshuju -- https://jinshuju.net/mcp
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
