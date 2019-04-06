// request.js
import { request } from './fetch-request'

const proxy = 'https://tunebook.randallwiggins.com/tools/proxy.php';
export function GetTunebook(url) {
    return request(url?`${proxy}?url=${url}`:null)
        .then(abcText => abcText.replace(/^%%.*$/gm, ''))
}
