const fs = require('fs')
const path = require('path')
const { Cite } = require('@citation-js/core')
require('@citation-js/plugin-bibtex')

const outputPath = path.join(__dirname, '..', 'public', 'lasd-publications.bib')
const standaloneDblpExports = {
  2021: 'https://dblp.org/search/publ/bibtex/?q=toc%3Adb%2Fconf%2Flasd%2Flasd2021.bht%3A'
}

function extractEntries(bibtex) {
  const entries = []
  const startPattern = /^\s*@([a-z]+)\s*\{/gim
  let match

  while ((match = startPattern.exec(bibtex)) !== null) {
    const start = match.index + match[0].indexOf('@')
    let depth = 0
    let opened = false
    let escaped = false
    let end = start
    for (; end < bibtex.length; end += 1) {
      const character = bibtex[end]
      if (character === '{' && !escaped) {
        depth += 1
        opened = true
      }
      if (character === '}' && !escaped) depth -= 1
      escaped = character === '\\' && !escaped
      if (opened && depth === 0 && end > start) break
      if (character !== '\\') escaped = false
    }
    if (depth !== 0) throw new Error(`Unclosed BibTeX entry near character ${start}`)
    entries.push(bibtex.slice(start, end + 1).trim())
    startPattern.lastIndex = end + 1
  }
  return entries
}

function entryMetadata(entry) {
  const parsed = new Cite(entry).data[0]
  if (!parsed || !parsed.title) throw new Error('Found a BibTeX entry without a title')
  return {
    type: parsed.type,
    title: parsed.title,
    normalizedTitle: parsed.title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ''),
    year: parsed.issued?.['date-parts']?.[0]?.[0] || 0,
    container: (parsed['container-title'] || '').toLowerCase().replace(/[^a-z0-9]+/g, '')
  }
}

function recordKey(metadata) {
  return `${metadata.normalizedTitle}:${metadata.year}:${metadata.container}`
}

async function readImports(args) {
  const sourcePaths = []
  const remoteEditions = []
  const lasdTrackFiles = args.includes('--lasd-track')
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--lasd-track') {
      continue
    } else if (args[index] === '--dblp') {
      const year = args[index + 1]
      if (!standaloneDblpExports[year]) {
        throw new Error(`No direct LASD DBLP export is configured for ${year}. For track editions, pass a downloaded BibTeX export file.`)
      }
      remoteEditions.push(year)
      index += 1
    } else {
      sourcePaths.push(args[index])
    }
  }

  const imports = []
  for (const sourcePath of sourcePaths) {
    const bibtex = fs.readFileSync(path.resolve(sourcePath), 'utf8')
    imports.push(...extractEntries(bibtex))
  }
  for (const year of remoteEditions) {
    const response = await fetch(standaloneDblpExports[year], {
      headers: { Accept: 'application/x-bibtex', 'User-Agent': 'LASD-publications-catalog/1.0' }
    })
    const bibtex = await response.text()
    const contentType = response.headers.get('content-type') || ''
    if (!response.ok || !/bibtex|text\/plain/i.test(contentType) || !/@inproceedings/i.test(bibtex)) {
      throw new Error(`DBLP export for ${year} returned HTTP ${response.status} (${contentType}). If DBLP showed a bot check, download its BibTeX export in a browser and pass the saved .bib file instead.`)
    }
    imports.push(...extractEntries(bibtex))
  }
  return imports
}

async function main() {
  const incoming = await readImports(process.argv.slice(2))
  if (incoming.length === 0) {
    throw new Error('Pass one or more downloaded .bib files, or use --dblp 2021.')
  }

  const existing = extractEntries(fs.readFileSync(outputPath, 'utf8'))
  const byTitle = new Map()
  for (const entry of existing) {
    const metadata = entryMetadata(entry)
    byTitle.set(recordKey(metadata), { entry, metadata })
  }

  let imported = 0
  let skipped = 0
  for (const entry of incoming) {
    const metadata = entryMetadata(entry)
    if (metadata.type !== 'paper-conference') {
      skipped += 1
      continue
    }
    if (!lasdTrackFiles && !/LASD|Lean and Agile Software Development/i.test(metadata.container)) {
      throw new Error(`Refusing to import a non-LASD paper: ${metadata.title}`)
    }
    byTitle.set(recordKey(metadata), { entry, metadata })
    imported += 1
  }

  const records = [...byTitle.values()]
    .sort((a, b) => b.metadata.year - a.metadata.year || a.metadata.title.localeCompare(b.metadata.title))
    .map(({ entry }) => entry)
  const heading = '% LASD paper records. Refresh with `npm run publications:update -- <export.bib>` or `npm run publications:update -- --dblp 2021`.\n\n'
  fs.writeFileSync(outputPath, `${heading}${records.join('\n\n')}\n`)
  console.log(`Imported ${imported} paper entries; skipped ${skipped} non-paper entries; catalog now has ${records.length} papers.`)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
