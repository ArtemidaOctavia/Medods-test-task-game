<template>
  <div>
    <div>
      <div @click="doPlayerChoice"
           id="1"
           v-bind:class="{active: this['1'], hover: !blockCircle}"
           class="button red"
      ></div>
      <audio ref="1" src='src/assets/sounds/1.mp3'></audio>
      <div @click="doPlayerChoice"
           id="2"
           v-bind:class="{active: this['2'], hover: !blockCircle}"
           class="button purple"
      ></div>
      <audio ref="2" src='src/assets/sounds/2.mp3'></audio>
      <div @click="doPlayerChoice"
           id="3"
           v-bind:class="{active: this['3'], hover: !blockCircle}"
           class="button blue"
      ></div>
      <audio ref="3" src='src/assets/sounds/3.mp3'></audio>
      <div @click="doPlayerChoice"
           id="4"
           v-bind:class="{active: this['4'], hover: !blockCircle}"
           class="button green"
      ></div>
      <audio ref="4" src='src/assets/sounds/4.mp3'></audio>
    </div>
    <span class='game-over-message' v-if="gameOver">You made a mistake, game over</span>
    <div class="menu">
      <button
        class="start-button menu-option"
        @click="startGame"
        :disabled="blockButtons"
      >
        New game
      </button>
      <div class="difficulty-buttons menu-option">
        <input type="radio"
               v-model="ping"
               value=1500
               :disabled="blockButtons"
        > <label>Easy</label>
        <input type="radio"
               v-model="ping"
               value=1000
               :disabled="blockButtons"
        > <label>Medium</label>
        <input type="radio"
               v-model="ping"
               value=400
               :disabled="blockButtons"
        > <label>Hard</label>
      </div>
      <div class="menu-option">
        <input class
               v-model="muteSound"
               type="checkbox"> Заглушить звук
      </div>
    </div>
    <div class="round-counter">
      <span>Current round</span>
      <span class="current-round">{{line.length}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "game",
    data() {
      return {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        line: [],
        playerInput: [],
        gameOver: false,
        ping: 1000,
        difficulty: 'easy',
        blockButtons: false,
        muteSound: false,
        blockCircle: true
      }
    },
    methods: {

      getNumberInLine() {
        let randomInteger = Math.round(1 - 0.5 + Math.random() * (4 - 1 + 1))
        this.line.push(randomInteger)
      },

      playSound(ref) {
        if (this.muteSound) {
          return
        }
        this.$refs[ref].play()
      },

      startGame() {
        this.blockButtons = true;
        this.gameOver = false
        this.line = []
        this.getNumberInLine()
        this.runChain()
      },

      activateElement(index) {
        this.playSound(index)
        this[`${index}`] = true
      },

      deactivateElement(index) {
        setTimeout(() => {
          this[`${index}`] = false
        }, Number(this.ping))
      },

      highlightElement(index) {
        this.activateElement(index)
        this.deactivateElement(index)
      },

      runChain() {
        this.playerInput = [];
        let i = 0;
        this.blockCircle = true
        let timer = setInterval(() => {
          if (i >= this.line.length) {
            clearInterval(timer)
          } else {
            this.highlightElement(this.line[i])
            i++
          }
        }, Number(this.ping) + 50)
        setTimeout(() => {
          this.blockCircle = false
        }, (this.ping) * this.line.length + this.ping + 100)
      },

      endGame() {
        this.gameOver = true
        this.blockButtons = false;
      },

      doPlayerChoice(event) {
        if (this.blockCircle) {
          return
        }
        this.playSound(event.target.id)
        this.playerInput.push(event.target.id)
        this.playerInput.forEach((integer, index) => {
          if (Number(integer) !== this.line[index] && this.line.length !== 0) {
            this.endGame()
          }
        })
        if (this.playerInput.length === this.line.length && !this.gameOver) {
          this.getNumberInLine()
          this.runChain()
        }
      }
    }
  }
</script>

<style lang="sass">

  .round-counter
    position: absolute
    left: 250px
    top: 50px

  .current-round
    display: block
    font-size: 48px
    margin-top: 10px
    margin-left: 30px

  .game-over-message
    position: absolute
    top: 220px

  .menu
    position: absolute
    width: 300px
    display: flex
    flex-direction: column
    top: 250px

  .menu-option
    margin-bottom: 15px

  .start-button
    border-radius: 15px
    outline: 0

  .button
    width: 200px
    height: 200px
    opacity: 70%

  .hover:hover
    box-shadow: inset 1px 1px 20px -1px
    cursor: pointer

  .hover:active
    opacity: 100%

  .red
    background-color: red
    position: absolute
    border-radius: 100px
    clip-path: inset(0px 100px 100px 0px)

  .purple
    background-color: purple
    position: absolute
    left: 8px
    border-radius: 100px
    clip-path: inset(0px 0px 100px 100px)

  .blue
    background-color: blue
    left: 8px
    position: absolute
    border-radius: 100px
    clip-path: inset(100px 100px 0px 0px)

  .green
    left: 8px
    background-color: green
    position: absolute
    border-radius: 100px
    clip-path: inset(100px 0px 0px 100px)

  .active
    opacity: 100%
    box-shadow: inset 1px 1px 20px -1px
</style>
