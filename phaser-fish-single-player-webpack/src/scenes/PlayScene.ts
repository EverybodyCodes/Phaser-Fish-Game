import { Scene } from 'phaser'
import { store } from './../global-state/store'
import { PLAY_SCENE, HUD_SCENE, GAME_OVER_SCENE } from '../constants/string-constants'
import { planktonEaten, shrinkFish, littleFishEaten, playerDies } from '../global-state/game-score.actions'
import { initialGameState } from '../global-state/game-score.reducer'
import { BOOST_DISTANCE, WATER_FRICTION, MOUSE_X_BUFFER, MOUSE_Y_BUFFER, NEW_PLANKTON_SPAWN_RATE, NEW_FISH_SPAWN_RATE, INITIAL_PLANKTONS, PLANKTON_COLORS, INITIAL_ENEMY_FISH } from '../constants/game-constants'

let playerFish: any

let shrinkFrameCounter = 0
let newFishFrameCounter = 0
let newPlanktonFrameCounter = 0

let planktons: any = []

let singlePlankton: any

let enemyFishies: any = []

export default class PlayScene extends Scene {

  bg: any
  gameState: any = initialGameState

  topHorizontalWall: any = undefined
  bottomHorizontalWall: any = undefined
  leftVerticalWall: any = undefined
  rightVerticalWall: any = undefined

  pointer: any
  spacebarListener: any

  boostable = true
  boosting = false

  constructor() {
    super({ key: PLAY_SCENE })
  }

  public create() {

    /**
     * Create background sprites.
     */
    this.bg = this.add.image(0, 0, 'bg-big').setOrigin(0);

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

    playerFish.body.setSize(playerFish.displayWidth / 1.3, playerFish.displayHeight / 1.4);

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

      // modify body
      enemyFish.body.setSize(enemyFish.body.width / 1.5, enemyFish.body.height / 2); // resize the body
      enemyFish.body.setOffset(enemyFish.body.width / 4, enemyFish.body.height / 1.5); // align the new body size
      enemyFishies.push(enemyFish)

      const endPositionX = 25 + Math.random() * (this.bg.width - 25)
      const endPositionY = 25 + Math.random() * (this.bg.height - 25)

      const durationX = 1000 * 5 + Math.random() * 6
      const durationY = 1000 * 5 + Math.random() * 6

      enemyFish.setFlipX(enemyFish.x > endPositionX)

      this.tweens.add({
        targets: enemyFish,
        props: {
          x: { value: endPositionX, duration: durationX, flipX: true },
          y: { value: endPositionY, duration: durationY, },
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
      this.spawnSinglePlankton()
    }

    /**
     *  Spawn planktons over time
     */

    window.setInterval(() => {
      this.spawnSinglePlankton()
    }, NEW_PLANKTON_SPAWN_RATE)


    /**
     *  Setup Mouse and keyboard listeners
     */

    this.input.on('pointermove', (pointer: any) => {
      this.pointer = pointer
    });

    this.spacebarListener = this.input.keyboard.addKey('Space');

    /** 
     *  Setup subscription to redux store.
     */
    store.subscribe(() => {

      this.gameState = store.getState()

    })

    /**
     *  Setup collision handlers.
     */

    const walls = [this.topHorizontalWall, this.leftVerticalWall, this.bottomHorizontalWall, this.rightVerticalWall]
    this.physics.add.collider(walls, playerFish, undefined, undefined, this)

    this.physics.add.overlap(planktons, playerFish, (x, y) => {
      x.destroy()
      store.dispatch(planktonEaten())
    },
      undefined, this)

    this.physics.add.overlap(enemyFishies, playerFish, (x: any, y: any) => {

      if (x.scale < y.scale) {

        store.dispatch(littleFishEaten(x.scale))

        x.destroy()

      } else {

        store.dispatch(playerDies())

        y.destroy()

        this.scene.launch(GAME_OVER_SCENE)

      }

    },
      undefined, this)


    /**
     *  Setup Camera
     */

    // this.cameras.main.setBounds(0, 0, this.bg.width + 100, this.bg.height + 100); // added setBounds to block camera view
    this.cameras.main.startFollow(playerFish)
    this.cameras.main.zoom = 0.5
    // this.cameras.main.setBackgroundColor(0x115DA8)

    /** 
     *  Launch HUD overlay
     */


    if (!this.scene.isActive(HUD_SCENE))
      this.scene.launch(HUD_SCENE)


  }

  update() {

    ++shrinkFrameCounter
    ++newPlanktonFrameCounter
    ++newFishFrameCounter


    /**
     * shrink fish over time
     */
    if (shrinkFrameCounter == 750) {

      store.dispatch(shrinkFish())

      shrinkFrameCounter = 0
    }


    /**
    * Add new fish
    */
    if (newFishFrameCounter === NEW_FISH_SPAWN_RATE) {

      // TODO - add new enemy fish (possibly do it with a setInterval in create function though)

    }


    if (playerFish.body && this.pointer !== undefined) {

      const lockedToCamPointer = this.pointer.positionToCamera(this.cameras.main)


      /**
        *  TODO - Handle "boost" with spacebar (or possibly left click?)
        */

      // if (this.spacebarListener.isDown) {
      //   console.log('pressing space!')

      //   let boostDistance = BOOST_DISTANCE

      //   if (lockedToCamPointer.x <= playerFish.x - MOUSE_X_BUFFER) {
      //     boostDistance *= -1
      //   }

      //   // newPlayerVelocityX += 130 

      //   this.tweens.add({
      //     targets: playerFish,
      //     x: playerFish.x + boostDistance,
      //     duration: 500,
      //     ease: 'Cubic',
      //     yoyo: false,
      //     loop: false,
      //   })
      // }


      /**
       *  Move of player's fish
       */
      let newPlayerVelocityX = playerFish.body.velocity.x - WATER_FRICTION
      let newPlayerVelocityY = playerFish.body.velocity.y - WATER_FRICTION


      if (newPlayerVelocityX < 0)
        newPlayerVelocityX = 0

      if (newPlayerVelocityY < 0)
        newPlayerVelocityY = 0

      /**
       *  Move Player fish horizontally
       */

      if (lockedToCamPointer.x >= playerFish.x + MOUSE_X_BUFFER) {

        playerFish.flipX = false
        newPlayerVelocityX = (lockedToCamPointer.x - playerFish.x) / playerFish.scale

      }

      else if (lockedToCamPointer.x <= playerFish.x - MOUSE_X_BUFFER) {

        newPlayerVelocityX = -1 * Math.abs(lockedToCamPointer.x - playerFish.x) / playerFish.scale
        playerFish.flipX = true

      }

      /**
       *  Move Player fish vertically
       */

      if (lockedToCamPointer.y >= playerFish.y + MOUSE_Y_BUFFER) {

        newPlayerVelocityY = (lockedToCamPointer.y - playerFish.y) / playerFish.scale * 2

      }

      else if (lockedToCamPointer.y <= playerFish.y - MOUSE_Y_BUFFER) {

        newPlayerVelocityY = -1 * Math.abs(lockedToCamPointer.y - playerFish.y) / playerFish.scale * 2

      }

      playerFish.body.setVelocityX(newPlayerVelocityX)
      playerFish.body.setVelocityY(newPlayerVelocityY)


      /**
       *  Update player Fish scale.
       */

      playerFish.scale = this.gameState.size

    }

  }

  spawnSinglePlankton() {

    // console.log('spawning a plankton!')

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

}