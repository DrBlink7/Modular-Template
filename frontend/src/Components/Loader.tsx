import { type FC } from 'react'
import { CircularProgress, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface LoaderProps {
  title?: string
  text?: string
}

const Loader: FC<LoaderProps> = ({ title, text }) => {
  const { t } = useTranslation()

  return <Stack
    data-testid="loader-container"
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <Typography data-testid="title">{(title ?? t('loader.title'))}</Typography>
    <CircularProgress data-testid="loader" />
    <Typography data-testid="text" marginTop={2}>
      {(text ?? t('loader.text'))}
    </Typography>
  </Stack>
}

export default Loader
