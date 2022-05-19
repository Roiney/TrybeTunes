import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({
        user,
        isLoading: false,
      });
    });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        { isLoading ? <Loading /> : (
          <p className="user-name-paragraph">
            Olá,
            { '  ' }
            <span data-testid="header-user-name">{ user.name }</span>
          </p>
        )}
      </header>
    );
  }
}

export default Header;
