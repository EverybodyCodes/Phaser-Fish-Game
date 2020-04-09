import { Scene } from 'phaser'
import { PLAY_SCENE, START_SCREEN_SCENE } from '../constants/string-constants'

export default class StartScene extends Scene {

  startWindow: any
  startBtn: any

  constructor() {
    super({ key: START_SCREEN_SCENE })
  }

  public preload() { }

  public create() {

    this.scene.pause(PLAY_SCENE)

    const centeredWidth = this.game.scale.width / 2

    const centeredHeight = this.game.scale.height / 2

    this.startWindow = this.add.image(centeredWidth, 300, 'start-window').setOrigin(0.5);

    this.startBtn = this.add.sprite(centeredWidth, centeredHeight + 100, 'start-btn').setOrigin(0.5)

    this.startBtn.setInteractive();

    this.startBtn.on('pointerdown', () => {

      this.scene.stop()
      this.scene.resume(PLAY_SCENE)

    }, this);

  }
}
