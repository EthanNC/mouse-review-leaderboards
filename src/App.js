import React, { Component } from 'react';
import MiceList from './components/MiceList';
import { Container, Button, Header } from 'semantic-ui-react'
import { socialLogin, signOut } from './store/actions/authAction';
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MiceDetails from './components/MiceDetail'

const mapDispatchToProps = dispatch => {
  return {
    socialLogin: () => dispatch(socialLogin()),
    signOut: () => dispatch(signOut())
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}


class App extends Component {
  constructor(props) {
    super();
    this.state = {
      user: null
    }
  }

  render() {
    const { auth } = this.props
    return (
      <BrowserRouter>
        <div className="App">
          {!auth.uid && <Button onClick={this.props.socialLogin} color="google plus" content="Login with Google to Vote" icon="google plus" />}
          {auth.uid && <Button onClick={this.props.signOut} color="google plus" content="Logout" />}
          <Header as="h1" content="Mouse Review Leaderboards" textAlign="center"/>
          <Container>
            <Switch>
              <Route exact path='/' component={MiceList}/>
              <Route path='/mice/:index' component={MiceDetails}/>
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
