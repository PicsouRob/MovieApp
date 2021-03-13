import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import FilmList from './FilmList';

class FavFilm extends React.Component {
    render() {
        return (
            <FilmList
                film={this.props.favoriteFilm}
                navigation={this.props.navigation}
                favoriteList={true}
            />
        )
    }
}

const styles = StyleSheet.create({
    
})

const mapStateToProps = state => {
    return {
        favoriteFilm: state.favoriteFilm,
    }
}

export default connect(mapStateToProps)(FavFilm);
