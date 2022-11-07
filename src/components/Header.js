import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

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
        <div className="header">
          <div className="container">
            <NavLink
              data-testid="link-to-search"
              activeClassName="active"
              to="/search"
            >
              SEARCH
            </NavLink>
          </div>
          <div className="container">
            <NavLink
              data-testid="link-to-favorites"
              activeClassName="active"
              to="/favorites"
            >
              FAVORITES
            </NavLink>
          </div>
          <div className="container">
            <NavLink
              data-testid="link-to-profile"
              activeClassName="active"
              to="/profile"
            >
              PROFILE
            </NavLink>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
