import { Scene } from 'phaser'

let playerFish: any

let updateFrame = 0

let pointer: any

const MOUSE_X_BUFFER = 30
const MOUSE_Y_BUFFER = 30

export default class PlayScene extends Scene {
  constructor() {
    super({ key: 'PlayScene' })
  }

  public create() {

    const bg = this.add.image(0, 0, 'bg').setOrigin(0)

    pointer = this.input.activePointer

    playerFish = this.add.image(
      this.game.scale.width / 2,
      this.game.scale.height / 2,
      'fish')

    this.cameras.main.startFollow(playerFish)

    // this.tweens.add({
    //   targets: logo,
    //   y: 450,
    //   duration: 2000,
    //   ease: 'Power2',
    //   yoyo: true,
    //   loop: -1,
    // })
  }

  update() {
    console.log('updating...')

    ++updateFrame

    if (updateFrame === 10) {


      // playerFish.scale *= 1.2

      // var pointer = this.scene.input.activePointer;
      // var x = pointer.x;
      // var y = pointer.y;
      // var worldX = pointer.worldX;
      // var worldY = pointer.worldY;

      // console.log('mouse x is: ', pointer.input.activePointer.x)

      // this.cameras.main.setBounds(0,0 bg.)

      console.log('mouseX ', pointer.x)

      if (pointer.x > playerFish.x + MOUSE_X_BUFFER) {
        playerFish.scaleX = 1
        playerFish.x += 5
      }

      if (pointer.x < playerFish.x - MOUSE_X_BUFFER) {
        // playerFish.scale.x = Math.abs(playerFish.scale.x) * -1

        playerFish.scaleX =  -1
        playerFish.x -= 5
      }

      console.log('scaleX ', )


      if (pointer.y > playerFish.y + MOUSE_Y_BUFFER)
        playerFish.y += 5

      if (pointer.y < playerFish.x - MOUSE_Y_BUFFER)
        playerFish.y -= 5




      updateFrame = 0
    }

  }


}
