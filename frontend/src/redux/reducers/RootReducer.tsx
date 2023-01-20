import IReduxState from "../ReduxState";

const initialState: IReduxState = {
    language: false,
    username: "",
    image: "",
    token: "",
    role: -1
};

const RootReducer = (state: IReduxState = initialState, actions: any) => {
    switch (actions.type) {
        case "SWITCH_LANGUAGE":
            let language = state.language;
            language = actions.payload;       
            return {
                ...state, language
            };
        case "LOGIN":
            return {
               ...state,
                username: actions.payload.username,
                token: actions.payload.token,
                role: actions.payload.role,
                image: actions.payload.image,
            };
        case "LOGOUT":
            return {
               ...state,
               username: "",
               token: "",
               role: ""
            }
        default:
            break;
    }

    return state;;
};

export default RootReducer;
