import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
    };
  }

handleNameChange = (evt) => {
  this.setState({ nome: evt.target.value });
}

render() {
  const { nome } = this.state;
  const numerMin = 3;
  const enabled = nome.length >= numerMin;
  return (
    <form>
      <input
        data-testid="login-name-input"
        type="text"
        placeholder="Digite aqui seu Nome"
        value={ this.state.nome }
        onChange={ this.handleNameChange }
      />
      <button disabled={ !enabled } data-testid="login-submit-button">Entrar</button>
    </form>
  );
}
}

export default Login;
