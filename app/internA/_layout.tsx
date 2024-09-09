import { Slot } from 'expo-router'
import '@/global.css'
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import Header from './header'

export default function Layout(){
    return(
        <GluestackUIProvider>
        <Header/>
            <Slot/> 
        </GluestackUIProvider>
    )
}
