import React, { Component } from 'react';
import MiceList from './components/MiceList';
import {Container, Button} from 'semantic-ui-react'
import { socialLogin , signOut} from './store/actions/authAction';
import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    socialLogin: () => dispatch(socialLogin()),
    signOut:() => dispatch(signOut())
  }
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth 
  }
}


class App extends Component {
  constructor(props){
    super();
    this.state={
      user : null
    }
  }

  render(){
    const {auth} = this.props
    return (
      <div className="App">
        {!auth.uid && <Button onClick={this.props.socialLogin}  color="google plus" content="Login with Google to Vote" icon="google plus"/>}
        {auth.uid && <Button onClick={this.props.signOut} color="google plus" content="Logout"/>}
        <Container>
          <MiceList/>
        </Container>          
      </div>
    );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
