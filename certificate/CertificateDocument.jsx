import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer'

const A4 = { w: 595.28, h: 841.89 }

// One navy family for all text, one gold for all accents.
const COLORS = {
  navyDeep: '#14294a', // name, conference title
  navy: '#1e3a5f',     // headings, frame
  slate: '#4a5d78',    // body and supporting text
  gold: '#b08d57',     // rules, corners, labels
  paper: '#ffffff',
}

const METRICS = {
  portrait: {
    pageW: A4.w,
    pageH: A4.h,
    minHeight: A4.h,
    nameMaxW: 440,
    pagePad: 22,
    framePad: 6,
    padH: 46,
    padV: 36,
    logoW: 150,
    logoH: 55,
    conference: 30,
    track: 14,
    topic: 12.5,
    title: 20,
    dividerW: 200,
    intro: 13,
    name: 38,
    body: 12.5,
    bodyW: '86%',
    chairLabel: 12,
    chairName: 15,
    sigImgH: 40,
    corner: 26,
  },
  landscape: {
    pageW: A4.h,
    pageH: A4.w,
    nameMaxW: 650,
    pagePad: 20,
    framePad: 5,
    padH: 60,
    padV: 22,
    logoW: 150,
    logoH: 55,
    conference: 25,
    track: 12,
    topic: 11,
    title: 17,
    dividerW: 180,
    intro: 11,
    name: 32,
    body: 10.5,
    bodyW: '76%',
    chairLabel: 10.5,
    chairName: 13,
    sigImgH: 28,
    corner: 20,
  },
}

const createStyles = (m) =>
  StyleSheet.create({
    page: {
      width: m.pageW,
      height: m.pageH,
      ...(m.minHeight ? { minHeight: m.minHeight } : {}),
      padding: m.pagePad,
      fontFamily: 'NotoSans',
      backgroundColor: COLORS.paper,
    },

    // Frame
    outerFrame: {
      flex: 1,
      borderWidth: 1.5,
      borderColor: COLORS.navy,
      padding: m.framePad,
    },
    innerFrame: {
      flex: 1,
      borderWidth: 0.6,
      borderColor: COLORS.gold,
      paddingHorizontal: m.padH,
      paddingVertical: m.padV,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    corner: { position: 'absolute', width: m.corner, height: m.corner },
    cornerTL: { top: 6, left: 6, borderTopWidth: 2, borderLeftWidth: 2, borderColor: COLORS.gold },
    cornerTR: { top: 6, right: 6, borderTopWidth: 2, borderRightWidth: 2, borderColor: COLORS.gold },
    cornerBL: { bottom: 6, left: 6, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: COLORS.gold },
    cornerBR: { bottom: 6, right: 6, borderBottomWidth: 2, borderRightWidth: 2, borderColor: COLORS.gold },

    // Logo (upper-left corner, nudged out toward the corner bracket)
    logoRow: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginLeft: 34 - m.padH,
      marginTop: -6,
    },
    logo: {
      width: m.logoW,
      height: m.logoH,
      objectFit: 'contain',
      objectPosition: 'left center',
    },

    // Heading
    heading: { alignItems: 'center', width: '100%' },
    conferenceTitle: {
      fontSize: m.conference,
      fontWeight: 700,
      color: COLORS.navyDeep,
      textAlign: 'center',
    },
    trackTitle: {
      fontSize: m.track,
      fontWeight: 700,
      color: COLORS.navy,
      textAlign: 'center',
      lineHeight: 1.35,
      marginTop: 6,
    },
    topicTitle: {
      fontSize: m.topic,
      color: COLORS.slate,
      textAlign: 'center',
      lineHeight: 1.35,
      marginTop: 1,
    },

    // Certificate title
    titleBlock: { alignItems: 'center', width: '100%' },
    title: {
      fontSize: m.title,
      fontWeight: 700,
      color: COLORS.gold,
      textAlign: 'center',
      letterSpacing: 1,
    },
    divider: {
      width: m.dividerW,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gold,
      marginTop: 10,
    },

    // Recipient
    recipient: { alignItems: 'center', width: '100%' },
    intro: {
      fontSize: m.intro,
      color: COLORS.slate,
      textAlign: 'center',
      marginBottom: 8,
    },
    name: {
      fontSize: m.name,
      fontWeight: 700,
      color: COLORS.navyDeep,
      textAlign: 'center',
    },
    body: {
      fontSize: m.body,
      lineHeight: 1.65,
      color: COLORS.slate,
      textAlign: 'center',
      width: m.bodyW,
      marginTop: 12,
    },

    // Chairs
    chairSection: { alignItems: 'center', width: '100%' },
    chairHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '60%',
      marginBottom: 10,
    },
    chairRule: {
      flex: 1,
      borderBottomWidth: 0.6,
      borderBottomColor: COLORS.gold,
    },
    chairLabel: {
      fontSize: m.chairLabel,
      fontWeight: 700,
      color: COLORS.gold,
      letterSpacing: 1.2,
      marginHorizontal: 12,
    },
    chairRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: '100%',
    },
    chair: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: 8,
    },
    signatureImage: {
      width: '80%',
      height: m.sigImgH,
      objectFit: 'contain',
    },
    signatureLine: {
      width: '80%',
      borderBottomWidth: 0.8,
      borderBottomColor: COLORS.gold,
      marginBottom: 5,
    },
    chairName: {
      fontSize: m.chairName,
      fontWeight: 700,
      color: COLORS.navy,
      textAlign: 'center',
    },
    // chairTitle: {
    //   fontSize: 9,
    //   color: COLORS.slate,
    //   textAlign: 'center',
    //   marginTop: 1,
    // },
  })

const STYLES = {
  portrait: createStyles(METRICS.portrait),
  landscape: createStyles(METRICS.landscape),
}


const CertificateDocument = ({ data }) => {
  const orientation = data.orientation === 'landscape' ? 'landscape' : 'portrait'
  const styles = STYLES[orientation]
  const m = METRICS[orientation]
  // Shrink long names so they stay on one line (~0.6em per bold character)
  const nameLen = (data.displayName || '').length || 1
  const nameSize = Math.min(m.name, m.nameMaxW / (nameLen * 0.6))
  const chairs = data.chairs || []
  const signatories = data.signatories || []
  const logoPath = (data.logoPaths || [])[0]

  const signatureFor = (chair) =>
    signatories.find((s) => s.name === chair.name)

  return (
    <Document>
      <Page size="A4" orientation={orientation} style={styles.page} wrap={false}>
        <View style={styles.outerFrame}>
          <View style={styles.innerFrame}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />

            {/* 1 · Logo (upper left) */}
            <View style={styles.logoRow}>
              {logoPath && <Image src={logoPath} style={styles.logo} />}
            </View>

            {/* 2 · Conference identity */}
            <View style={styles.heading}>
              <Text style={styles.conferenceTitle}>{data.conferenceTitle}</Text>
              <Text style={styles.trackTitle}>{data.trackTitle}</Text>
              <Text style={styles.topicTitle}>{data.topicTitle}</Text>
            </View>

            {/* 3 · Certificate title */}
            <View style={styles.titleBlock}>
              <Text style={styles.title}>{data.title}</Text>
              <View style={styles.divider} />
            </View>

            {/* 4 · Recipient */}
            <View style={styles.recipient}>
              <Text style={styles.intro}>{data.intro}</Text>
              <Text style={[styles.name, { fontSize: nameSize }]}>
                {data.displayName}
              </Text>
              <Text style={styles.body}>{data.body}</Text>
            </View>

            {/* 5 · Track chairs */}
            <View style={styles.chairSection}>
              <View style={styles.chairHeader}>
                <View style={styles.chairRule} />
                <Text style={styles.chairLabel}>Track Chairs</Text>
                <View style={styles.chairRule} />
              </View>

              <View style={styles.chairRow}>
                {chairs.map((chair) => {
                  const sig = signatureFor(chair)
                  return (
                    <React.Fragment key={chair.name}>
                      <View style={styles.chair}>
                        {sig && (
                          <>
                            <Image src={sig.signatureImage} style={styles.signatureImage} />
                            {/* <Text style={styles.chairName}>{chair.name}</Text> */}
                            <View style={styles.signatureLine} />
                          </>
                        )}
                        <Text style={styles.chairName}>{chair.name}</Text>
                        {/* {sig && (
                          <Text style={styles.chairTitle}>
                            {sig.title || 'Track Chair'}
                          </Text>
                        )} */}
                      </View>
                    </React.Fragment>
                  )
                })}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default CertificateDocument