import React from 'react'
import { renderToBuffer } from '@react-pdf/renderer'
import './fonts'
import CertificateDocument from './CertificateDocument'
import { buildCertificateViewModel } from './data'

export async function renderCertificatePdf(member, edition, orientation = 'portrait') {
  const data = buildCertificateViewModel(member, edition, orientation)
  return renderToBuffer(<CertificateDocument data={data} />)
}
