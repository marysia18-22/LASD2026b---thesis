const parse = require('csv-parse/lib/sync')
const fs = require('fs')
const path = require('path')

export function readCsv(filePath, { columns = true } = {}) {
  const raw = fs.readFileSync(filePath, 'utf8')

  return parse(raw, { delimiter: ',', columns, skip_empty_lines: true, trim: true })
}

export function readJson(path){
  const raw = fs.readFileSync(path, 'utf8')
  return JSON.parse(raw)
}
