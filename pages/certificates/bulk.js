import Head from 'next/head'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { isUsingDevAdminSecret } from '../../certificate/auth'

export default function BulkCertificatesPage({ edition, memberCount, enabled }) {
  const [secret, setSecret] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const title = `${edition?.series || 'LASD'} ${edition?.year || ''}`.trim();

  async function handleDownload(event) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/certificates/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({ secret }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Request failed (${res.status})`)
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `LASD-${edition.year}-PC-certificates.zip`
      anchor.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!enabled) {
    return (
      <Container className="py-5">
        <Head><title>Bulk certificates · {title}</title></Head>
        <Alert variant="warning">Certificate generation is disabled in edition.json.</Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5" style={{ maxWidth: 560 }}>
      <Head>
        <title>Bulk certificates · {title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <h1 className="h3 mb-3">Bulk certificate export</h1>
      <p className="text-muted">
        Organizers only. Generates one PDF per program committee member ({memberCount} people) and downloads a ZIP file.
      </p>

      {isUsingDevAdminSecret() && (
        <Alert variant="warning" className="small">
          Development mode: default admin secret is active. Set <code>CERTIFICATE_ADMIN_SECRET</code> on Netlify before going live.
        </Alert>
      )}

      <Form onSubmit={handleDownload}>
        <Form.Group className="mb-3">
          <Form.Label>Organizer secret</Form.Label>
          <Form.Control
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="CERTIFICATE_ADMIN_SECRET"
            required
            autoComplete="off"
          />
          <Form.Text className="text-muted">
            Same value as the <code>CERTIFICATE_ADMIN_SECRET</code> environment variable.
          </Form.Text>
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button type="submit" variant="primary" disabled={loading || !secret}>
          {loading ? 'Generating…' : 'Download ZIP of all certificates'}
        </Button>
      </Form>

      <p className="text-muted small mt-4 mb-0">
        Not linked from the public site. Share this URL only with track chairs.
      </p>
    </Container>
  )
}

export async function getStaticProps() {
  const { loadEdition, loadCommitteeMembers } = await import('../../certificate/data')
  const edition = loadEdition()
  const members = edition.certificate?.enabled ? loadCommitteeMembers() : []

  return {
    props: {
      edition: {
        branding: edition.branding,
        year: edition.year,
      },
      memberCount: members.length,
      enabled: Boolean(edition.certificate?.enabled),
    },
  }
}
