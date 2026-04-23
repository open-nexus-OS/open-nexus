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

  headTags: [
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5BQJP3N2');`,
    },
  ],

  bodyTagsBefore: [
    {
      tagName: 'noscript',
      attributes: {},
      innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5BQJP3N2" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
    },
  ],

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
          blogTitle: 'Blog',
          blogDescription: 'Project updates, architecture notes, and milestones.',
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
    image: 'img/open-nexus.svg',
    metadata: [
      {
        name: 'keywords',
        content:
          'Open Nexus, open source operating system, RISC-V, microkernel, kiosk OS, HMI OS, industrial OS, secure device platform',
      },
      {
        name: 'description',
        content:
          'Open Nexus is a secure, open operating system built in Rust around the NEURON microkernel, with a focused path from dedicated RISC-V devices to broader form factors.',
      },
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
        {to: '/partners', label: 'Strategic Partners', position: 'left'},
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
