import { ACTIONS } from './Actions'

const reducers = (state, action) => {
    const { type, payload } = action
    switch(type){
        case ACTIONS.GET_MESSAGES:
            return {
                ...state,
                messages: payload
            }

        case ACTIONS.ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, payload]
                } 

        case ACTIONS.DELETE_MESSAGES:
            return {
                ...state,
                messages: state.messages.filter(msg => msg.id !== payload),
            } 
            
        case ACTIONS.UPDATE_MESSAGE:
            return {
                ...state,
                messages: state.messages.map(msg =>
                    msg.id === payload.id ? { ...msg, subject: payload.subject, body: payload.body } : msg
                )
            }             
        default:
            return state;
    }
}

export default reducers