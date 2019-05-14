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
    <div class="d-flex justify-content-between toggle-container margin-top-5" @click="showCollapse = !showCollapse"
         v-b-toggle.collapse>
      <h3>
        Rules
      </h3>
      <div class="icons-wrapper">
        <icon name="angle-down" class="angle" v-if="showCollapse"></icon>
        <icon name="angle-right" class="angle" v-else></icon>
      </div>
    </div>
    <b-collapse id="collapse" :visible="showCollapse" class="margin-top-5">
      <b-row v-for="rule in rules" :key="rule.index" class="margin-top-5">
        <b-col cols="1">
          {{rule.index}}.
        </b-col>
        <b-col>
          {{rule.text}}
        </b-col>
      </b-row>
    </b-collapse>
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
        showCollapse: false,
        userData: {
          username: '',
          gameSpeed: '',
          numberOfCookies: null
        },
        gameSpeedOptions: ['fast', 'medium', 'normal'],
        numberOfCookiesOptions: [1, 2, 3, 4, 5],
        rules: [{index: 1, text: 'Try to catch as much cookies as you can.'},
          {index: 2, text: 'Avoid contacting with cookie eater, it will reduce your game score.'},
          {index: 3, text: 'If you see big cookie - you should tap as fast as you can. He will not escape.'}]
      }
    },
    methods: {
      start() {
        if (this.userData.username) {
          this.$refs['GameSettingsModal'].hide();
          this.$root.$emit('startTheGame', this.userData);
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

  .toggle-container {
    background: rgba(0, 0, 0, 0.03);
    cursor: pointer;
    padding-right: 10px;
  }

  .icons-wrapper {
    display: flex;
    align-items: center;

  .angle {
    width: 30px;
    height: 30px;
    margin-left: 10px;
    color: #6f6969;
  }

  }

</style>
