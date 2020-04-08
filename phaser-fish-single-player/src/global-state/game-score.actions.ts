import { PLANKTON_EATEN, LITTLE_FISH_EATEN, PLAYER_DIES, FISH_SHRINKAGE } from "../constants/string-constants"
import { MIN_PLANKTON_VALUE, MAX_PLANKTON_VALUE, POINTS_FROM_LITTLE_FISH_FACTOR, MIN_FISH_VALUE, MAX_FISH_VALUE } from "../constants/game-constants"

export const planktonEaten = () => {

    const pointsRewarded = MIN_PLANKTON_VALUE + Math.floor(Math.random() * (MAX_PLANKTON_VALUE - MIN_PLANKTON_VALUE))

    return {
        type: PLANKTON_EATEN,
        payload: {
            points: pointsRewarded,
            sizeMultiplier: 1 + pointsRewarded / 100 / 3
            
        }
    }
}

export const littleFishEaten = (littleFishSize: integer) => {

    let pointsRewarded = Math.max(
        MAX_FISH_VALUE,
        MIN_FISH_VALUE + Math.floor(1 + Math.random() * littleFishSize)
    )

    console.log('points from eating little fish: ', pointsRewarded)

    return {
        type: LITTLE_FISH_EATEN,
        payload: {
            points: pointsRewarded,
            sizeMultiplier: 1 + pointsRewarded / 100 / 3
        }
    }
    
}

export const playerDies = () => {
    return { type: PLAYER_DIES }
}

export const shrinkFish = () => {
    return { type: FISH_SHRINKAGE }
}

