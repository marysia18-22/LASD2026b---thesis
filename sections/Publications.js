import { useEffect, useMemo, useState } from 'react'
import { Cite } from '@citation-js/core'
import '@citation-js/plugin-bibtex'
import Container from 'react-bootstrap/Container'

const normalizeSearchText = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase()

const Publications = () => {
  const [entries, setEntries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch('/lasd-publications.bib')
      .then((response) => response.text())
      .then((bibtex) => setEntries(new Cite(bibtex).data))
      .catch(() => setEntries([]))
  }, [])

  const filtered = useMemo(() => {
    const terms = normalizeSearchText(query).trim().split(/\s+/).filter(Boolean)
    if (terms.length === 0) return []
    return entries.filter((entry) => {
      const authors = (entry.author || []).map(({ family, given }) => `${given || ''} ${family || ''}`).join(' ')
      const year = entry.issued?.['date-parts']?.[0]?.[0] || ''
      const haystack = normalizeSearchText(`${entry.title || ''} ${authors} ${year} ${entry['container-title'] || ''}`)
      return terms.every((term) => haystack.includes(term))
    }).sort((a, b) => {
      const yearA = a.issued?.['date-parts']?.[0]?.[0] || 0
      const yearB = b.issued?.['date-parts']?.[0]?.[0] || 0
      return yearB - yearA || a.title.localeCompare(b.title)
    })
  }, [entries, query])

  return (
    <Container fluid="md" className="section bg-white p-4 my-5 rounded">
      <a className="target" id="publications" />
      <h2 className="display-4 anchor mb-3">Publications</h2>
      <p>Search LASD papers by title, author, year, or proceedings. </p>
      {/* <p className="text-muted"><small>Records are compiled from DBLP and publisher proceedings pages. Search includes papers published in LASD proceedings and tracks; revised versions published in a later volume appear as separate citations.</small></p> */}
      <label className="sr-only" htmlFor="publication-search">Search publications</label>
      <input
        id="publication-search"
        className="form-control mb-3"
        type="search"
        placeholder="Search papers or authors"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {query.trim() && <p className="text-muted" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'paper' : 'papers'} found</p>}
      {entries.length === 0 && <p>Loading publication records…</p>}
      {entries.length > 0 && !query.trim() && <p className="text-muted">Enter a title, author, year, or proceedings name to search the catalog.</p>}
      {entries.length > 0 && filtered.length === 0 && <p>No matching papers found.</p>}
      <ul className="list-unstyled">
        {filtered.map((entry) => (
          <li key={entry.id} className="mb-3">
            <strong>{entry.title}</strong>
            <div>{entry.author?.map(({ family, given }) => `${given || ''} ${family || ''}`.trim()).join(', ')} ({entry.issued?.['date-parts']?.[0]?.[0]})</div>
            <small className="text-muted">{entry['container-title']}</small>
            {entry.URL && <div><a href={entry.URL} target="_blank" rel="noopener noreferrer">Paper / proceedings</a></div>}
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default Publications
