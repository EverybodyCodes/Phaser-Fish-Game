import { Scene } from 'phaser'
import { PLAY_SCENE, GAME_OVER_SCENE } from '../constants/string-constants'
import { store } from './../global-state/store'

export default class GaveOverScene extends Scene {

  playAgainWindow: any
  playAgainBtn: any

  constructor() {
    super({ key: GAME_OVER_SCENE })
  }

  public preload() { }

  public create() {

    this.scene.pause(PLAY_SCENE)

    const centeredWidth = this.game.scale.width / 2

    const centeredHeight = this.game.scale.height / 2

    this.playAgainWindow = this.add.image(centeredWidth, centeredHeight, 'game-over-window').setOrigin(0.5);

    this.playAgainBtn = this.add.sprite(centeredWidth, centeredHeight + 120, 'play-again-btn').setOrigin(0.5)

    this.playAgainBtn.setInteractive();

    this.playAgainBtn.on('pointerdown', () => {

      this.scene.stop()
      this.scene.start(PLAY_SCENE)

    }, this);

    const state = store.getState()

    const scoreLabel = this.add.text(
      centeredWidth - 6,
      310,
      'Score:',
      { fontFamily: '"Roboto Condensed"', fontSize: '30px', textAlign: 'left' })
      .setOrigin(0.5)

    const scoreValue = this.add.text(
      centeredWidth + 44,
      310,
      `${JSON.stringify(state.previousGameScore)}`,
      { fontFamily: '"Roboto Condensed"', fontSize: '30px', textAlign: 'left' })
      .setOrigin(0, 0.5)

    const highScoreLabel = this.add.text(
      centeredWidth - 39,
      350,
      'High Score:',
      { fontFamily: '"Roboto Condensed"', fontSize: '30px' })
      .setOrigin(0.5)

    const highScoreValue = this.add.text(
      centeredWidth + 44,
      350,
      `${state.highestScore}`,
      { fontFamily: '"Roboto Condensed"', fontSize: '30px' })
      .setOrigin(0, 0.5)

  }
}
