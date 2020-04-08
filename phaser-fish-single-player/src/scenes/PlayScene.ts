import { Scene } from 'phaser'
import { store } from './../global-state/store'
import { PLAY_SCENE, HUD_SCENE, GAME_OVER_SCENE } from '../constants/string-constants'
import { planktonEaten, shrinkFish, littleFishEaten, playerDies } from '../global-state/game-score.actions'
import { initialGameState } from '../global-state/game-score.reducer'
import { BOOST_DISTANCE, WATER_FRICTION, MOUSE_X_BUFFER, MOUSE_Y_BUFFER, NEW_PLANKTON_SPAWN_RATE, NEW_FISH_SPAWN_RATE, INITIAL_PLANKTONS, PLANKTON_COLORS, INITIAL_ENEMY_FISH } from '../constants/game-constants'
// import * as util from 'util'

let playerFish: any

let fishMovementFrameCounter = 0
let shrinkFrameCounter = 0
let newFishFrameCounter = 0
let newPlanktonFrameCounter = 0

let gameState: any = initialGameState

let planktons: any = []

let singlePlankton: any

let enemyFishies: any = []

export default class PlayScene extends Scene {

  foo = 42

  bg: any

  // outOfBoundsWalls: any = undefined
  topHorizontalWall: any = undefined
  bottomHorizontalWall: any = undefined
  leftVerticalWall: any = undefined
  rightVerticalWall: any = undefined

  pointer: any
  spacebarListener: any

  constructor() {
    super({ key: PLAY_SCENE })
  }

  public create() {

    /**
     * Create background sprites.
     */
    this.bg = this.add.image(0, 0, 'bg-big').setOrigin(0)

    this.topHorizontalWall = this.physics.add.sprite(0, 0, 'horizontal-wall').setOrigin(0)
    this.leftVerticalWall = this.physics.add.sprite(0, 0, 'vertical-wall').setOrigin(0)
    this.rightVerticalWall = this.physics.add.sprite(this.bg.width, 0, 'vertical-wall').setOrigin(0)
    this.bottomHorizontalWall = this.physics.add.sprite(0, this.bg.height, 'horizontal-wall').setOrigin(0)

    this.topHorizontalWall.setImmovable(true)
    this.leftVerticalWall.setImmovable(true)
    this.rightVerticalWall.setImmovable(true)
    this.bottomHorizontalWall.setImmovable(true)


    /**
     *  Create player sprite.
     */
    playerFish = this.physics.add.sprite(
      this.game.scale.width / 2,
      this.game.scale.height / 2,
      'fish', 2).setOrigin(0.5)


    // TODO - setup smaller hitbox area.

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

    /**
     *  Create initial enemy sprites.
     */

    for (var i = 0; i < INITIAL_ENEMY_FISH; i++) {

      const enemyFish = this.physics.add.sprite(
        50 + (this.bg.width - 50) * Math.random(),
        50 + (this.bg.height - 50) * Math.random(),
        'fish'
      ).setOrigin(0.5)
        .setTint(PLANKTON_COLORS[
          Math.floor(Math.random() * PLANKTON_COLORS.length)
        ])
        .setScale(0.2 + Math.random() * 3)
        .setVelocityX(3 + Math.random() * 5)

      enemyFishies.push(enemyFish)

      const endPositionX = 25 + Math.random() * (this.bg.width - 25)
      const endPositionY = 25 + Math.random() * (this.bg.height - 25)

      const durationX = 1000 * 5 + Math.random() * 6
      const durationY = 1000 * 5 + Math.random() * 6

      enemyFish.setFlipX(enemyFish.x > endPositionX )

      this.tweens.add({
        targets: enemyFish,
        props: {
            x: { value: endPositionX, duration: durationX, flipX: true},
            y: { value: endPositionY, duration: durationY,  },
        },
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1
    });

    }


    /**
     *  Create initial planktons.
     */

    for (var i = 0; i < INITIAL_PLANKTONS; i++) {

      const plankton = this.physics.add.sprite(

        50 + (this.bg.width - 50) * Math.random(),
        50 + (this.bg.height - 50) * Math.random(),
        'plankton')
        .setRotation(Math.PI * 2 * Math.random())
        .setTint(PLANKTON_COLORS[
          Math.floor(Math.random() * PLANKTON_COLORS.length)
        ])

      planktons.push(plankton)
    }


    /**
     *  Setup Mouse and keyboard listeners
     */

    this.pointer = this.input.activePointer
    this.spacebarListener = this.input.keyboard.addKey('Space');

    console.log('this pointer? ', this.pointer)

    /** 
     *  Setup subscription to redux store.
     */

    store.subscribe(() => {
      gameState = store.getState()
    })

    /**
     *  Setup collision handlers.
     */

    const walls = [this.topHorizontalWall, this.leftVerticalWall, this.bottomHorizontalWall, this.rightVerticalWall]
    this.physics.add.collider(walls, playerFish, null, null, this)


    this.physics.add.overlap(planktons, playerFish, (x, y) => {
      x.destroy()
      store.dispatch(planktonEaten())
    },
      null, this)

    this.physics.add.overlap(enemyFishies, playerFish, (x: any, y: any) => {

      // if (x.b)

      if (x.scale < y.scale) {

        store.dispatch(littleFishEaten(x.scale))

        x.destroy()

      } else {

        store.dispatch(playerDies())

        y.destroy()

        this.scene.start(GAME_OVER_SCENE)

      }

      // x.destroy()
      // store.dispatch(planktonEaten())
    },
      null, this)


    /**
     *  Setup Camera
     */

    this.cameras.main.startFollow(playerFish)
    this.cameras.main.zoom = 0.5

    /** 
     *  Launch HUD overlay
     */

    this.scene.launch(HUD_SCENE)

  }

  update() {

    ++fishMovementFrameCounter
    ++shrinkFrameCounter
    ++newPlanktonFrameCounter
    ++newFishFrameCounter


    /**
     * shrink fish over time
     */
    if (shrinkFrameCounter == 750) {

      // if (Math.abs(playerFish.scale) > .5) {
      //   playerFish.scale *= 0.9
      // }

      store.dispatch(shrinkFish())

      shrinkFrameCounter = 0
    }

    /**
    * Add new plankton
    */
    if (newPlanktonFrameCounter === NEW_PLANKTON_SPAWN_RATE) {

      // TODO - add new fish

    }


    /**
    * Add new fish
    */
    if (newFishFrameCounter === NEW_FISH_SPAWN_RATE) {

      // TODO - add new plankton

    }

    if (fishMovementFrameCounter === 1 && playerFish.body) {

      const lockedToCamPointer = this.pointer.positionToCamera(this.cameras.main)

      /**
        *  Listen for boost with spacebar
        */
      if (this.spacebarListener.isDown) {
        console.log('pressing space!')

        let boostDistance = BOOST_DISTANCE

        if (lockedToCamPointer.x <= playerFish.x - MOUSE_X_BUFFER) {
          boostDistance *= -1
        }

        // newPlayerVelocityX += 130 

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
       *  Move of player's fish
       */
      let newPlayerVelocityX = playerFish.body.velocity.x - WATER_FRICTION
      let newPlayerVelocityY = playerFish.body.velocity.y - WATER_FRICTION

      if (newPlayerVelocityX < 0)
        newPlayerVelocityX = 0

      if (newPlayerVelocityY < 0)
        newPlayerVelocityY = 0

      if (lockedToCamPointer.x >= playerFish.x + MOUSE_X_BUFFER) {
        playerFish.flipX = false

        newPlayerVelocityX = (lockedToCamPointer.x - playerFish.x) / playerFish.scale

      }

      if (lockedToCamPointer.x <= playerFish.x - MOUSE_X_BUFFER) {

        newPlayerVelocityX = -1 * Math.abs(lockedToCamPointer.x - playerFish.x) / playerFish.scale
        playerFish.flipX = true

      }

      if (lockedToCamPointer.y >= playerFish.y + MOUSE_Y_BUFFER) {

        newPlayerVelocityY = (lockedToCamPointer.y - playerFish.y) / playerFish.scale * 2

      }

      if (lockedToCamPointer.y <= playerFish.y - MOUSE_Y_BUFFER) {

        newPlayerVelocityY = -1 * Math.abs(lockedToCamPointer.y - playerFish.y) / playerFish.scale * 2

      }



      playerFish.body.setVelocityX(newPlayerVelocityX)
      playerFish.body.setVelocityY(newPlayerVelocityY)



      /**
       *  Update player Fish scale.
       */

      playerFish.scale = gameState.size

      fishMovementFrameCounter = 0




    }

  }


}
