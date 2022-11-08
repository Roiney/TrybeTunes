import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import searchAlbums from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      artistName: '',
      isLoading: false,
      albums: [],
      albumEncontrado: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.onAlbumClick = this.onAlbumClick.bind(this);
  }

  handleInputChange({ target }) {
    this.setState({
      inputValue: target.value,
    });
  }

  handleSubmitClick() {
    const { inputValue } = this.state;

    this.setState({
      inputValue: '',
      artistName: inputValue,
      isLoading: true,
    }, () => {
      searchAlbums(inputValue).then((albums) => {
        this.setState({
          albums,
          isLoading: false,
        }, () => {
          if (albums.length === 0) {
            this.setState({ albumEncontrado: false });
          }
        });
      });
    });
  }

  onAlbumClick(albumId) {
    const { history } = this.props;
    history.push(`album/${albumId}`);
  }

  render() {
    const { inputValue, artistName, albums, isLoading, albumEncontrado } = this.state;

    const isValid = inputValue.length > 1;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="search-input-content">
          <input
            data-testid="search-artist-input"
            className="input-area"
            placeholder="Nome do artista"
            id="search"
            name="search"
            type="text"
            value={ inputValue }
            onChange={ this.handleInputChange }
          />
          <button
            data-testid="search-artist-button"
            className="search-button"
            type="submit"
            disabled={ !isValid }
            onClick={ this.handleSubmitClick }
          >
            Pesquisar
          </button>
        </div>

        {isLoading
          ? (<Loading />)
          : (

            <div className="albuns-content">
              {albums.length > 0 && (
                <>
                  <p>
                    Resultado de álbuns de:
                    {' '}
                    {artistName}
                  </p>
                  <div className="album-card-content">
                    {albums.map((album) => (
                      <div
                        className="album-card"
                        key={ album.collectionId }
                      >
                        <img
                          className="album-colletion-img"
                          alt={ album.collectionName }
                          src={ album.artworkUrl100 }
                        />
                        <p className="album-colletion-name">{album.collectionName}</p>
                        <p className="album-colletion-name">{album.artistName}</p>

                        <button
                          data-testid={ `link-to-album-${album.collectionId}` }
                          className="album-button"
                          type="submit"
                          onClick={ () => this.onAlbumClick(album.collectionId) }
                        >
                          Ir para o album
                        </button>
                      </div>

                    )) }
                  </div>
                </>
              )}
              <div>
                {albumEncontrado ? null : <p>Nenhum álbum foi encontrado</p>}
              </div>
            </div>
          )}

      </div>);
  }
}

Search.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Search;
