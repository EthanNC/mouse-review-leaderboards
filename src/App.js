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
          <Container>
            {!auth.uid && <Button onClick={this.props.socialLogin} color="google plus" content="Login with Google to Vote" icon="google plus" style={{ marginTop: '0.5em' }} />}
            {auth.uid && <Button onClick={this.props.signOut} color="google plus" content="Logout" style={{ marginTop: '0.5em' }}/>}
            <Header as="h1" textAlign="center"> <u>/r/MouseReview Leaderboards</u> </Header>
            <Switch>
              <Route exact path='/' component={MiceList}/>
              <Route path='/mice/:index' component={MiceDetails}/>
            </Switch>
            <Header size='tiny' textAlign="right">  <a href="https://www.reddit.com/r/MouseReview/comments/9bwqpp/i_created_a_spreadsheet_with_107_mice_and_their/">Thanks to u/LordOfTheMaggots for the data</a> </Header>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
