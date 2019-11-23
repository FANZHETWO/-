#### 首先配置settings.json  配置
```
{
	"files.autoSave": "afterDelay",
	// 換行
	// "editor.wordWrap": "on",
	// 代码缩进修改成4个空格
	"editor.tabSize": 4,
	// 不檢查縮進，保存后統一按設置項來設置
	"editor.detectIndentation": false,
	//保存的时候自动格式化
	"editor.formatOnSave": true,
	// 字體大小
	"editor.fontSize": 14,
	// 設置行高
	"editor.lineHeight": 22,
	// import {} 不换行
	"brace_style": "collapse,preserve-inline",
	// 左側工具欄是否可見
	"workbench.activityBar.visible": true,
	// 控制何时自动保存已更新文件。接受的值: "off"、"afterDelay"、"onFocusChange" (编辑器失去焦点)、"onWindowChange" (窗口失去焦点)。如果设置为 "afterDelay"，可在 "files.autoSaveDelay" 中配置延迟时间。
	// "files.autoSave": "onWindowChange",
	// "files.autoSaveDelay": 3000,
	// 让prettier使用eslint的代码格式进行校验
	"prettier.eslintIntegration": true,
	// 去掉代码结尾的分号
	// "prettier.semi": true,
	// // 使用带引号替代双引号
	// "prettier.singleQuote": true,
	// 启用后，按下 TAB 键，将展开 Emmet 缩写。
	// "emmet.triggerExpansionOnTab": true,
	// js設置單引號
	"javascript.preferences.quoteStyle": "single",
	// // 让函数(名)和后面的括号之间加个空格
	// "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
	// html格式化
	"vetur.format.defaultFormatter.html": "js-beautify-html",
	"vetur.format.defaultFormatter.js": "vscode-typescript",
	"eslint.validate": [
		"javascript",
		{
			"language": "vue",
			"autoFix": true
		},
		"html",
		"vue"
	],
	//自动保存信息
	// By default, create file  username
	"fileheader.Author": "you name",
	// By default, update file  username.
	"fileheader.LastModifiedBy": "you name",
	// By default, common template. Do not modify it!!!!!
	"fileheader.tpl": "/*\r\n * @Author: {author}\n * @Date: {createTime}\n * @Last Modified by: {lastModifiedBy}\n * @Last Modified time: {updateTime}\n */\n",
	// vue组件中html代码格式化样式不独占一行处理
	"vetur.format.defaultFormatterOptions": {
		"js-beautify-html": {
			"wrap_attributes": "auto"
		},
		"prettyhtml": {
			"printWidth": 100,
			"singleQuote": false,
			"wrapAttributes": false,
			"sortAttributes": false
		}
	},
	"files.associations": {
		"*.cjson": "jsonc",
		"*.wxss": "css",
		"*.wxs": "javascript"
	},
	"emmet.includeLanguages": {
		"wxml": "html"
	},
	"minapp-vscode.disableAutoConfig": true,
	"eslint.autoFixOnSave": true
}
```

#### 要是不行，再检查设置里面的 Vetur>Format>Options:Tab Size  是否设置了 4 

#### 还是不行的话   .editorconfig 文件增加下面的配置
```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 4
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

#### 还是不行的话  安装 prettierrc
- 全局安装 
> npm i -g  prettier 
- 然后在根目录下配置.prettier.json 文件  使用下面的内容

```
{
    "printWidth": 120,
    "semi": true,
    "singleQuote": true,
    "bracketSpacing": false,
    "tabWidth": 4,
    "trailingComma": "none"
}
```