import { LITTLE_FISH_EATEN, PLANKTON_EATEN, PLAYER_DIES, FISH_SHRINKAGE } from "../constants/string-constants"
import { FISH_SHRINKAGE_FACTOR } from "../constants/game-constants"

const initialGameState = {
    score: 0,
    size: 0
}

export const gameScoreReducer = (state = initialGameState, action: any) => {

    switch (action.type) {

        case PLANKTON_EATEN:
            return {
                ...state,
                score: state.score + action.payload.points,
                size: state.score + action.payload.points
            }

        case LITTLE_FISH_EATEN:
            return {
                ...state,
                score: state.score + action.payload.points,
                size: state.score + action.payload.points
            }

        case FISH_SHRINKAGE:
            return {
                ...state,
                size: state.size * FISH_SHRINKAGE_FACTOR
            }

        case PLAYER_DIES:
            return {
                ...state,
                score: 0,
                size: 0
            }

        default:
            return state

    }
}
