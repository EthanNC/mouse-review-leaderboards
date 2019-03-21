const initailState = {
    authenticated:false
}

export default (state = initailState, action) => {
        switch (action.type) {
            case 'LOGIN':
                return {
                    ...state,
                    authenticated: true
                };
            case 'LOGOUT':
                return {
                    ...state,
                    authenticated:false
                };
     
            default:
                return state;
        }
    };