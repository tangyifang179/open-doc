import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: '金数据开放平台',
      items: ['intro'],
    },
    {
      type: 'category',
      label: 'MCP Server',
      items: [
        'mcp/home',
        'mcp/installation',
        'mcp/tools',
      ],
    },
    {
      type: 'category',
      label: 'API v1',
      items: [
        'api_v1',
        'api_v1/authentication',
        {
          type: 'category',
          label: '接口',
          items: [
            'api_v1/all',
            'api_v1/endpoints/get_forms',
            'api_v1/endpoints/get_form',
            'api_v1/endpoints/get_form_entries',
            'api_v1/endpoints/create_form_entry',
            'api_v1/endpoints/get_form_entry',
            'api_v1/endpoints/update_form_entry',
            'api_v1/endpoints/delete_form_entry',
          ],
        },
        {
          type: 'category',
          label: 'Schema',
          items: [
            'api_v1/schemas/field',
            'api_v1/schemas/entry',
            'api_v1/schemas/entry_post',
          ],
        },
        'api_v1/status_code',
        'api_v1/request_rate',
      ],
    },
    {
      type: 'category',
      label: 'Webhook',
      items: [
        'webhook/home',
        'webhook/configuration',
        'webhook/data_format',
        'webhook/how_to_try_webhook',
        'webhook/outbound_ip_list',
      ],
    },
    {
      type: 'category',
      label: 'URL 传参',
      items: [
        'url_params/overview',
        'url_params/x_field',
        'url_params/form_field_url_params',
        'url_params/global_field_url_params',
      ],
    },
    {
      type: 'category',
      label: '表单嵌入',
      items: ['embedded/overview'],
    },
    {
      type: 'category',
      label: '重命名 API_CODE',
      items: ['api_code_alias/overview'],
    },
    {
      type: 'category',
      label: '其他',
      items: [
        'best_practice',
      ],
    },
  ],
};

export default sidebars;
