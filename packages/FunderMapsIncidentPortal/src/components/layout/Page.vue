<template>
  <div class="Page">
    <Header :step="step" :steps="steps" />
    <div class="Page__Wrapper">
      <ProgressSteps v-if="steps" :step="step" :steps="steps" />

      <div class="Page__Main" :class="{ 'Page__Main--sidebar': steps > 0 }">
        <div class="Page__Content">
          <slot />
        </div>

        <Footer>
          <slot name="footer"></slot>
        </Footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import ProgressSteps from '@/components/layout/ProgressSteps.vue'
import ProgressBar from '@/components/layout/ProgressBar.vue'
import Footer from '@/components/layout/Footer.vue'
import Header from '@/components/layout/Header.vue'

@Component({
  components: {
    ProgressSteps, ProgressBar, Footer, Header
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
.Page {
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  flex-direction: column;

  &__Wrapper {
    display: flex;
    flex-grow: 1;
    align-items: stretch;
    flex-direction: column;

    @media only screen and (min-width: $BREAKPOINT) {
      flex-direction: row;
    }
  }

  &__Main,
  &__Content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    max-width: 100%;
  }
  &__Main {
    &--sidebar {
      border-left: 1px solid #d4daf0;

      @media only screen and (min-width: $BREAKPOINT) {
        max-width: calc(100% - 80px);
      }
    }
  }
  &__Content {
    background: #f2f5ff;
  }

  @media only screen and (max-width: $BREAKPOINT) {
    .ProgressSteps {
      display: none;
    }
  }
}
</style>