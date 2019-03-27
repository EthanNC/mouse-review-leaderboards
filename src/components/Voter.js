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
        }
    }
    
    handleUpVote = () => {
        const { upVote, downVote, id } = this.props
        if (this.state.disableUpVote) {
            downVote(id)
        }
        else {
            upVote(id)
        }
    }

    render() {
        const { auth, vote } = this.props
        return (
            <div>
                <Button icon positive={this.state.disableUpVote} disabled={!auth.uid || this.state.disableUpVote} onClick={() => this.handleUpVote()}> <Icon name="arrow alternate circle up" /> Vote </Button>
                <Label as='a' basic>
                    {vote}
                </Label>
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
