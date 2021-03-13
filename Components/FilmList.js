import React from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux';

import FilmItem from './FilmItem'

class FilmList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
        }
    }

    _displayDetailFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm });
    }

    render() {
        const { film, page, totalPages } = this.props;
        return (
            <FlatList
                style={styles.list}
                data={film}
                keyExtractor={(item) => item.id.toString()}
                extraData={this.props.favoriteFilm}
                onEndReachedThreshold={0,5}
                renderItem={({item}) => 
                    <FilmItem film={item} 
                    detailFilm={this._displayDetailFilm}
                    isFavorite={(this.props.favoriteFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                />}
                onEndReached={ () => {
                    if(page < totalPages) {
                        this.props.loadFilms();
                    }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    }
});

const mapStateToProps = state => {
    return {
        favoriteFilm: state.favoriteFilm,
    }
}


export default connect(mapStateToProps)(FilmList);

