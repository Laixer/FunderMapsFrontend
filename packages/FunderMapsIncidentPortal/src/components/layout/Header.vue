<template>
  <header class="Header">

    <router-link :to="{ name: 'Home' }">
      <img class="Header__Logo" src="../../assets/logo.png" />
    </router-link>

    <ProgressBar v-if="steps" :step="step" :steps="steps"  /> 
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import ProgressBar from '@/components/layout/ProgressBar.vue'

@Component({
  components: {
    ProgressBar
  }
})
export default class Page extends Vue {
  /**
   * The progress # (step)
   */
  @Prop({ default: 0 }) readonly step!: number;
  /**
   * The total number of steps
   */
  @Prop({ default: 0 }) readonly steps!: number;

}
</script>

<style lang="scss">
.Header {
  position: sticky;
  top: 0;
  left: 0;
  height: 98px;
  width: 100%;
  padding: 20px 80px;
  border-bottom: 1px solid #D4DAF0;
  background: white;
  z-index: 999999;

  display: flex;
  align-items: center;
  
  user-select: none;

  @media only screen and (min-width: $BREAKPOINT) {
    position: relative;
    height: 115px;
  }

  @media only screen and (min-width: $BREAKPOINT) {
    .ProgressBar {
      display: none;
    }
  }
}
</style>