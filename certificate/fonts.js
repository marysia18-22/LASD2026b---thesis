import { Font } from '@react-pdf/renderer'
import path from 'path'

const fontDir = path.join(process.cwd(), 'certificate/fonts') 

Font.register({
  family: 'NotoSans',
  fonts: [
    {
      src: path.join(fontDir, 'NotoSans-Regular.ttf'),
      fontWeight: 400,
    },
    {
      src: path.join(fontDir, 'NotoSans-Bold.ttf'),
      fontWeight: 700,
    },
  ],
})
