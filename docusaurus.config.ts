import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'open nexus',
  tagline: 'One OS. Many Devices.',
  favicon: 'img/open-nexus.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://open-nexus-os.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'open-nexus', // Usually your GitHub org/user name.
  projectName: 'open-nexus-os', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',


  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/open-nexus-OS',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Blog — Building a RISC-V Operating System in Rust',
          blogDescription:
            'Development updates from Open Nexus: the NEURON capability-based RISC-V microkernel, the Rust userspace, the GPU-composited desktop, and the milestones along the way.',
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/open-nexus-OS',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // 1200x630 PNG — SVG social cards are not rendered by X, LinkedIn, Slack or Discord.
    image: 'img/og-image.png',
    metadata: [
      {
        name: 'keywords',
        content:
          'RISC-V operating system, Rust operating system, RISC-V microkernel, Rust microkernel, capability-based OS, RISC-V desktop OS, RISC-V GUI, open source operating system, NEURON microkernel, Open Nexus',
      },
      {
        name: 'description',
        content:
          'Open Nexus is an open source RISC-V operating system written in Rust, built on NEURON — a capability-based microkernel with a trusted computing base small enough to audit.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    navbar: {
      title: 'open nexus',
      logo: {
        alt: 'open nexus',
        src: 'img/open-nexus.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/community', label: 'Community', position: 'left'},
        {to: '/partners', label: 'Partners', position: 'left'},
        {
          href: 'https://github.com/open-nexus-OS',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/category/the-story',
            },
            {
              label: 'RISC-V Operating System',
              to: '/risc-v-operating-system',
            },
            {
              label: 'Capability Microkernel',
              to: '/capability-microkernel',
            },
            {
              label: 'RISC-V Desktop',
              to: '/risc-v-desktop',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/3sTZvH4PEq',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/open-nexus-OS',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Imprint',
              to: '/imprint',
            },
            {
              label: 'Privacy',
              to: '/privacy',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} open nexus`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
