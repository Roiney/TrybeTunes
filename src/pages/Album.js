import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import './Album.css';

class Album extends React.Component {
  state = {
    musics: [],
    isLoading: true,
    idMusicasFavorites: [],
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const favoritasMusicas = await getFavoriteSongs();
    console.log('favoritasMusicas', favoritasMusicas);
    const mapFavoritasMusicas = favoritasMusicas.map(({ trackId }) => trackId.toString());
    console.log(mapFavoritasMusicas);
    this.setState({ isLoading: false, idMusicasFavorites: mapFavoritasMusicas });
    const respostaDasMusicas = await getMusics(id);
    this.setState({ musics: [...respostaDasMusicas] });
    // this.handleDownload();
  }

  onClick = async ({ target }) => {
    // this.setState({ isLoading: true });
    const { idMusicasFavorites } = this.state;
    if (target.checked) {
      // await addSong(favorito);
      this.setState((prevstate) => ({
        idMusicasFavorites: [...prevstate.idMusicasFavorites, target.id] }));
      // isLoading: false }), () => console.log('if', idMusicasFavorites));
      this.setState({ isLoading: true }, async () => {
        const favorito = await this.handleFavorite(target.name);
        await addSong(favorito);
        this.setState({ isLoading: false });
      });
    } else {
      const idMusicasFavoRemove = idMusicasFavorites
        .filter((idArray) => idArray !== target.id);
      await addSong(favorito);
      this.setState(({ idMusicasFavorites: idMusicasFavoRemove, isLoading: false }));
    }
  }

  handleFavorite = (identificador) => {
    const { musics } = this.state;
    const selecionado = musics.find((item) => (item.trackName === identificador));
    return selecionado;
  }

  // handleDownload = async () => {
  //   const atualizar = await getFavoriteSongs();
  //   return atualizar;
  // }

  render() {
    const { musics, isLoading, idMusicasFavorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading ? <Loading /> : (
          <div>
            {musics
              .filter((_music, index) => index === 0)
              .map(({ artworkUrl100, artistName, collectionName }) => (
                <div key="album-header">
                  <img src={ artworkUrl100 } alt="Album art" />
                  <p data-testid="album-name">{collectionName}</p>
                  <p data-testid="artist-name">{artistName}</p>
                </div>
              ))}
            <div>
              {musics
                .filter((_music, index) => index > 0)
                .map(({ trackName, previewUrl, trackId }) => (
                  <MusicCard
                    key={ trackId }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    trackId={ trackId.toString() }
                    apertar={ this.onClick }
                    marcado={ idMusicasFavorites }
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default Album;
