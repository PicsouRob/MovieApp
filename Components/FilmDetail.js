import React, { useEffect } from 'react'
import { View, Share, Platform, Text, ActivityIndicator, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import numeral from 'numeral'
import { connect } from 'react-redux'

import { getFilmDetailFromApi } from '../TMdb/TMdbapi'
import { getImageApi } from '../TMdb/TMdbapi'
import { favAction } from '../Store/Action/FavAction'

class FilmDetail extends React.Component {

  static options = ({ route }) => {
    const { params } = route;
    if(params.film !== undefined && Platform.OS === 'ios') {
      return {
        HeaderRight: <TouchableOpacity style={styles.header_right_botton} onPress={ () => params.shareFilm()}>
          <Icon name="share-outline" type="ionicon" size={25} />
        </TouchableOpacity>
      }
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
    this._shareFilm = this._shareFilm.bind(this);
  }

  _displayLoading () {
    if (this.state.isLoadFilms) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _shareFilm() {
    const { film } = this.state;
    Share.share({ title: film.title, message: film.overview });
  }

  _updateNavigationParam() {
    this.props.navigation.navigate('FilmDetail', {
      shareFilm: this._shareFilm,
      film: this.state.film,
    })
  }

  componentDidMount () {
    const favFilmIndex = this.props.favoriteFilm.findIndex(item => item.id === this.props.route.params.idFilm.id);
    if(favFilmIndex !== -1) {
      this.setState = ({
        film: this.props.favoriteFilm[favFilmIndex],
      }, () => this._updateNavigationParam());
    }

    this.setState({ isLoading: true })
    getFilmDetailFromApi(this.props.route.params.idFilm).then((data) => {
      this.setState({
        film: data,
        isLoadFilms: false
      }, () => { this._updateNavigationParam() })
    })
  }

  componentDidUpdate () {
    console.log(this.props.favoriteFilm)
    console.log(this.props);
  }

  _favoriteFilmToggle () {
    this.props.dispatch(favAction(this.state.film))
  }

  _isFavoriteToggle () {
    var imageSource = require("../image/heart-131965017458786724.png");
    if (this.props.favoriteFilm.findIndex((item) => item.id === this.state.film.id) !== -1) {
      imageSource = require("../image/fav1.png"); 
    }
    return (
      <Image style={styles.image_fav} source={imageSource} />
    )
  }

  _displayFlottingBottonAction() {
    const { film } = this.state;
    if(film != undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity style={styles.flottinActionBotton} onPress={ () => this._shareFilm()}>
          <Icon type="ionicon" name="share-social" color="#fff" size={30} />
        </TouchableOpacity>
      )
    }
  }

  _dispalyFilms () {
    const { film } = this.state
    if (this.state.film != undefined) {
      const time = film.runtime.toString()
      const hr = time.slice(0, 1)
      const min = time.slice(1, 3)
      return (
        <ScrollView style={styles.scrollView}>
          <View style={styles.image_container}>
            <Image style={{ height: 400 }} source={{
              uri: getImageApi(film.poster_path)
            }} />
          </View>
          <View style={styles.score}>
            <View style={styles.score_align}>
              <Icon name='star' type='font-awesome' color='#f1c40f' />
              <Text style={styles.score_bold}>{film.vote_average}</Text>
              <Text style={styles.score_gray}>{film.popularity}</Text>
            </View>
            <View style={styles.score_align}>
              <Icon
                style={{ color: 'yellow' }} name='star'
                type='font-awesome' color='green' />
              <Text style={styles.score_bold}>Rate This</Text>
              <Text></Text>
            </View>
            <View style={styles.score_align}>
              <Icon name='lastfm-square' type='font-awesome' color='green' />
              <Text style={styles.score_bold}>Metascore</Text>
              <Text style={styles.score_gray}>Critic Reviews</Text>
            </View>
          </View>
          <View style={styles.text_container}>
            <View style={styles.title_container}>
              <Text style={styles.title}>{film.title}</Text>
              <View style={styles.row}>
                <Text style={styles.info}>{film.release_date.slice(0, 4)}</Text>
                <Text style={styles.info}>{hr} h {min}mn</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.genre}>{film.genres.map((genre) => genre.name).join(' / ')}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.fav} onPress={() => this._favoriteFilmToggle()}>
              {this._isFavoriteToggle()}
            </TouchableOpacity>
          </View>
          <View style={styles.plot}>
            <Text style={styles.plot_text}>Plot Summary</Text>
            <Text style={styles.score_gray}>{film.overview}</Text>
          </View>
          <View style={styles.info_sup}>
            <Text>Budget: {numeral(film.budget).format('0,0[.]00 $')}</Text>
            <Text> Nombres de votes: {film.vote_count}</Text>
            <Text>Companie(s): {film.production_companies.map((company) => company.name).join(' / ')}</Text>
            <Text>Countrie: {film.production_countries.map((company) => company.name)}</Text>
          </View>
        </ScrollView>
      )
    }
  }

  render () {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._dispalyFilms()}
        {this._displayFlottingBottonAction()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  image_container: {
    height: 400
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollView: {
    flexDirection: 'column'
  },
  text_container: {
    marginTop: 60,
    marginHorizontal: 15,
    flexDirection: 'row'
  },
  title_container: {
    flex: 7,
    paddingVertical: 15,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  plot_text: {
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: 'bold'
  },
  plot: {
    marginHorizontal: 15,
    marginTop: 20
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  genre: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 30,
    borderWidth: 1,
    marginRight: 5
  },
  fav: {
    width: 70,
    height: 70,
    marginTop: 50,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowRadius: 20,
    shadowOffset: {
      height: 5,
      width: 15
    },
    shadowColor: 'red',
    elevation: 25,
    shadowOpacity: 1,
  },
  image_fav: {
    flex: 1,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    marginVertical: 10,
    marginRight: 15
  },
  score: {
    position: 'absolute',
    top: 340,
    right: 0,
    width: 450,
    height: 90,
    marginTop: 20,
    paddingHorizontal: 20,
    borderTopStartRadius: 50,
    borderBottomLeftRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowRadius: 10,
    shadowOffset: {
      height: 4,
      width: 14
    },
    shadowColor: 'red',
    elevation: 25,
    shadowOpacity: 1
  },
  score_align: {
    flex: 3,
    alignItems: 'center'
  },
  score_bold: {
    fontWeight: 'bold'
  },
  score_gray: {
    color: 'gray'
  },
  info_sup: {
    marginHorizontal: 15,
    marginVertical: 20
  },
  flottinActionBotton: {
    position: "absolute",
    width: 60,
    height: 60,
    right: 20,
    bottom: 20,
    borderRadius: 40,
    backgroundColor: "#107552",
    justifyContent: "center",
    alignItems: "center",
  },
  header_right_botton: {
    marginRight: 7,
  }
})

const mapStateToProps = (state) => {
  return {
    favoriteFilm: state.favoriteFilm
  }
}

export default connect(mapStateToProps)(FilmDetail)
