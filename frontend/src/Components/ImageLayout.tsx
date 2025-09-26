import { type FC } from 'react'
import { type Theme } from '@emotion/react'
import { Stack, type SxProps } from '@mui/material'
import { randomBg } from '../Utils/config'
import { type WithChildren } from '../exportedTypes'

type ImageLayoutProps = WithChildren & {
  sx?: SxProps<Theme>
  url?: string
}

const ImageLayout: FC<ImageLayoutProps> = ({ sx, url = randomBg, children }) => <Stack
  sx={{
    display: 'flex',
    backgroundImage: `url(${url})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    ...sx
  }}
>
  {children}
</Stack>

export default ImageLayout
