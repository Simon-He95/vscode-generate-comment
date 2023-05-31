import * as vscode from 'vscode'
import ClaudeApi from 'anthropic-ai'

export async function activate() {
  const claude = new ClaudeApi('')

  vscode.commands.registerTextEditorCommand('extension.generateComment', async (textEditor) => {
    const editor = vscode.window.activeTextEditor
    if (!editor)
      return
    const selection = editor.selection
    const wordRange = new vscode.Range(selection.start, selection.end)
    const selectedText = editor.document.getText(wordRange)
    // 替换文件内容
    claude.complete(`帮我在代码的顶部生成代码注释: \n根据代码的类型比如是js或者ts.\n生成内容参考这样的格式"/**
    * Adds two numbers together.
    * @param {number} a The first number.
    * @param {number} b The second number.
    * @returns {number} The sum of a and b.
    */" \n代码: \n${selectedText}`, { model: 'claude-v1.3' }).then((newCode: string) => {
      const startIdx = newCode.indexOf('/**')
      const endIdx = newCode.indexOf('*/') + 2
      newCode = `/* vscode-generate-comment */\n${newCode.slice(startIdx, endIdx)}\n${selectedText}`
      textEditor.edit((builder) => {
        builder.replace(selection, newCode)
      })
    }).catch((err: any) => {
      vscode.window.showErrorMessage(err)
    })
  })
}

export function deactivate() {

}
