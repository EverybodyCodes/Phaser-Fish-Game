import { Scene } from 'phaser'
import logo from '../assets/logo.png'
import fish from '../assets/fish.png'
import bg from '../assets/ui/undersea-bg.png'
import plankton from '../assets/sprites/plankton.png'

export default class BootScene extends Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  public preload() {
    this.load.image('logo', logo)
    this.load.image('bg', bg)
    this.load.image('plankton', plankton)

    // this.load.image('bg', 'undersea-bg');
    // this.load.spritesheet('fish', 'fish-136x80', { frameWidth: 136, frameHeight: 80 });
    this.load.spritesheet('fish', fish, { frameWidth: 136, frameHeight: 80 });
  }

  public create() {
    this.scene.start('PlayScene')
  }
}
