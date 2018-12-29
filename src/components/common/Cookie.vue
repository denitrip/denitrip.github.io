<template>
    <div ref="cookie" id="cookie" @click="changePosition">
      <img v-if="!showCookieMonster"  src="../../assets/icons/cookie.png">
      <img v-if="showCookieMonster" src="../../assets/icons/cookieMonster.png">
    </div>
</template>

<script>

  import Vue from 'vue';

  export default {
    props: ['gameStatus'],
    data() {
      return {
        showCookieMonster: false,
        cookieMonsterClickCounter: 0,
        cookieMonsterMaximumClicks: 4,
        timeFromTheLastClick: 3
      }
    },
    methods: {
      changePosition(){
        if (!this.showCookieMonster) {
          this.timeFromTheLastClick = 3;
          const left = 100 + Math.random() * (this.maxWidth - 300);
          const top = 200 + Math.random() * (this.maxHeight - 400);
          this.$el.style.left = `${left}px`;
          this.$el.style.top = `${top}px`;
          if (this.timeForABigCookie()) {
            this.showCookieMonster = true;
          }
          else {
            this.showCookieMonster = false;
          }
        }
        else if (this.cookieMonsterClickCounter === this.cookieMonsterMaximumClicks) {
          this.cookieMonsterClickCounter = 0;
          this.showCookieMonster = false;
        }
        else {this.cookieMonsterClickCounter++}
      },
      moveAfterTimeout() {
        let timer = setInterval(
          () => {
            if (this.timeFromTheLastClick === 0) {
              this.changePosition();
            }
            else if (this.timeFromTheLastClick === -1) {
              clearInterval(timer);
            }
            else {
              this.timeFromTheLastClick--;
            }
          }, 1000)
      },
      timeForABigCookie() {
        return  Math.floor(Math.random() * (15 - 1)) + 1 === 7
      },
      setDefaults(){
        this.showCookieMonster = false;
        this.timeFromTheLastClick = 3;
        this.moveAfterTimeout();
        this.$refs['cookie'].style.top = `${this.maxHeight/2}px`;
        this.$refs['cookie'].style.left = `${this.maxWidth/2}px`;
      },
      stop() {
        this.timeFromTheLastClick = -1;
      }
    },
    computed: {
      maxWidth(){
        return window.screen.availWidth;
      },
      maxHeight(){
        return window.screen.availHeight;
      }
    },
    mounted(){
      this.setDefaults();
      this.$root.$on('setCookieToDefault', () => {
        if (this.$refs['cookie']) {
          this.setDefaults();
        }
      });
      this.$root.$on('stopTheGame', () => {
        this.stop();
      })
    }
  }
</script>

<style scoped>

  img {
      width: 100px;
    }

  #cookie {
    position: absolute;
    top: 10px;
    left: 10px;
    transition: left 0.25s ease,  top 0.25s ease;
  }

</style>
