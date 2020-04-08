import { Scene } from 'phaser'
import logo from '../assets/logo.png'
import fish from '../assets/fish.png'
import bgBig from '../assets/ui/undersea-bg-big.png'
import verticalWall from '../assets/ui/vertical-wall.png'
import horizontalWall from '../assets/ui/horizontal-wall.png'
import plankton from '../assets/sprites/plankton.png'
import { PLAY_SCENE, GAME_OVER_SCENE } from '../constants/string-constants'

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

    this.scene.remove(PLAY_SCENE);

    window.setTimeout(() => {

        console.log("daraf, ", this.scene)
        this.scene.start(PLAY_SCENE)
    }, 300)
  }
}