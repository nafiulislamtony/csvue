<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <csvue :columns="cols" :data="dataSet">Download CSV</csvue>
  </div>
</template>

<script>
import csvue from './components/csvue.vue'

export default {
  name: 'app',
  components: { csvue },
  data() {
    return {
      cols: [{
        key: 'a',
        title: `Pub eCPM Delievered(\u20ac)`
      }, {
        key: 'b',
        title: 'B'
      }, {
        key: 'c',
        title: 'C'
      }, {
        key: 'x.d',
        title: 'D'
      }],
      dataSet: [
        {'a': 100, 'b': 200, 'c': 300, 'x': { d: 1300 }},
        {'a': 400, 'b': 500, 'c': 600, 'x': { d: 1400 }},
        {'a': 700, 'b': 800, 'c': 900, 'x': { d: 1500 }},
        {'a': 1000, 'b': 1100, 'c': 1200, 'x': { d: 1600 } }
      ]
    };
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
