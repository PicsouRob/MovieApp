import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FavFilm from '../Components/FavFilm';
import FilmDetail from '../Components/FilmDetail';

const Stack = createStackNavigator();

const FavStackNavigation = () => (
    <Stack.Navigator>
        <Stack.Screen name="FavFilms" component={FavFilm} options={{ title: "Mes Favoris" }}/>
        <Stack.Screen name="Detail" component={FilmDetail} options={{ title: "Detail" }}/>
    </Stack.Navigator>
  );

export default () => (
    <FavStackNavigation/>
);
