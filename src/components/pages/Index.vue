<template>
  <div>
    <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
        <b-row>
          <b-col>
            <label>Name:</label>
            <input class="form-control" v-model="gameData.username" :disabled="true">
          </b-col>
          <b-col>
            <label>Score:</label>
            <input class="form-control" v-model="gameData.score" :disabled="true">
          </b-col>
          <b-col>
            <label>Time left:</label>
            <input class="form-control" v-model="gameData.timeLeft" :disabled="true">
          </b-col>
        </b-row>
      <b-row  class="d-flex justify-content-center margin-top-5">
        <b-col cols="1" v-if="!gameData.isGameActive && !gameData.username" >
          <b-button variant="success" @click="openPlayerNameModal">
            Start
          </b-button>
        </b-col>
        <b-col cols="1" v-if="!gameData.isGameActive && gameData.username" >
          <b-button variant="success" @click="restart">
            Restart
          </b-button>
        </b-col>
        <b-col cols="1" v-if="!gameData.isGameActive && gameData.username" >
          <b-button variant="secondary" @click="openPreviousResultsModal">
            Results
          </b-button>
        </b-col>
      </b-row>
    </b-jumbotron>
    <span v-show="gameData.isGameActive" @click="updateScore">
    <cookie></cookie>
    </span>
    <player-name-modal></player-name-modal>
    <previous-results-modal></previous-results-modal>
  </div>
</template>

<script>

  import Vue from 'vue';
  import {mapGetters} from "vuex";
  import {mapMutations} from "vuex";
  import {mapActions} from "vuex";
  import Cookie from '../common/Cookie.vue'
  import PlayerNameModal from '../modals/PlayerNameModal.vue'
  import PreviousResultsModal from '../modals/PreviousResultsModal.vue'

  export default {
    data() {
      return {
        gameData: {
          username: '',
          timeLeft: 60,
          score: 0,
          isGameActive: false
        },
        previousResults: []
      }
    },
    components: {
      Cookie,
      PlayerNameModal,
      PreviousResultsModal
    },
    methods: {
      updateTime() {
        let timer = setInterval(
          () => {
            if (this.gameData.timeLeft > 0) {
              this.gameData.timeLeft--;
            }
            else {
              clearInterval(timer);
              this.stop();
            }
          }, 1000)
      },
      start() {
        this.gameData.isGameActive = true;
        this.updateTime();
      },
      stop(){
        this.saveScore();
        this.gameData.isGameActive = false;
      },
      restart(){
        this.setDefaults();
        this.start();
      },
      saveScore() {
        this.previousResults.push({username: this.gameData.username, score: this.gameData.score});
      },
      updateScore(){
        if (this.gameData.isGameActive) {
          this.gameData.score++;
        }
      },
      setDefaults(){
        this.gameData.score = 0;
        this.gameData.timeLeft = 60;
      },
      openPlayerNameModal(){
        this.$root.$emit('openPlayerNameModal');
      },
      openPreviousResultsModal(){
        this.$root.$emit('openPreviousResultsModal', this.previousResults);
      }
    },
    computed: {
    },
    mounted() {
      this.openPlayerNameModal();
      this.$root.$on('startTheGame', (userData) => {
        this.gameData.username = userData.username;
        this.start();
      })
    }
  }
</script>

<style scoped>
</style>
