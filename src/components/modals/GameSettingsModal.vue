<template>
  <b-modal ref="GameSettingsModal"
           title="Player information"
  >
    <b-row>
      <b-col cols="3">
        Username:
      </b-col>
      <b-col>
        <input class="form-control" v-model="userData.username" placeholder="Enter your nickname" @keyup.enter="start"
               :class="{ required: (!userData.username) }">
      </b-col>
    </b-row>
    <b-row class="margin-top-5">
      <b-col cols="3">
        Game speed:
      </b-col>
      <b-col>
        <multiselect v-model="userData.gameSpeed" :max-height="200"
                     placeholder="Choose game speed" :options="gameSpeedOptions"
                     :show-labels="false" :allow-empty="false"
                     :taggable="true" :close-on-select="true"></multiselect>
      </b-col>
    </b-row>
    <b-row class="margin-top-5">
      <b-col cols="3">
        Number of cookies:
      </b-col>
      <b-col>
        <multiselect v-model="userData.numberOfCookies" :max-height="200"
                     placeholder="Choose number of cookies" :options="numberOfCookiesOptions"
                     :show-labels="false" :allow-empty="false"
                     :taggable="true" :close-on-select="true"></multiselect>
      </b-col>
    </b-row>
    <div slot="modal-footer">
      <b-button variant="success" @click="start">Start</b-button>
    </div>
  </b-modal>
</template>

<script>
  import {
    cleanFilters,
    setNotifyData
  } from '../../helpers/commonHelpers';
  import Multiselect from 'vue-multiselect';

  export default {
    components: {
      Multiselect
    },
    data() {
      return {
        userData: {
          username: '',
          gameSpeed: '',
          numberOfCookies: null
        },
        gameSpeedOptions: ['fast', 'medium', 'normal'],
        numberOfCookiesOptions: [1,2,3,4,5]
      }
    },
    methods: {
      start() {
        console.log(this.userData);
        if (this.userData.username){
          this.$refs['GameSettingsModal'].hide();
          this.$root.$emit('startTheGame',this.userData);
        }
        else {
          this.$notify(setNotifyData('Error', 'Please enter your nickname!', 'error'));
        }
      },
      setDefaults() {
        this.userData.gameSpeed = 'normal';
        this.userData.numberOfCookies = 1;
      }
    },
    mounted() {
      this.$root.$on('openGameSettingsModal', () => {
        cleanFilters(this.userData);
        this.setDefaults();
        this.$refs['GameSettingsModal'].show();
      })
    }
  }
</script>

<style scoped>

</style>
