import { Slot } from 'expo-router'
import '@/global.css'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import Header from './header'
import FooterMenu from './footerMenu'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'

export default function Layout(){
    return(
        <GluestackUIProvider>
           {/* <NavigationContainer> */}
                <Header />
                <Slot />
                <FooterMenu />
          {/*  </NavigationContainer>*/}
        </GluestackUIProvider>
    )
}