import { Scene } from 'phaser'
import { store } from './../global-state/store'
import { PLAY_SCENE, HUD_SCENE } from '../constants/string-constants'
import { planktonEaten } from '../global-state/game-score.actions'


let playerFish: any

let updateFrame = 0

let pointer: any

let bg: any

let isBoosting = false

let spacebarListener: any

const MOUSE_X_BUFFER = 30
const MOUSE_Y_BUFFER = 13

let gameState: any

let mshape: any

let shrinkFrameCount = 0

let planktons: any = []

let singlePlankton: any

export default class PlayScene extends Scene {

  foo = 42

  constructor() {
    super({ key: PLAY_SCENE })
  }

  public create() {

    bg = this.add.image(0, 0, 'bg').setScale(5).setOrigin(0)

    playerFish = this.physics.add.sprite(
      this.game.scale.width / 2,
      this.game.scale.height / 2,

      // bg.width * 0.1 + bg.width * 0.8 * Math.random(),
      // bg.height * 0.1 + bg.height * 0.8 * Math.random(),
      'fish').setOrigin(0.5)


    // mshape = this.add.graphics();
    // mshape.fillStyle(0xffff00, 1);
    // mshape.fillEllipse(
    //   this.game.scale.width / 2,
    //   this.game.scale.height / 2,
    //   100, 80).setOrigin(0.5)
    // this.physics.add.existing(mshape)


    // const playerFishHitbox = playerFish.physics.add.sprite()

    // var graphics = playerFish.physics.add.graphics(0, 0);
    // graphics.beginFill(0xFF0000);
    // graphics.drawRect(0, 0, 100, 100);


    // let render = this.add.graphics();
    // let bounds = playerFish.getBounds();

    // render.lineStyle(3, 0xffff37);
    // render.strokeRectShape(bounds);

    const singlePlankton = this.physics.add.sprite(
      this.game.scale.width / 2 + Math.random() * 600,
      this.game.scale.height / 2 + Math.random() * 600,
      'plankton')


    for (var i = 0; i < 20; i++) {




      const plankton = this.physics.add.sprite(
        this.game.scale.width / 2 + Math.random() * 3000,
        this.game.scale.height / 2 + Math.random() * 3000,
        'plankton')

      planktons.push(plankton)
    }

    this.cameras.main.startFollow(playerFish)

    pointer = this.input.activePointer
    // positionToCamera(this.cameras.main)
    
    store.subscribe(() => {
      // console.log('state has changed! ', store.getState())
      
      gameState = store.getState()

      // playerFish.scale = 
    })
    
    
    this.physics.add.overlap(singlePlankton, playerFish, (x) => {
      console.log('collision 1!', JSON.stringify(x))
      
      
      singlePlankton.destroy()
      
      // store.dispatch(increment())
      
      store.dispatch(planktonEaten())
      
      playerFish.scale *= 1.08
      
    },
    null,
    this)
    
    
    this.physics.add.overlap(planktons, playerFish, (x, y) => {
      
      console.log('collision x!', JSON.stringify(x))
      console.log('collision y!', JSON.stringify(y))
      
      
      x.destroy()
      
      store.dispatch(planktonEaten())
      
      playerFish.scale *= 1.08
      
    },
    null,
    this)
    
    spacebarListener = this.input.keyboard.addKey('Space');  // Get key object
    
    this.scene.launch(HUD_SCENE)
    
    this.cameras.main.zoom = 0.5
  }
  
  update() {
    
    ++updateFrame
    ++shrinkFrameCount
    
    
    /**
     * shrink fish over time
     */
    if (shrinkFrameCount == 750) {
      
      if (Math.abs(playerFish.scale) > .5) {
        playerFish.scale *= 0.9
      }
      
      shrinkFrameCount = 0
    }


    if (updateFrame === 1) {

      const lockedToCamPointer = pointer.positionToCamera(this.cameras.main)

      /**
       *  Listen for boost
       */
      if (spacebarListener.isDown) {
        console.log('pressing space!')

        let boostDistance = 300

        if (lockedToCamPointer.x <= playerFish.x - MOUSE_X_BUFFER) {
          boostDistance *= -1
        }

        this.tweens.add({
          targets: playerFish,
          x: playerFish.x + boostDistance,
          duration: 500,
          ease: 'Cubic',
          yoyo: false,
          loop: false,
        })
      }

      /**
       *  Movement of player's fish
       */

      playerFish.velocity = 5

      if (lockedToCamPointer.x >= playerFish.x + MOUSE_X_BUFFER) {
        playerFish.flipX = false

        playerFish.x += playerFish.velocity
        // mshape.x += playerFish.velocity
      }

      if (lockedToCamPointer.x <= playerFish.x - MOUSE_X_BUFFER) {

        if (playerFish.x > playerFish.velocity + playerFish.width / 2) {
          playerFish.flipX = true

          playerFish.x -= playerFish.velocity
        }
      }

      if (lockedToCamPointer.y >= playerFish.y + MOUSE_Y_BUFFER) {

        if (playerFish.y < bg.getBounds().height)
          playerFish.y += playerFish.velocity

      }

      if (lockedToCamPointer.y <= playerFish.y - MOUSE_Y_BUFFER) {

        if (playerFish.y > playerFish.velocity + playerFish.height / 2)
          playerFish.y -= playerFish.velocity

      }

      updateFrame = 0
    }

  }


}
