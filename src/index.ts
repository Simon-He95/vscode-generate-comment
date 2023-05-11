import axios from 'axios'

export async function activate() {
  const API_KEY = ''
  axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    message: [{ role: 'user', content: 'Hello!' }],
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
  }).then((res) => {
    debugger
  }).catch((err) => {
    debugger
  })
}

export function deactivate() {

}
