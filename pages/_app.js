import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`
  /* reset CSS */
  /*
    Colors: https://coolors.co/540d6e-ee4266-ffd23f-f3fcf0-1f271b
    540d6e purple
    ee4266 pink
    ffd23f yellow
    f3fcf0 white
    1f271b pine tree? mossy green
  */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'Open Comic';
    src: url("fonts/OpenComicFont.ttf");
  }

  body {
    background-color: var( --backgroundPrimary );
    font-family: 'Open Comic', 'Comic Sans', sans-serif;
  }

  #__next {
    display: flex;
    min-height: 100vh;
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
