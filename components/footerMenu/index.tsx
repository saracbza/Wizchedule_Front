import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import Home from '../../app/internA/pages/home'
import Agendamentos from '../../app/internA/pages/agendamentos'
import Profile from '../../app/internA/profile'
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const {Navigator, Screen} = createBottomTabNavigator()

export default function FooterMenu() {
    return (
        <NavigationContainer independent={true}>
          <Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                let iconName
    
                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline'
                }else if (route.name === 'Agendamentos') {
                  iconName = focused ? 'calendar' : 'calendar-outline'
                }else if (route.name === 'Profile') {
                  iconName = focused ? 'person' : 'person-outline'
                }
    
                return (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name={iconName} size={44} color={'#cf1111'} />
                  </View>
                )
              },
              tabBarShowLabel: false,
              tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: 0
                ,
                height: 70,
    
                elevation: 10,
                shadowColor: 'black',
                shadowOffset: {
                  height: 0,
                  width: 0
                },
                shadowOpacity: 0.1,
                shadowRadius: 10
              }
            })}
          >
            <Screen name="Home" component={Home} options={{ title: '' }}/>
            <Screen name="Agendamentos" component={Agendamentos} />
            <Screen name="Perfil" component={Profile}/>
          </Navigator>
        </NavigationContainer>
      )
}

