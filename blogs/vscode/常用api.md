---
 title: Vscode常用Api
 date: 2023/11/30
 tags: 
 - vscode
---

### vscode添加webview
```javascript
panel.webview.html = this.getWebViewContent('相对路径');

public getWebViewContent(templatePath: string): string {

    /*
      由于webview运行于一个黑盒中，所以已有的相对路径不可用，需要经过转化为vscode.uri类型的地址才能被正常访问
    */

    const resourcePath = path.join(__dirname, templatePath);
    const dirPath = path.dirname(resourcePath);
    let html = fs.readFileSync(resourcePath, 'utf-8');
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
      let pathS = path.resolve(dirPath, $2);
      let pathStr = FlashToolWebview.CurrentPanel.webview.asWebviewUri(vscode.Uri.file(pathS));
      let rtn = $1 + pathStr + '"';
      return rtn;
    });
    return html;
  }
```

### vscode-webview通信
1. vscode端接收消息
```javascript
// 在扩展中，创建一个 WebView 并设置 onDidReceiveMessage 事件监听器
let panel = vscode.window.createWebviewPanel(
  'myWebView', // 编辑器中显示的名称
  'My WebView', // 面板的标题
  vscode.ViewColumn.One, // 编辑器列
  {}
);

// 设置 onDidReceiveMessage 事件监听器
panel.webview.onDidReceiveMessage(
  message => {
    // 处理收到的消息
    if (message.command === 'alert') {
      vscode.window.showInformationMessage(message.text);
    }
  },
  undefined,
  context.subscriptions
);
```
2. vscode 发送消息
```javascript
panel.webview.postMessage(message);
```
3. webview接收消息

```javascript
// 处理插件发送的消息
  window.addEventListener('message', event => {
    const message = event.data;

    if (message.command === 'hello') {
      console.log('Message from VS Code extension:', message.text);
    }
  });
```

4. webview发送消息
```javascript
 const vscode = acquireVsCodeApi(); // acquireVsCodeApi 是由 VS Code 注入到 WebView 的全局作用域中的一个函数

  // 监听来自插件的消息
  vscode.postMessage({ command: 'webviewReady', text: 'WebView is ready!' });
```


### 注册命令事件
1. 注册事件命令: `vscode.commands.registerCommand(command: string, (params) => {})`
2. 使用示例
```javascript
vscode.commands.registerCommand("GetLocaleLanguage", (a, b,c) => {
            let localeResult = new Promise((resolve, reject) => {
                fs.readFile(path_configJson, { encoding: "utf-8" }, (err, data) => {
                    const configJson = JSON.parse(data);
                    if (configJson.locale && configJson.locale === "en") {
                        resolve("en");
                    }
                    else {
                        resolve("zh");
                    }
                });
            })
            return localeResult;
        });
```
1. 调用示例
```javascript
vscode.commands.executeCommand("GetLocaleLanguage", a, b, c).then((language) => {
      let toSendMessage = {
        command: 'requestLocaleLanguage',
        type: "response",
        isSuccess: true,
        details: {
          language: language
        }
      }
      this.SendMessageToWebView(toSendMessage);  //将语言类型返给webview
    });
```
### 打开一个文本文档
```javascript
vscode.window.showTextDocument(vscode.Uri.file(path), options).then((textEditor: vscode.TextEditor) => {
      this.currentEditor = textEditor;
      const lastLine = textEditor.document.lineCount;
      textEditor.revealRange(new vscode.Range(new vscode.Position(lastLine, 0), new vscode.Position(lastLine, 0)));
    });
```
1. 详细说明
* vscode.Uri.file(path) 创建一个表示指定文件路径的 vscode.Uri 对象，用于标识要打开的文本文档。
* options
  ```javascript
  {
    viewColumn: vscode.ViewColumn.One, // 打开在第一列
    preview: true // true，文档将以只读模式打开
  }
  ```
* const lastLine = textEditor.document.lineCount; 获取打开文档的总行数
* textEditor.revealRange(new vscode.Range(new vscode.Position(lastLine, 0), new vscode.Position(lastLine, 0))); 使用 revealRange 方法来确保打开的文本编辑器滚动到指定的范围。在这里，它滚动到文档的最后一行 vscode.Range 用于表示一个文本范围，vscode.Position 表示一个位置。

### 创建一个输出通道读取日志文件并展示
```javascript
if (this.outputInstance === null) {
        this.outputInstance = vscode.window.createOutputChannel("Flashtool log"); // 创建一个输出通道
        // this.outputInstance.show() 则展示
      }
      const listener = (curr, prev) => { // 文件的当前状态 之前的状态
        if ((curr.size - prev.size) > 0) {  // 有新增信息
          fs.open(fileName, "r", (err, fd) => { // 使用 fs.open 方法以只读模式打开文件，获取文件描述符 fd。
            if (err) { // 如果出现错误，将错误信息追加到输出通道并记录日志
              this.outputInstance.append(err.toString());
              fs.closeSync(fd);
            } else {
              const buffer = Buffer.alloc(curr.size - prev.size); // 创建一个大小为新增内容长度的缓冲区
              // fd 打开文件后返回的一个标识符 用于标识已经打开的文件
              // buffer 用于存储读取的数据的缓冲区
              // 0 开始写入数据的偏移量。通常是 0
              // buffer.length 表示要从文件中读取的字节数
              // prev.size 文件中的起始位置，从这个位置开始读取数据
              fs.read(fd, buffer, 0, buffer.length, prev.size, (err, bytesRead, buffer) => {
                if (err) {
                  this.outputInstance.append(err.toString());
                  this.printLog("read log file error-" + fileName + err);
                } else {
                  this.outputInstance.append(buffer.toString());
                }
                fs.closeSync(fd); // open之后 释放文件
              })
            }
          })
        }
      }
      fs.unwatchFile(fileName, listener);// 关闭上次的监听事件
      fs.watchFile(fileName, { interval: 1000 }, listener); // 重新开启新的监听事件
```
### vscode选择文件弹框
```javascript
let DialogConfig = {
      canSelectFiles: true, // 是否可选文件
      canSelectFolders: false, // 是否可选文件夹
      canSelectMany: false, // 是否可以选择多个
      defaultUri: vscode.Uri.file("/"), // 默认打开本地路径
      openLabel: openLabel, // 打开按钮的标签
      title: title // 对话框的标题
    };
    vscode.window.showOpenDialog(
      DialogConfig
    ).then((result: any) => {
      if (result) {
        let selectedFilePath = result[0].fsPath;
        let toSendMessage = {
          command: command,
          type: "response",
          isSuccess: true,
          details: selectedFilePath,
          functionName: functionName
        }
        this.SendMessageToWebView(toSendMessage);
      }
    })
```
### vscode保存文件弹框
```javascript
vscode.window
      .showSaveDialog({
        defaultUri: vscode.Uri.file(message.data.defaultName), // 保存默认名称
        filters: message.data.filter, // 以什么后缀保存 { "Img Files": ["img"], }
        saveLabel: message.data.saveLabel, // 保存按钮的标签
      })
      .then((uri) => {
        if (uri) {
          const toSendMessage = {
            data: {
              isSuccess: true,
              result: uri.fsPath,
            },
            id: message.id,
          };
          this.SendMessageToWebView(toSendMessage);
        }
      });
```