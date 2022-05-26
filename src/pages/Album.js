import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    musics: [],
    isLoading: true,
    favoritoMensagem: false,
  };

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ isLoading: false });
    const respostaDasMusicas = await getMusics(id);
    this.setState({ musics: [...respostaDasMusicas] });
  }

  onClick = async ({ target }) => {
    const favorito = await this.handleFavorite(target.name);
    this.setState({ favoritoMensagem: true });
    const resultado = await addSong(favorito);
    this.setState({ favoritoMensagem: false });
    return resultado;
  }

  handleFavorite = (identificador) => {
    const { musics } = this.state;
    const selecionado = musics.filter((item) => (item.trackName === identificador));
    return selecionado;
  }

  render() {
    const { musics, isLoading, favoritoMensagem } = this.state;
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
            {favoritoMensagem ? <Loading /> : '' }
            :
            {' '}
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
