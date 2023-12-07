import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "Never Stop",
  description: "Just playing around",
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "NeveSto",
    authorAvatar: "/nevesto.png",
    docsRepo: "https://github.com/AjaxSir",
    docsBranch: "main",
    docsDir: "example",
    colorMode: "dark",
    lastUpdatedText: "",
    autoSetBlogCategories: true,
    patterns: [
      '!**/demo/**', // 不监听 temp-folder 文件夹
    ]
    // series 为原 sidebar
    // series: {
    //   "/docs/": [
    //     {
    //       text: "Vscode",
    //       children: ["创建.md", "常用api.md", "代码提示插件开发.md"],
    //     },
    //     // {
    //     //   text: "Vue 2.x",
    //     //   children: ["vue2.x"],
    //     // },
    //     {
    //       text: "Vue",
    //       children: ["hook使用.md"],
    //     },
    //     {
    //       text: "React",
    //       children: ["react"],
    //     },
    //     {
    //       text: "BackEnd",
    //       children: ["next"],
    //     },
    //   ],
    // },
    // navbar: [
    //   { text: "Home", link: "/" },
    //   {
    //     text: "Front",
    //     children: [
    //       { text: "Vscode", link: "/docs/Front/vscode/创建.md" },
    //       { text: "Vue", link: "/docs/Front/vue/hook使用.md" },
    //       { text: "React", link: "/blogs/other/guide" },
    //     ],
    //   },
    //   {
    //     text: "Backend",
    //     children: [
    //       { text: "next", link: "/docs/backend/next.md" },
    //     ],
    //   },
    // ],
    // bulletin: {
    //   body: [
    //     {
    //       type: "text",
    //       content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "QQ 群",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li>QQ群1：1037296104</li>
    //         <li>QQ群2：1061561395</li>
    //         <li>QQ群3：962687802</li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "GitHub",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "buttongroup",
    //       children: [
    //         {
    //           text: "打赏",
    //           link: "/docs/others/donate.html",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // commentConfig: {
    //   type: 'valie',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  
  // debug: true,
});
