import React from 'react'
import { renderToBuffer } from '@react-pdf/renderer'
import './fonts'
import CertificateDocument from './CertificateDocument'
import { buildCertificateViewModel } from './data'

export async function renderCertificatePdf(member, edition) {
  const data = buildCertificateViewModel(member, edition)
  return renderToBuffer(<CertificateDocument data={data} />)
}
