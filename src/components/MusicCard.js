import React from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, apertar, marcado } = this.props;
    return (
      <div className="musicCard">
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>

        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            name={ trackName }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ apertar }
            checked={ marcado.some((idFavorita) => idFavorita === trackId) }
            id={ trackId }
          />
          Favorita
        </label>

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
  apertar: PropTypes.func,
  marcado: PropTypes.string,
};

MusicCard.defaultProps = {
  trackName: 'nome da faixa',
  previewUrl: 'url da musica',
  trackId: PropTypes.string,
  apertar: PropTypes.func,
  marcado: PropTypes.string,
};

export default MusicCard;
