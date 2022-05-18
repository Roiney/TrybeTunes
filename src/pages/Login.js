import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }

handleEmailChange = (evt) => {
  this.setState({ email: evt.target.value });
}

handleSubmit = () => {
  const { email, password } = this.state;
  alert(`Welcome ${email}`);
}

render() {
  const { email, password } = this.state;
  const enabled = email.length > 0;
  return (
    <form onSubmit={ this.handleSubmit }>
      <input
        type="text"
        placeholder="Email"
        value={ this.state.email }
        onChange={ this.handleEmailChange }
      />
      <button disabled={ !enabled }>Login</button>
    </form>
  );
}
}

export default Login;
