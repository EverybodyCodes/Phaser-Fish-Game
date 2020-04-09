import { Scene } from 'phaser'
import { store } from './../global-state/store'
import { HUD_SCENE } from '../constants/string-constants'

export default class HudScene extends Scene {

    constructor() {
        super({ key: HUD_SCENE })
    }

    public preload() { }

    public create() {

        const scoreText = this.add.text(10, 10, 'Score: 0', { fontFamily: '"Roboto Condensed"', fontSize: '35px' })
        const fishSizeText = this.add.text(10, 50, 'Size: 1', { fontFamily: '"Roboto Condensed"', fontSize: '35px' })

        store.subscribe(() => {

            const state = store.getState()

            scoreText.setText(`Score: ${JSON.stringify(state.score)}`)
            fishSizeText.setText(`Size: ${state.size.toFixed(2)}`)

        })

    }

}
