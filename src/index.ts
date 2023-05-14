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
    claude.complete(`帮我在代码的顶部生成代码注释: \n根据代码的类型比如是js或者ts. \n代码: ${selectedText}`, { model: 'claude-instant-v1.1' }).then((newCode: string) => {
      const index = newCode.indexOf('*/')
      let result = ''
      if (index) {
        result = `${newCode.slice(0, index + 2)}\n${selectedText}`
      }
      else {
        const _index = newCode.indexOf(selectedText)
        if (_index)
          result = newCode.slice(0, newCode.indexOf(selectedText) + selectedText.length)
        else
          result = newCode
      }
      textEditor.edit((builder) => {
        builder.replace(selection, result)
      })
    }).catch((err: any) => {
      vscode.window.showErrorMessage(err)
    })
  })
}

export function deactivate() {

}
