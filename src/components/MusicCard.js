import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, apertar } = this.props;
    return (
      <div>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label>
          <input
            type="checkbox"
            name={ trackName }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ apertar }
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
};

MusicCard.defaultProps = {
  trackName: 'nome da faixa',
  previewUrl: 'url da musica',
  trackId: PropTypes.string,
};

export default MusicCard;
