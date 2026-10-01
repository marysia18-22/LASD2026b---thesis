import { isAuthorizedAdmin } from '../../../certificate/auth'
import {
  loadEdition,
  loadCommitteeMembers,
  certificateFilename,
} from '../../../certificate/data'
import { renderCertificatePdf } from '../../../certificate/render'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!isAuthorizedAdmin(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const edition = loadEdition()
  if (!edition.certificate?.enabled) {
    return res.status(503).json({ error: 'Certificate generation is disabled' })
  }

  const [member] = loadCommitteeMembers()
  if (!member) {
    return res.status(404).json({ error: 'No committee members found' })
  }

  try {
    const orientation = req.body?.orientation === 'landscape' ? 'landscape' : 'portrait'
    const pdf = await renderCertificatePdf(member, edition, orientation)
    res.setHeader('Content-Type', 'application/pdf')
    const filename = certificateFilename(member, edition).replace('.pdf', `-${orientation}.pdf`)
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.setHeader('Cache-Control', 'private, no-store')
    return res.status(200).send(pdf)
  } catch (err) {
    console.error('Sample certificate error:', err)
    return res.status(500).json({ error: 'Failed to generate sample certificate' })
  }
}
