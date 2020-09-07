<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Header from '@/components/layout/Header.vue'

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {}

</script>

<style lang="scss">
body {
  background: url('./assets/Background.jpg');
  background-size: cover;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: $PRIMARY_COLOR;
  background: white;

  width: 1440px;
  height: 910px;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  /*Solves a problem in which the content is being cut when the div is smaller than its' wrapper:*/
  max-width: 100%;
  max-height: 100%;
  overflow: auto;

  display: flex;
  flex-direction: column;
}

/**
 * Minimal CSS reset
 */
html, body {
  width: 100%;
  min-height: 100%;
  height: 100%;
  padding: 0;
  margin: 0; 
}
*, :after, :before {
  box-sizing: border-box;
  flex-shrink: 0;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
table {
  border-spacing: 0;
  border-collapse: collapse;
}

</style>
