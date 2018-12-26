<template>
    <b-modal ref="PreviousResultsModal"
      title="Previous results"
      ok-only
      ok-variant="success"
    >
      <b-row class="d-flex justify-content-end">
        <b-col cols="3">Top score:</b-col>
        <b-col cols="2"><b-badge variant="danger">{{topScore}}</b-badge></b-col>
      </b-row>
      <b-table striped hover :items="results" :fields="fields"></b-table>
    </b-modal>
</template>

<script>
  import {
    cleanFilters
  } from '../../helpers/commonHelpers';

  export default {
    data() {
      return {
        fields: ['username', 'score'],
        results: [],
        topScore: ''
      }
    },
    methods: {
      selectHighestScore() {
        this.topScore = Math.max.apply(Math, this.results.map(e => e.score ));
      }
    },
    mounted() {
      this.$root.$on('openPreviousResultsModal', (previousResults) => {
        this.results = previousResults;
        this.selectHighestScore();
        if (this.$refs['PreviousResultsModal']) {
          this.$refs['PreviousResultsModal'].show();
        }
      })
    }
  }
</script>

<style scoped>

</style>
