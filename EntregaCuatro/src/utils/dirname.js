import { dirname } from 'path'
import { fileURLToPath } from 'url'

const _dirname = dirname(fileURLToPath(import.meta.url))

const __dirname = _dirname.replace("utils", "");

// exportar __dirname para poder usarlo en app.js
export {__dirname};