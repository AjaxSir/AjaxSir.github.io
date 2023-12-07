set -e

  # 生成静态文件
  npm run build

  # 进入生成的文件夹
  cd .vuepress/dist


  git init
  git add -A
  git commit -m 'deploy'
  # 我的配置如下
  git push -f https://github.com/AjaxSir/AjaxSir.github.io.git master:gh-pages

  cd -