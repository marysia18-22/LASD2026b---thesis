import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: 'NotoSans',
    fontSize: 11,
    backgroundColor: '#ffffff',
  },
  border: {
    borderWidth: 2,
    borderColor: '#1e3a5f',
    padding: 28,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 64,
    height: 64,
    objectFit: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#1e3a5f',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  role: {
    fontSize: 10,
    color: '#555',
  },
  intro: {
    fontSize: 11,
    textAlign: 'center',
    color: '#333',
    marginBottom: 6,
  },
  name: {
    fontSize: 26,
    fontWeight: 700,
    textAlign: 'center',
    color: '#0f172a',
    marginBottom: 14,
  },
  body: {
    fontSize: 10,
    lineHeight: 1.45,
    textAlign: 'center',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  closing: {
    fontSize: 9,
    textAlign: 'center',
    color: '#555',
    marginHorizontal: 28,
    marginBottom: 12,
  },
  meta: {
    fontSize: 9,
    textAlign: 'center',
    color: '#1e3a5f',
    marginBottom: 2,
  },
  signatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  signatureBlock: {
    alignItems: 'center',
    width: '30%',
  },
  signatureLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#94a3b8',
    marginBottom: 4,
    height: 22,
  },
  signatureName: {
    fontSize: 8,
    fontWeight: 700,
    textAlign: 'center',
  },
  signatureTitle: {
    fontSize: 7,
    color: '#64748b',
    textAlign: 'center',
  },
})

const CertificateDocument = ({ data }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page} wrap={false}>
      <View style={styles.border}>
        <View style={styles.header}>
          {data.logoPath ? (
            <Image src={data.logoPath} style={styles.logo} />
          ) : null}
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.role}>{data.roleLabel}</Text>
        </View>

        <Text style={styles.intro}>{data.intro}</Text>
        <Text style={styles.name}>{data.displayName}</Text>
        <Text style={styles.body}>{data.body}</Text>
        <Text style={styles.closing}>{data.closing}</Text>
        <Text style={styles.meta}>{data.conferenceLine}</Text>
        <Text style={styles.meta}>{data.eventLine}</Text>

        <View style={styles.signatures}>
          {data.signatories.map((sig) => (
            <View key={sig.name} style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>{sig.name}</Text>
              <Text style={styles.signatureTitle}>{sig.title}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
)

export default CertificateDocument
