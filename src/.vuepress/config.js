module.exports = {
  base: "/vuepress/",
  dest: 'docs',
  locales: {
    '/': {
        lang: 'ja-JP',
        title: 'VuePress 練習',
    },

  },
  themeConfig: {
    sidebar: 'auto',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Nginx', link: '/nginx/' },
      { text: 'Pi', link: '/pi/' },
      { text: 'KVM', link: '/kvm/' }
    ],
  }

}
