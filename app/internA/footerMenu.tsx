
import React from 'react';
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
})