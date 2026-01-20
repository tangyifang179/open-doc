import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '金数据开放平台',
  tagline: '强大灵活的系统集成能力',
  favicon: 'img/logo.png',

  future: {
    v4: true,
  },

  url: 'https://open.jinshuju.net',
  baseUrl: '/',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-llms',
      {
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        docsDir: 'docs',
        title: '金数据开放平台文档',
        description: '金数据 API、Webhook、URL 传参等系统集成能力文档',
        pathTransformation: {
          ignorePaths: ['docs'],
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/logo.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '金数据开放平台',
      logo: {
        alt: '金数据',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: '文档',
        },
        {
          href: 'https://jinshuju.net',
          label: '金数据首页',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: 'API v1',
              to: '/api_v1',
            },
            {
              label: 'Webhook',
              to: '/webhook/home',
            },
            {
              label: 'URL 传参',
              to: '/url_params/overview',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '金数据首页',
              href: 'https://jinshuju.net',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} 金数据开放平台 - 文档中心`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'ruby', 'java', 'python', 'json', 'http'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
