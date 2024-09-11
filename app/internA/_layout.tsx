import { Slot } from 'expo-router'
import '@/global.css'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import Header from './header'
import FooterMenu from './footerMenu'
import React from 'react'

export default function Layout() {
    return (
            <GluestackUIProvider>
               {/*<FooterMenu /> */} 
                <Header />
                <Slot />
            </GluestackUIProvider>
    )
}
