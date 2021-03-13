import React from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator, TouchableOpacity, StatusBar} from 'react-native';

import FilmList from './FilmList';
import { getSearchFilm } from '../TMdb/TMdbapi';

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.inputText = ""
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoadFilms: false
        }
        this._loadFilm = this._loadFilm.bind(this)
    }

    _displayLoading() {
        if(this.state.isLoadFilms) {
            return (
                <View style={ styles.loading_container }>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
    }

    _searchFilms() {
        this.page = 0;
        this.totalPages = 0;
        this.setState({
            films: []
        }, () => {
            this._loadFilm();
        }) 
    }

    _loadFilm() {
        if(this.inputText.length > 0) {
            this.setState({ isLoadFilms: true });
            getSearchFilm(this.inputText, this.page+1)
            .then(data => {
                this.page = data.page,
                this.totalPages = data.total_pages
                this.setState({ 
                    films: [ ...this.state.films, ...data.results ],
                    isLoadFilms: false
                });
            });
        };
    };

    _filmNameTextInput = (text) => {
        this.inputText = text;
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#0171b7"/>
                <TextInput 
                    onSubmitEditing={ () => this._searchFilms() } 
                    onChangeText={ (text) => this._filmNameTextInput(text) } 
                    style={styles.textinput} 
                    placeholder="Titre du film"
                />
                <TouchableOpacity style={styles.button} onPress={ () => this._searchFilms()}>
                    <Text style={styles.button_text}>Rechercher</Text>
                </TouchableOpacity>
                <FilmList
                    film={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilm}
                    page={this.page}
                    totalPages={this.totalPages}
                    favoriteList={false}
                />
                { this._displayLoading() }
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "#e7ebee"
    },
    textinput: {
        marginTop: 20,
        marginHorizontal: 5,
        height: 60,
        backgroundColor: "#FFF",
        paddingLeft: 10,
        borderRadius: 10,
        shadowRadius: 10,
        shadowOffset: {height: 35, width: 15},
        shadowColor: "#000",
        elevation: 8,
        shadowOpacity: 1,
        color: "#0171b7",
        fontSize: 18,
    },
    button: {
        height: 50, 
        marginVertical: 10,
        marginHorizontal: 5,
        backgroundColor: "#0171b7",
        justifyContent: "center",
        alignItems: "center",
        height: 60,
        borderRadius: 10,
    },
    button_text: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold"
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        color: "blue"
    }
});

export default Search;