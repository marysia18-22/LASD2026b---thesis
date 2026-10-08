import path from 'path'
import { readCsv, readJson } from '../utils'

const EDITION_PATH = './data/edition.json'
const COMMITTEE_PATH = './data/committee.csv'
const CHAIRS_PATH = './data/chairs.csv'
const LOGO_BY_HOST = {
  ISD: '/ais.png',
  SAC: '/ACM_logo.png',
}

function resolveLogos(cert, edition) {
  if (Array.isArray(cert.logos)) return cert.logos
  const mapped = LOGO_BY_HOST[edition.host?.name]
  if (mapped) return [mapped]
  return [cert.logo || edition.branding.logo]
}

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

export function loadChairs() {
  return readCsv(CHAIRS_PATH)
}

export function publicLogoPath(logoUrl) {
  if (!logoUrl) throw new Error('publicLogoPath: missing logoUrl')
  const relative = logoUrl.replace(/^\//, '')
  return path.join(process.cwd(), 'public', relative)
}

export function certificateFilename(member, edition) {
  const slug = `${member.lastName}-${member.firstName}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return `${edition.series}-${edition.year}-PC-${slug}.pdf`
}

export function buildCertificateViewModel(member, edition, orientation = 'portrait') {
  const cert = edition.certificate
  const displayName = `${member.firstName} ${member.lastName}`
  const logoUrls = resolveLogos(cert, edition)
  const chairs = loadChairs()

  const signatories = chairs.map((chair, index) => ({
    name: `${chair.firstName} ${chair.lastName}`,
    title: 'Track Chair',
    signatureImage: cert.signatories?.[index]?.signatureImage,
  }))

  return {
    title: cert.title,
    conferenceTitle: `${edition.series}@${edition.host.name}'${String(edition.year).slice(-2)}`,
    trackTitle: `Track on ${edition.seriesFullName}`,
    topicTitle: `at the ${edition.host.fullName}`,
    intro: cert.intro,
    body: cert.body,
    displayName,
    orientation,
    chairs: signatories,
    signatories: signatories
      .filter((signatory) => signatory.signatureImage)
      .map((signatory) => ({
        ...signatory,
        signatureImage: publicLogoPath(signatory.signatureImage),
      })),
    logoPaths: logoUrls.map(publicLogoPath),
  }
}
