<template>
    <b-modal ref="PlayerNameModal"
      title="Player information"
      ok-only
      ok-variant="success"
      ok-title="Start"
      @ok="start"
    >
    <b-row>
      <b-col cols="2">
        Username:
      </b-col>
      <b-col>
        <input class="form-control" v-model="userData.username" placeholder="Enter your nickname"
               :class="{ required: (!userData.username) }">
      </b-col>
    </b-row>
    </b-modal>
</template>

<script>
  import {
    cleanFilters,
    setNotifyData
  } from '../../helpers/commonHelpers';

  export default {
    components: {
    },
    data() {
      return {
        userData: {
          username: ''
        }
      }
    },
    methods: {
      start() {
        if (this.userData.username){
          this.$root.$emit('startTheGame',this.userData);
        }
        else {
          this.$notify(setNotifyData('Error', 'Please enter your nickname!', 'error'));
        }
      }
    },
    mounted() {
      this.$root.$on('openPlayerNameModal', () => {
        cleanFilters(this.userData);
        this.$refs['PlayerNameModal'].show();
      })
    }
  }
</script>

<style scoped>

</style>
