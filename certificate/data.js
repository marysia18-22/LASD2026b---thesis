import path from 'path'
import { readCsv, readJson } from '../utils'

const EDITION_PATH = './data/edition.json'
const COMMITTEE_PATH = './data/committee.csv'
const CHAIRS_PATH = './data/chairs.csv'

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

export function buildCertificateViewModel(member, edition, orientation = 'portrait') {
  const cert = edition.certificate
  const displayName = `${member.firstName} ${member.lastName}`
  const logoUrls = Array.isArray(cert.logos)
    ? cert.logos
    : [cert.logos?.[edition.conferenceType] || cert.logo || edition.branding.logo]
  const chairs = loadChairs()

  const signatories = chairs.map((chair, index) => ({
    name: `${chair.firstName} ${chair.lastName}`,
    title: 'Track Chair',
    signatureImage: cert.signatories?.[index]?.signatureImage,
  }))

  return {
    title: cert.title,
    conferenceTitle: cert.conferenceTitle || edition.branding.shortTitle,
    trackTitle: cert.trackTitle || `Track on ${edition.branding.trackName}`,
    topicTitle: cert.topicTitle || `at the ${edition.host.fullName}`,
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
