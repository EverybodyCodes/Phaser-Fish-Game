import * as Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import HudScene from './scenes/HudScene'

declare global {
  interface Window {
    game: Phaser.Game
  }
}

const config: GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: window.innerWidth,
  height: window.innerWidth * 3/4,
  backgroundColor: '#2d2d2d',
  scene: [BootScene, PlayScene, HudScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  }
}

const game = new Phaser.Game(config)
window.game = game
