import { createStore , combineReducers} from "redux";
import ticketReducer from "./slices/ticket";
import userReducer from "./slices/user";

const reducers = combineReducers({
 
    user:userReducer,
    ticket:ticketReducer
});

const store = createStore(reducers);

export default store;