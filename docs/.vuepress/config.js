const resolveSideBar = require('../sidebar') 
const { defaultTheme } = require('vuepress')
const { pwaPlugin } = require('@vuepress/plugin-pwa')
const { pwaPopupPlugin } = require('@vuepress/plugin-pwa-popup')


module.exports = {
    title: 'Apache NIFI中文文档',
    description: 'Apache NIFI中文文档',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
      ],
    theme: defaultTheme({
        sidebarDepth: 1,
        lastUpdated: 'Last Updated',
        sidebar: resolveSideBar(),
      }),
    plugins: [
      pwaPlugin(),
      pwaPopupPlugin({
        locales: {
          '/': {
            message: '发现新内容可用',
            buttonText: '刷新',
          },
          '/zh/': {
            message: '发现新内容可用',
            buttonText: '刷新',
          },
        },
      }),
    ],
  }