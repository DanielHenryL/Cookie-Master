import { Layout } from "@/components/layout"
import {Card, CardHeader, CardContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@mui/material'
import { ChangeEvent, useEffect, useState } from "react"
import Cookies from 'js-cookie'

const ThemeChangerPage = () => {
    const [currentTheme, setCurrentTheme] = useState('light')
    const onThemeChange = ( event:ChangeEvent<HTMLInputElement>) => {
        setCurrentTheme( event.target.value)
        localStorage.setItem('theme',event.target.value)
        Cookies.set('theme', event.target.value )
    }

    useEffect(() => {
      setCurrentTheme(localStorage.getItem('theme') || '')
    }, [])
    
  return (
    <Layout>
        <Card>
            <CardHeader title='Cambiar Modo'/>
            <CardContent>
                <FormControl>
                    <FormLabel>Tema</FormLabel>
                    <RadioGroup
                        value={currentTheme}
                        onChange={onThemeChange}
                    >
                        <FormControlLabel value={'light'} control={<Radio/>} label='Light'/>
                        <FormControlLabel value={'dark'} control={<Radio/>} label='Dark'/>
                        <FormControlLabel value={'custom'} control={<Radio/>} label='Custom'/>
                    </RadioGroup>
                </FormControl>
            </CardContent>
        </Card>
    </Layout>
  )
}

export default ThemeChangerPage;