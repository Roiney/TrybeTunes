import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    musics: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const reponseMusic = await getMusics(id);
    this.setState({ musics: [...reponseMusic] });
  }

  render() {
    const { musics, idFavoriteMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          musics.filter((_music, index) => index === 0).map(({
            artworkUrl100,
            artistName,
            collectionName,
          }) => (
            <div key="album-header" className="artist-container">
              <img src={ artworkUrl100 } alt="Album art" />
              <p
                className="album-name"
                data-testid="album-name"
              >
                { collectionName }
              </p>
              <p
                className="artist-name"
                data-testid="artist-name"
              >
                { artistName }
              </p>
            </div>
          ))
        }
        <div className="tracks-container">
          {
            musics.filter((_music, index) => index > 0).map(({
              trackName,
              previewUrl,
              trackId,
            }) => (
              <MusicCard
                key={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
                trackId={ trackId.toString() }
                handleChange={ this.handleFavoriteChange }
                favoriteMusics={ idFavoriteMusics }
              />
            ))
          }
        </div>
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
