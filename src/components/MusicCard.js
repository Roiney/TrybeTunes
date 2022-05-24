import React from 'react';

class MusicCard extends React.Component {
  render() {
    const { music } = this.props;
    return (
      <div>
        <label>
          <input data-testid={ `checkbox-music-${trackId}` } type="checkbox" />
          Favorita
        </label>
      </div>
    );
  }
}

export default MusicCard;
