const INITIAL_STATE = {
    users:[]
};

const userReducer =(state=INITIAL_STATE,action)=> {
    const {type, payload} = action
 
    switch(type){
        case 'SET_USER_STATE':
            return{
                ...state,
                ...payload
            }
        default:
            return state;
    }
};
export default userReducer;