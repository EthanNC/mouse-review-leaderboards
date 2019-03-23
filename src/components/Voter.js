import React, { Component } from 'react'
import { connect } from 'react-redux'
import { upVote, downVote } from '../store/actions/voteAction';
import { Button, Icon, Label } from 'semantic-ui-react'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class Voter extends Component {
    constructor(props) {
        super(props);
        const { auth, voterState } = props
        const obj = voterState ? voterState.find(doc => doc.id === auth.uid) : null
        this.state = {
            disableUpVote: obj ? obj.up : null,
            disableDownVote: obj ? obj.down : null,
            test: 'nuetral'
        }
    }

    // componentDidMount(){
    //     const {auth, voterState} = this.props
    //     const obj = voterState ? voterState.find(doc => doc.id === auth.uid) : null
    //     if(obj){
    //         this.setState({
    //             disableUpVote: obj.up,
    //             disableDownVote: obj.down
    //         })
    //     }

    // }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.disableDownVote !== prevState.disableDownVote){
            this.render()
        }
      }

    handleUpVote = () => {
        const { upVote, id } = this.props
        if (this.state.disableUpVote) {
            this.handleDownVote()
            // this.setState({
            //     disableUpVote: false,

            // })
        }
        else {
            upVote(id)
        }
    }


    handleDownVote = () => {
        const { downVote, id } = this.props
        if (this.state.disableDownVote) {
            this.handleUpVote()
            // this.setState({
            //     disableDownVote: false
                
            // })
        }
        else {
            downVote(id)
        }
    }

    render() {
        const { auth, vote } = this.props
        return (
            <div>
                <Button icon positive={this.state.disableUpVote} disabled={!auth.uid} onClick={() => this.handleUpVote()}> <Icon name="arrow alternate circle up" /></Button>
                <Label as='a' basic>
                    {vote}
                </Label>
                <Button icon negative={this.state.disableDownVote} disabled={!auth.uid} onClick={() => this.handleDownVote()}><Icon name="arrow alternate circle down" /></Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    upVote: (payload) => dispatch(upVote(payload)),
    downVote: (payload) => dispatch(downVote(payload))
});

const mapStateToProps = (state, props) => {
    const voterState = state.firestore.ordered.count
        && state.firestore.ordered.count.find(doc => doc.id === props.id.toString())
        && state.firestore.ordered.count.find(doc => doc.id === props.id.toString()).voterState
    return {
        count: state.vote.count,
        auth: state.firebase.auth,
        voterState: voterState
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        {
            collection: 'count',
            doc: props.id.toString(),
            subcollections: [
                { collection: 'voterState' }
            ]
        }
    ])
)(Voter)
