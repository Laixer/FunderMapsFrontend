<template>
  <div class="ProgressBar">
    <div class="Progress" :style="{ width: progress }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProgressBar",
  components: {},
  props: {
    // The progress # (step)
    step: {
      type: Number,
      default: 0
    },
    // The total number of steps
    steps: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // The progress in %, with a max of 100%
    progress(): string {
      return `${Math.min(100, (this.step / this.steps) * 100)}%`;
    }
  }
});
</script>

<style lang="scss">
.ProgressBar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: #d4daf0;
  z-index: 99999;

  @media only screen and (min-width: $BREAKPOINT) {
    position: relative;
  }

  .Progress {
    transition: width 0.3s;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #00c95d;
  }
}
</style>
