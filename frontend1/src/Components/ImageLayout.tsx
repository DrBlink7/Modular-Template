import { type FC } from 'react'
import { type WithChildren } from '../types'
import { randomBg } from '../Utils/config'

type ImageLayoutProps = WithChildren & {
  className?: string
  url?: string
}

const ImageLayout: FC<ImageLayoutProps> = ({ className = '', url = randomBg, children }) => (
  <div
    className={`flex bg-cover bg-center bg-no-repeat h-full ${className}`}
    style={{
      backgroundImage: `url(${url})`,
      backgroundColor: 'var(--fallback-b1,oklch(var(--b1)/1))'
    }}
  >
    {children}
  </div>
)

export default ImageLayout
