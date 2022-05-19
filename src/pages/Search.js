import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artista: '',
    };
  }

  handleNameChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { artista } = this.state;
    const numerMin = 2;
    const enabled = artista.length >= numerMin;
    return (
      <div data-testid="page-search">
        <Header />
        <div data-testid="page-login">
          <form>
            <input
              name="artista"
              data-testid="search-artist-input"
              type="text"
              placeholder="Digite aqui seu name"
              value={ artista }
              onChange={ this.handleNameChange }
            />
            <button
              type="submit"
              disabled={ !enabled }
              data-testid="search-artist-button"
              // onClick={ this.chamarFunction }
            >
              Pequisar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
