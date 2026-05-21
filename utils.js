const parse = require('csv-parse/lib/sync')
const fs = require('fs')
const path = require('path')

export function readCsv(path, {columns = true} = {}) {
  const raw = fs.readFileSync(path)

  return parse(raw, { delimiter: ',', columns, skip_empty_lines: true, trim: true})
}

export function readJson(path){
  const raw = fs.readFileSync(path, 'utf8')
  return JSON.parse(raw)
}
