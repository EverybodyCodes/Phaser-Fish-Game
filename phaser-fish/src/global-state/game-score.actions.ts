import { PLANKTON_EATEN, LITTLE_FISH_EATEN, PLAYER_DIES, FISH_SHRINKAGE } from "../constants/string-constants"
import { MIN_PLANKTON_VALUE, MAX_PLANKTON_VALUE, POINTS_FROM_LITTLE_FISH_FACTOR } from "../constants/game-constants"

export const planktonEaten = () => {
    return {
        type: PLANKTON_EATEN, 
        payload: {
            points: MIN_PLANKTON_VALUE + Math.floor(Math.random() * (MAX_PLANKTON_VALUE - MIN_PLANKTON_VALUE))
        }
    }
}

export const littleFishEaten = (littleFishSize: integer) => {
    return {
        type: LITTLE_FISH_EATEN, 
        payload: {
            points: Math.floor(littleFishSize * POINTS_FROM_LITTLE_FISH_FACTOR)
        }
    }
}

export const playerDies = () => {
    return { type: PLAYER_DIES}
}

export const shrinkFish = () => {
    return { type: FISH_SHRINKAGE}
}

