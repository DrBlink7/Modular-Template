import { type FC } from 'react'
import { type WithChildren } from '../types'
import errorImage from '../assets/error.jpeg'
import ImageLayout from './ImageLayout'

const ErrorLayout: FC<WithChildren> = ({ children }) => (
  <ImageLayout
    url={errorImage}
    className="w-full overflow-x-hidden min-h-screen flex items-center justify-center"
  >
    <div className="flex flex-col items-center text-center bg-base-100/80 backdrop-blur-sm shadow-2xl w-1/3 p-8 rounded-3xl">
      {children}
    </div>
  </ImageLayout>
)

export default ErrorLayout
