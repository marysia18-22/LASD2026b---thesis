const DEV_ADMIN_SECRET = 'lasd_pdf_2026'

export function getAdminSecret() {
  return process.env.CERTIFICATE_ADMIN_SECRET || DEV_ADMIN_SECRET
}

export function isAuthorizedAdmin(req) {
  const secret = getAdminSecret()
  const header = req.headers.authorization
  if (header?.startsWith('Bearer ')) {
    return header.slice(7) === secret
  }
  const bodySecret = req.body?.secret
  if (bodySecret && bodySecret === secret) {
    return true
  }
  return false
}

export function isUsingDevAdminSecret() {
  return !process.env.CERTIFICATE_ADMIN_SECRET
}
