import { Scene } from 'phaser'
import logo from '../assets/logo.png'
import fish from '../assets/fish.png'
import bg from '../assets/ui/undersea-bg.png'
import plankton from '../assets/sprites/plankton.png'
import { PLAY_SCENE, BOOT_SCENE } from '../constants/string-constants'

export default class BootScene extends Scene {
  constructor() {
    super({ key: BOOT_SCENE })
  }

  public preload() {

    this.load.image('logo', logo)
    this.load.image('bg', bg)
    this.load.image('plankton', plankton)

    this.load.spritesheet('fish', fish, { frameWidth: 136, frameHeight: 80 });
  }

  public create() {
    this.scene.start(PLAY_SCENE)
  }
}
