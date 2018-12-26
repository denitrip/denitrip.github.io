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
        cookieMonsterMaximumClicks: 4
      }
    },
    methods: {
      changePosition(){
        if (!this.showCookieMonster) {
          const left = Math.random() * (this.maxWidth * 0.9) + 0.05 * this.maxWidth;
          const top = 150 + Math.random() * (this.maxHeight * 0.6) + 0.05 * this.maxHeight;
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
      timeForABigCookie() {
        return  Math.floor(Math.random() * (15 - 1)) + 1 === 7
      },
      setDefaults(){
        this.$refs['cookie'].style.top = `${this.maxHeight/2}px`;
        this.$refs['cookie'].style.left = `${this.maxWidth/2}px`;
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
    }
  }
</script>

<style scoped>

  img {
      width: 100px;
    }

  #cookie {
    position: absolute;
  }

</style>
