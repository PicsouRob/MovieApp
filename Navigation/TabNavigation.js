import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements'

import SearchMovies from './SearchStackNavigation';
import MoviesFav from './FavStackNavigation';

const Tab = createBottomTabNavigator();

const MovieTabNavigator = () => (
    <Tab.Navigator
        initialRouteName="Search"
        tabBarOptions={{
            inactiveTintColor:"gray",
            activeTintColor:"#0171b7",
            // activeBackgroundColor: "green"
        }}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
    >
        <Tab.Screen name="Search" component={SearchMovies} 
            options={{ title: "Recherche" }}/>
        <Tab.Screen name="Favorites" component={MoviesFav}
            options={{ title: "Mes Favoris" }}/>
    </Tab.Navigator>
)

function screenOptions(route, color) {
    var iconName;
    switch (route.name) {
        case "Search":
            iconName="search-sharp";
            break;
        case "Favorites":
            iconName="heart-circle";
            break;
        default:
            break;
    }
    return (
        <Icon type="ionicon" name={iconName} size={25} color={color}/>
    )
}

export default () => (
    <NavigationContainer>
        <MovieTabNavigator/>
    </NavigationContainer>
)
