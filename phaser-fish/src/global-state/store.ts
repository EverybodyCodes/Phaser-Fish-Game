import { createStore } from 'redux'
import { counterReducer } from './counter.reducer'

export const store = createStore(counterReducer)