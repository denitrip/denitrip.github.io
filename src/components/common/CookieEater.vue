<template>
  <div ref="cookieEater" id="cookie" @click="getMinusScore">
    <img src="../../assets/icons/cookieEater.jpg">
  </div>
</template>

<script>

  import Vue from 'vue';

  export default {
    props: ['getMinusScore', 'timeLimit'],
    data() {
      return {
        timeLeft: 0
      }
    },
    methods: {
      updateCookiePosition() {
        const left = 100 + Math.random() * (this.maxWidth - 300);
        const top = 200 + Math.random() * (this.maxHeight - 400);
        this.$el.style.left = `${left}px`;
        this.$el.style.top = `${top}px`;
      },
      moveAfterTimeout() {
        let timer = setInterval(
          () => {
            if (this.timeLeft !== -1) {
              this.updateCookiePosition();
              this.timeLeft--;
            }
            else {
              clearInterval(timer);
            }
          }, 1000)
      },
      setDefaults() {
        this.timeLeft = this.timeLimit;
        this.$refs['cookieEater'].style.top = `${this.maxHeight / 2}px`;
        this.$refs['cookieEater'].style.left = `${this.maxWidth / 2}px`;
        this.moveAfterTimeout();
      },
      stop() {
        this.timeLeft = -1;
      }
    },
    computed: {
      maxWidth() {
        return window.visualViewport.width;
      },
      maxHeight() {
        return window.visualViewport.height;
      }
    },
    mounted() {
      this.setDefaults();
      this.$root.$on('setCookieToDefault', () => {
        if (this.$refs['cookieEater']) {
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
    transition: left 0.25s ease, top 0.25s ease;
  }

</style>
