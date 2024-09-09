
/*import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Home from './home';
import Agendamentos from './agendamentos';
import Profile from './profile';

const Tab = createBottomTabNavigator()

export default function FooterMenu() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: '#aaa',
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Agendamentos" component={Agendamentos} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
    },
})*/

import * as React from "react"
import { StyleSheet, Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from "./home"
import Agendamentos from "./agendamentos"
import Profile from "./profile"

const Tab = createBottomTabNavigator();

export default function FooterMenu() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            }else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }else if (route.name === 'Add') {
              iconName = focused ? 'add' : 'add-outline';
            }else if (route.name === 'Notifications') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            }

            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: -30 }}>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            )
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 40,
            left: 20,
            right: 20,
            borderRadius: 20,
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
        <Tab.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        <Tab.Screen name="Add" component={Agendamentos} options={{ title: 'Add' }} />
        <Tab.Screen name="Settings" component={Profile} options={{ title: 'Settings' }}  />
      </Tab.Navigator>
    </NavigationContainer>
  )
}