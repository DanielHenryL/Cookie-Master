import { ChangeEvent, FC, useEffect, useState } from "react"
import { GetServerSideProps } from 'next'
import { Button, CardActions, Card, CardHeader, CardContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@mui/material'
import Cookies from 'js-cookie'
import axios from "axios"

import { Layout } from "@/components/layout"

const ThemeChangerPage:FC = (props) => {
    console.log(props)
    const [currentTheme, setCurrentTheme] = useState('light')
    const onThemeChange = ( event:ChangeEvent<HTMLInputElement>) => {
        setCurrentTheme( event.target.value)
        localStorage.setItem('theme',event.target.value)
        Cookies.set('theme', event.target.value )
    }

    useEffect(() => {
      setCurrentTheme(localStorage.getItem('theme') || '')
      console.log('cookies:', Cookies.get('theme'))
    }, [])
    
    const onClick = async() =>{
        const { data } = await axios.get('/api/hello')
        console.log({data})
    }
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
            <CardActions>
                <Button
                    variant="outlined"
                    onClick={ onClick }
                >
                    Solicitud
                </Button>
            </CardActions>
        </Card>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const { name='No name' , theme='light'} = req.cookies;
   
    return {
        props: {
            name,
            theme,
        }
    }
}


export default ThemeChangerPage;