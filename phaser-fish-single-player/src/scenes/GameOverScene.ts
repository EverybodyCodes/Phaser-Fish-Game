import { Scene } from 'phaser'
import logo from '../assets/logo.png'
import fish from '../assets/fish.png'
import bgBig from '../assets/ui/undersea-bg-big.png'
import verticalWall from '../assets/ui/vertical-wall.png'
import horizontalWall from '../assets/ui/horizontal-wall.png'
import plankton from '../assets/sprites/plankton.png'
import { PLAY_SCENE, GAME_OVER_SCENE, HUD_SCENE } from '../constants/string-constants'
import PlayScene from './PlayScene'
import HudScene from './HudScene'

export default class GaveOverScene extends Scene {
  constructor() {
    super({ key: GAME_OVER_SCENE })
  }

  public preload() {

    // this.load.image('logo', logo)
    // // this.load.image('bg', bg)
    // this.load.image('bg-big', bgBig)
    // // this.load.image('out-of-bounds-walls', outOfBoundsWalls)
    // // this.load.image('out-of-bounds-walls', outOfBoundsWalls)
    // this.load.image('vertical-wall', verticalWall)
    // this.load.image('horizontal-wall', horizontalWall)
    // this.load.image('plankton', plankton)

    // this.load.spritesheet('fish', fish, { frameWidth: 136, frameHeight: 80 });

    console.log('game over!')

  }

  public create() {

    this.scene.stop(PLAY_SCENE)

    // this.scene.stop(HUD_SCENE)

    window.setTimeout(() => {

      // this.game.add(PLAY_SCENE, PlayScene)
      
      // this.scene.add(HUD_SCENE, HudScene, false)

      // this.scene.add(PLAY_SCENE, PlayScene, true)
      this.scene.start(PLAY_SCENE)

    }, 3000)
  }
}
