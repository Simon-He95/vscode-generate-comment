import axios from 'axios'
import * as vscode from 'vscode'
import { claudeApi } from 'anthropic-ai'

export async function activate(context: any) {
  vscode.commands.registerTextEditorCommand('extension.generateComment', async (textEditor) => {
    const editor = vscode.window.activeTextEditor
    if (!editor)
      return
    const selection = editor.selection
    const wordRange = new vscode.Range(selection.start, selection.end)
    const selectedText = editor.document.getText(wordRange)

    // 替换文件内容

    claudeApi('function add(a,b){return a+b}', { model: 'claude-v1.3-100k' }).then((res) => {
      debugger
    }).catch((err) => {
      debugger
    })
    // textEditor.edit((builder) => {
    //   builder.replace(selection, newCode)
    // })
  })
}

export function deactivate() {

}

async function requestClaude(conversation: string, options: { model?: string; max_tokens_to_sample?: number; stream?: boolean; stop_sequences?: boolean; temperature?: number; top_k?: number; top_p?: number }) {
  return new Promise((resolve, reject) => {
    axios('https://api.anthropic.com/v1/complete', {
      headers: {
        'content-type': 'application/json',
        'x-api-key': 'sk-ant-qRl2b3ZysBEnZy8Q6jRf-GmK9oMJFzlCh_aJuRqxX7xejwHuzHr3NT5zhRlxkPwJbI_ewdWB0VcB6EWJ8BimhQ',
      },
      method: 'POST',
      data: {
        prompt: `帮我在代码的顶部生成代码注释: \n根据代码的类型比如是js或者ts. \n代码: ${conversation}`,
        model: options ? options.model : 'claude-v1',
        max_tokens_to_sample: options ? options.max_tokens_to_sample ? options.max_tokens_to_sample : 512 : 512,
        stream: options?.stream,
        stop_sequence: options?.stop_sequences,
        temperature: options?.temperature,
        top_k: options?.top_k,
        top_p: options?.top_p,
      },
    }).then(({ status, data: { completion: result } }) => {
      if (status !== 200)
        return reject('Error parsing response body')
      const index = result.indexOf('*/')
      resolve(index > 0 ? result.slice(0, index + 2) : result)
    }).catch((err) => {
      reject('请稍后再试!')
    })
  })
}
