import { type FC } from "react";
import { Stack, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { theme } from "./utils";
import store from '../Store'
import LoggerProvider from "../Hooks/Logger"
import '../Translations'
import '../index.css'

const TestContainer: FC<WithChildren> = ({ children }) => {
  return <Provider store={store}>
    <LoggerProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Stack
            display='flex'
            width='100vw'
            height='100vh'
          >
            {children}
          </Stack>
        </Router>
      </ThemeProvider>
    </LoggerProvider>
  </Provider>
}

export default TestContainer