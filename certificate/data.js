import path from 'path'
import { readCsv, readJson } from '../utils'

const EDITION_PATH = './data/edition.json'
const COMMITTEE_PATH = './data/committee.csv'

export function loadEdition() {
  return readJson(EDITION_PATH)
}

export function loadCommitteeMembers() {
  const edition = loadEdition()
  if (!edition.certificate?.enabled) {
    return []
  }

  return readCsv(COMMITTEE_PATH)
}

export function publicLogoPath(logoUrl) {
  const relative = (logoUrl || '/ais.png').replace(/^\//, '')
  return path.join(process.cwd(), 'public', relative)
}

export function certificateFilename(member, edition) {
  const slug = `${member.lastName}-${member.firstName}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return `LASD-${edition.year}-PC-${slug}.pdf`
}

export function buildCertificateViewModel(member, edition) {
  const cert = edition.certificate
  const displayName = `${member.firstName} ${member.lastName}`

  return {
    title: cert.title,
    roleLabel: cert.roleLabel,
    intro: cert.intro,
    body: cert.body,
    closing: cert.closing,
    displayName,
    conferenceLine: `${edition.branding.shortTitle} · ${edition.host.name}`,
    eventLine: `${edition.dates.display} · ${edition.venue.display}`,
    signatories: cert.signatories || [],
    logoPath: publicLogoPath(cert.logo || edition.branding.logo),
  }
}
