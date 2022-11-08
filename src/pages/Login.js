import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: false,
    };
  }

handleNameChange = ({ target }) => {
  const { name, value } = target;
  this.setState({ [name]: value });
}

chamarFunction = async () => {
  const { name } = this.state;
  const { history } = this.props;

  this.setState({ isLoading: true });
  await createUser({ name });
  history.push('search');
}

render() {
  const { name, isLoading } = this.state;
  const numerMin = 3;
  const enabled = name.length >= numerMin;
  return (
    <div data-testid="page-login">
      {isLoading ? <Loading /> : (
        <div>
          <h1>TrybeTunes</h1>
          <div className="page-login">
            <h3>Faça seu Login!</h3>
            <form>
              <div className="input">
                <input
                  name="name"
                  data-testid="login-name-input"
                  type="text"
                  placeholder="Digite aqui seu name"
                  value={ name }
                  onChange={ this.handleNameChange }
                />
              </div>
              <div className="botton">
                <button
                  type="submit"
                  disabled={ !enabled }
                  data-testid="login-submit-button"
                  onClick={ this.chamarFunction }
                >
                  Entrar
                </button>
              </div>
              <img alt="login" src="http://www.meupositivo.com.br/doseujeito/wp-content/uploads/2021/03/historia-da-musica0.jpg" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
