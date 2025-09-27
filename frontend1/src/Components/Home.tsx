import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme, Box, Typography, Button, Paper } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

interface HomeProps {
  handleLogOut: () => void
}

const Home: FC<HomeProps> = ({ handleLogOut }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  return <Box
    component={Paper}
    elevation={10}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'flex-start',
      width: '35%',
      maxWidth: '600px',
      padding: '4%',
      borderRadius: '5%',
      height: '55%',
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.main
    }}
    data-testid="home-component"
  >
    <Box display='flex' width='100%' justifyContent='center' height='30%'>
      <Typography variant='h6' data-testid="home-title">{t('home.title')}</Typography>
    </Box>
    <Box display='flex' width='100%' justifyContent='space-between' flexDirection='column' gap='4vh'>
      <Box display='flex' flexDirection='column' gap='1vh'>
        <Typography alignSelf='center'>{t('home.welcome')}</Typography>

      </Box>
      <Box display='flex' flexDirection='column' gap='1vh'>
        <Typography alignSelf='center'>{t('home.logout')}</Typography>
        <Button
          variant="contained"
          endIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
          sx={{ boxShadow: 10 }}
          onClick={handleLogOut}
          data-testid="browse-campaigns"
        >
          {t('home.logoutButton')}
        </Button>
      </Box>
    </Box>
  </Box>
}

export default Home
