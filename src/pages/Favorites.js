import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    musics: [],
    isLoading: false,
    idMusicasFavorites: [],
  };

  async componentDidMount() {
    const favoritasMusicas = await getFavoriteSongs();
    console.log(favoritasMusicas);
    this.setState({ musics: [...favoritasMusicas] });
    const mapFavoritasMusicas = favoritasMusicas.map(({ trackId }) => trackId.toString());
    console.log(mapFavoritasMusicas);
    this.setState({ idMusicasFavorites: mapFavoritasMusicas });
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
      this.setState({ isLoading: true }, async () => {
        const idMusicasFavoRemove = idMusicasFavorites
          .filter((idArray) => idArray !== target.id);
        const favorito = await this.handleFavorite(target.name);
        await removeSong(favorito);
        this.setState(({ idMusicasFavorites: idMusicasFavoRemove, isLoading: false }));
      });
    }
  }

  handleFavorite = (identificador) => {
    const { musics } = this.state;
    const selecionado = musics.find((item) => (item.trackName === identificador));
    return selecionado;
  }

  render() {
    const { musics, isLoading, idMusicasFavorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading /> : (
          <div>
            <div className="album-header-3">
              {musics
                .filter((_music, index) => index > 0)
                .map(({ trackName, previewUrl, trackId, collectionName, artistName }) => (
                  <div className="album-header-3" key={ trackId }>
                    <p data-testid="album-name">{collectionName}</p>
                    <p data-testid="artist-name">{artistName}</p>
                    <MusicCard
                      className="album-header-4"
                      key={ trackId }
                      trackName={ trackName }
                      previewUrl={ previewUrl }
                      trackId={ trackId.toString() }
                      apertar={ this.onClick }
                      marcado={ idMusicasFavorites }
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
