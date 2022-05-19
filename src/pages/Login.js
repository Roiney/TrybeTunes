import React from 'react';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: false,
    };
  }

  handleClick() {
    createUser({ name });
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
        <form>
          <input
            name="name"
            data-testid="login-name-input"
            type="text"
            placeholder="Digite aqui seu name"
            value={ name }
            onChange={ this.handleNameChange }
          />
          <button
            type="submit"
            disabled={ !enabled }
            data-testid="login-submit-button"
            onClick={ this.chamarFunction }
          >
            Entrar
          </button>
        </form>
      )}
    </div>
  );
}
}

export default Login;
