# Maintaining the LASD publications catalog

This runbook describes how to find, verify, and add papers from a new LASD edition. The catalog displayed by the site is `public/lasd-publications.bib`; the browser parses it with Citation.js in `sections/Publications.js`.

## Find the full set for an edition

1. **Identify the event and where its proceedings live.** Start from the LASD edition history and official LASD site. Record the edition year, host conference, track name, proceedings publisher, and official proceedings or track URL.
2. **Find the track's complete table of contents.** Search the publisher's proceedings site and the host conference site for the LASD track. Useful source types in this project include DBLP for standalone LASD proceedings, Annals of Computer Science and Information Systems for FedCSIS, ACM/SIGAPP tables of contents for SAC, AIS Electronic Library for ISD, and Springer book/chapter pages for revised selected papers.
3. **Use a track list to establish membership.** Do not treat every paper in a large conference volume as LASD. Record every title and author on the official LASD track page or table of contents, and count the entries. A broad DBLP export or whole-volume BibTeX file is only a candidate source until it has been filtered against the LASD track list.
4. **Check for separate publication outputs.** Some editions have both conference proceedings and a later revised-selected-papers volume. Check the official LASD edition page and publisher contents for both. Retain distinct publication records when the publication venue or citation differs; do not collapse them solely because the research overlaps.
5. **Verify each paper's citation.** Prefer the publisher's article page or DBLP record for the final title, author order, publication year, pages, DOI, and URL. Check the DOI resolves to that paper. If no paper-level page exists, link the official proceedings page and include whatever reliable citation metadata is available.
6. **Reconcile the counts.** Compare the number of paper records to the official LASD track list, accounting for separate revised outputs. Investigate every mismatch. Keep a small note with the sources and counts when a source lists posters, keynotes, front matter, or other record types separately.

## Add verified BibTeX records

For a dedicated LASD DBLP export:

```bash
npm run publications:update -- path/to/lasd-export.bib
```

For example 2021 DBLP export:

```bash
npm run publications:update -- --dblp 2021
```

For a downloaded BibTeX file from an edition embedded in SAC, FedCSIS, or ISD, first retain only the LASD papers verified against that edition's official track list, then import the filtered file:

```bash
npm run publications:update -- --lasd-track path/to/verified-lasd-track.bib
```

`--lasd-track` disables the check that looks for “LASD” in the proceedings title. It does **not** identify or filter LASD papers from a whole-volume export. Never pass a full unrelated conference export with this flag. The importer merges records using normalized title, year, and proceedings name, then writes the combined catalog in year/title order. This key allows later revised publications to remain separate records.

Some publisher pages do not offer BibTeX exports. For those papers, create a BibTeX `@inproceedings` entry from the verified publisher citation, including `author`, `title`, `booktitle`, `year`, and `url`; add `pages` and `doi` when the source provides them. Use a unique citation key. Preserve the publisher's publication year even if it differs from the conference event year.

## Review before committing

- Compare imported titles and author order to the track's official contents.
- Check the expected count, duplicate titles, years, proceedings names, pages, DOI links, and paper links.
- Confirm that revised-selected versions appear as separate citations when they are distinct publications.
- Inspect `public/lasd-publications.bib` and the Publications section. The search UI uses BibTeX fields for title, authors, year, proceedings, and links.
- Review the resulting diff. The importer writes the catalog directly; keep the source exports and a copy of the previous catalog until the result has been reviewed.

## Current source coverage

The catalog currently has records for LASD editions from 2017 through 2026. Older editions may need source-by-source discovery because proceedings were published through different hosts and publishers. Treat the official track contents as the authority for whether a paper belongs in the catalog, and revisit the newest edition when its final proceedings become available.
