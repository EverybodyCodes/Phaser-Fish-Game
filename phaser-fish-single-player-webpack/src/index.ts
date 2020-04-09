import * as Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import PlayScene from './scenes/PlayScene'
import HudScene from './scenes/HudScene'
import GameOverScene from './scenes/GameOverScene'
import StartScene from './scenes/StartScene'


declare global {
  interface Window {
    game: Phaser.Game
  }
}

const gameWith = Math.min(window.innerWidth, 800)

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: gameWith,
  height: gameWith * 3/4,
  backgroundColor: '#115DA8',
  scene: [BootScene, PlayScene, StartScene, HudScene, GameOverScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}

const game = new Phaser.Game(config)
window.game = game
