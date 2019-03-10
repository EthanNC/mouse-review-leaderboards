import React, { Component } from 'react'
import { connect } from 'react-redux'
import { upVote, downVote } from '../store/actions/voteAction';

class Voter extends Component {
    render() {
        const { count, upVote, downVote, id} = this.props
        return (
            <div>
                <button onClick={() => upVote(id)}>+</button>
                The count is {count[id]}
                <button onClick={() => downVote(id)}>-</button>
            </div>
        )
    }
}

// const actions = {
//     upVote,
//     downVote

// }
const mapDispatchToProps = dispatch => ({
    upVote: (payload) => dispatch(upVote(payload)),
    downVote: (payload) => dispatch(downVote(payload))
  });
  
const mapStateToProps = (state) => ({
    count: state.vote.count

})
export default connect(mapStateToProps, mapDispatchToProps)(Voter);
