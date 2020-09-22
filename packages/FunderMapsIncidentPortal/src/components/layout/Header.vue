<template>
  <header class="Header">
    <img class="Header__Logo" :src="vendorLogo" alt="Logo" />

    <ProgressBar v-if="steps" :step="step" :steps="steps" />
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import vendor from '@/vendor'
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

  private vendorLogo = vendor.logo

}
</script>

<style lang="scss">
.Header {
  transition: all 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  padding: 20px 80px;
  border-bottom: 1px solid #d4daf0;
  background: white;
  z-index: 999999;

  display: flex;
  align-items: center;
  user-select: none;

  a {
    margin: auto;
    height: 30px;
  }

  @media only screen and (min-width: $BREAKPOINT) {
    position: sticky;
    top: 0;
    height: 115px;

    a {
      margin: 0;
      height: 30px;
    }
  }

  @media only screen and (min-width: $BREAKPOINT) {
    .ProgressBar {
      display: none;
    }
  }
}
</style>