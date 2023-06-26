import '@/styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { customTheme, darkTheme, lightTheme } from '@/themes';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface Props extends AppProps{
  theme:string
}
export default function App({ Component, pageProps, theme='dark' }: Props) {
  
  const [currentTheme, setCurrentTheme] = useState(lightTheme)
  
  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light';
    const seleteedTheme = cookieTheme === 'light'
      ? lightTheme
      : (cookieTheme==='dark')
        ? darkTheme
        : customTheme
    
    setCurrentTheme(seleteedTheme)
  }, [])
  
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />

    </ThemeProvider>
  )
}

// App.getInitialProps = async( ctx:AppContext ) => {

//   const {theme} = ctx.ctx.req? ( ctx.ctx.req as any).cookies: { theme : 'light' }

//   const validThemes = ['light', 'dark', 'custom']

//   return {
//     theme: validThemes.includes(theme) ? theme:'dark'
//   }
// } 