import React, { Component } from 'react'
import { connect } from 'react-redux'
import { upVote, downVote } from '../store/actions/voteAction';
import {Button, Icon, Label} from 'semantic-ui-react'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'

class Voter extends Component {
    constructor(){
        super();
        this.state = {
          disableUpVote: false,
          disableDownVote: false
        }
    }

    handleUpVote = () => {
        const { upVote , id} = this.props
        if(this.state.disableUpVote){
            this.reset() 
            this.setState({disableUpVote:false,}) 
        }else{
            upVote(id)
            this.setState({
                disableUpVote:true,
                disableDownVote: false,
            })
        }
    }

    handleDownVote = () => {
        const {downVote , id} = this.props
        if(this.state.disableDownVote){
            this.reset()
            this.setState({disableDownVote:false})
        }else{
            downVote(id)
            this.setState({
                disableDownVote:true,
                disableUpVote:false
            })
        }
    }

    reset = () => {
        const {count, id} = this.props
        count[id] = 0;
    }
    
    render() {
        const { auth, vote} = this.props
        return (
            <div>
                <Button icon positive={this.state.disableUpVote} disabled={!auth.uid} onClick={() => this.handleUpVote()}> <Icon name="arrow alternate circle up"/></Button>
                <Label as='a' basic>
                {vote}
                </Label>
                <Button icon negative={this.state.disableDownVote} disabled={!auth.uid} onClick={()=>this.handleDownVote()}><Icon name="arrow alternate circle down"/></Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    upVote: (payload) => dispatch(upVote(payload)),
    downVote: (payload) => dispatch(downVote(payload))
  });
  
const mapStateToProps = (state) => {
    //const firestoreCount = state.firestore.data.count
    return {
        count: state.vote.count,
        auth: state.firebase.auth,
        //firestoreCount: firestoreCount
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{collection:'count'}])
)(Voter)
