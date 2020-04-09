import { LITTLE_FISH_EATEN, PLANKTON_EATEN, PLAYER_DIES, FISH_SHRINKAGE } from "../constants/string-constants"
import { FISH_SHRINKAGE_FACTOR } from "../constants/game-constants"

export const initialGameState = {
    score: 0,
    size: 1
}

export const gameScoreReducer = (state = initialGameState, action: any) => {

    console.log('handling an action...', action)

    switch (action.type) {

        case PLANKTON_EATEN:
            return {
                ...state,
                score: state.score + action.payload.points,
                size: state.size * action.payload.sizeMultiplier
            }

        case LITTLE_FISH_EATEN:

            console.log('little fish action: ', action)

            return {
                ...state,
                score: state.score + action.payload.points,
                size: state.size * action.payload.sizeMultiplier
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
