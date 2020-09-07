<template>
  <div class="Page">
    
    <ProgressSteps v-if="steps" :step="step" :steps="steps"  /> 

    <div class="Page__Main" :class="{ 'Page__Main--sidebar': steps > 0 }">
      <div class="Page__Content">
        <slot />
      </div>

      <Footer>
        <slot name="footer"></slot>
      </Footer>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import ProgressSteps from '@/components/layout/ProgressSteps.vue'
import Footer from '@/components/layout/Footer.vue'

@Component({
  components: {
    ProgressSteps, Footer
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

  &__Main, &__Content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    max-width: 100%;
  }
  &__Main {
    

    &--sidebar {
      border-left: 1px solid #D4DAF0;
      max-width: calc(100% - 80px);
    }
  }
  &__Content {
    padding: 50px 80px;
  }
}
</style>