import { Scene } from 'phaser'
import fish from '../assets/fish.png'
import bgBig from '../assets/ui/undersea-bg-big.png'
import verticalWall from '../assets/ui/vertical-wall.png'
import startBtnDown from '../assets/start-btn-down.png'
import startBtnOver from '../assets/start-btn-over.png'
import gameOverWindow from '../assets/game-over-window.png'
import startWindow from '../assets/start-window.png'
import startBtn from '../assets/start-btn.png'
import playAgainBtn from '../assets/play-again-btn.png'
import horizontalWall from '../assets/ui/horizontal-wall.png'
import plankton from '../assets/plankton-with-face.png'
import { START_SCREEN_SCENE, BOOT_SCENE, PLAY_SCENE } from '../constants/string-constants'

export default class BootScene extends Scene {

  constructor() {
    super({ key: BOOT_SCENE })
  }

  public preload() {

    /**
     *  Background and walls
     */
    this.load.image('bg-big', bgBig)
    this.load.image('vertical-wall', verticalWall)
    this.load.image('horizontal-wall', horizontalWall)


    /**
     * Buttons & Windos
     */
    this.load.image('start-window', startWindow)
    this.load.image('start-btn', startBtn)
    this.load.image('start-btn-over', startBtnOver)
    this.load.image('start-btn-down', startBtnDown)

    this.load.image('game-over-window', gameOverWindow)
    this.load.image('play-again-btn', playAgainBtn)

    /**
     * Plankton
     */
    this.load.image('plankton', plankton)

    /**
     *  Fish
     */
    this.load.spritesheet('fish', fish, { frameWidth: 136, frameHeight: 80 });
  }

  public create() {

    this.scene.start(PLAY_SCENE)

    this.scene.launch(START_SCREEN_SCENE)

  }

}
