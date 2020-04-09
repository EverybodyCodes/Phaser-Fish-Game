import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import { gameScoreReducer } from './game-score.reducer';

export const store = createStore(
    
    /** TODO - add preloaded state from localstorage */

    gameScoreReducer,
    devToolsEnhancer()
    
    /** Add more reducers here */
    
    )