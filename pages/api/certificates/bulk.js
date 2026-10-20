import JSZip from 'jszip'
import { isAuthorizedAdmin } from '../../../certificate/auth'
import {
  loadEdition,
  loadCommitteeMembers,
  certificateFilename,
} from '../../../certificate/data'
import { renderCertificatePdf } from '../../../certificate/render'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

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

  const members = loadCommitteeMembers()
  if (members.length === 0) {
    return res.status(404).json({ error: 'No committee members found' })
  }

  try {
    const zip = new JSZip()
    const orientation = req.body?.orientation === 'landscape' ? 'landscape' : 'portrait'

    for (const member of members) {
      const pdf = await renderCertificatePdf(member, edition, orientation)
      const filename = certificateFilename(member, edition).replace('.pdf', `-${orientation}.pdf`)
      zip.file(filename, pdf)
    }

    const buffer = await zip.generateAsync({ type: 'nodebuffer' })
    const zipName = `LASD-${edition.year}-PC-certificates-${orientation}.zip`

    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', `attachment; filename="${zipName}"`)
    res.setHeader('Cache-Control', 'private, no-store')
    return res.status(200).send(buffer)
  } catch (err) {
    console.error('Bulk certificate error:', err)
    return res.status(500).json({ error: 'Failed to generate certificates' })
  }
}
