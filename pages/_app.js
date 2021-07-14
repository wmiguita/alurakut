import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`
  /* reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #d9e6f6;
    font-family: 'Comic Sans', sans-serif;
  }

  #__next {
    display: flex;
    min-height: 110vh;
    flex-direction: column;
  }

  img {
    display: block;
    height: auto;
    max-width: 100%;
  }

  .avatar {
    border-radius: 8px;
  }

  ${ AlurakutStyles }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
