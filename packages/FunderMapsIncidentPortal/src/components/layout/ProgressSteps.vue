<template>
  <aside class="ProgressSteps">
    <div v-if="!isDone" class="ProgressSteps__Indicator" :style="{ top: indicatorOffset }"></div>
    <span class="ProgressSteps__Finished" v-for="index in finishedSteps" :key="`${index}_finished`">
      <SvgIcon icon="icon_circle_check" />
    </span>
    <span v-if="!isDone" class="ProgressSteps__Current">
      <span>{{ step }}</span>
    </span>
    <span
      class="ProgressSteps__Future"
      v-for="(step, index) in futureSteps"
      :key="`${index}_future`"
    >
      <span>{{ step }}</span>
    </span>
  </aside>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SvgIcon from '@/components/common/SvgIcon.vue'

@Component({
  components: {
    SvgIcon
  }
})
export default class ProgressSteps extends Vue {
  /**
   * The progress # (step)
   */
  @Prop({ default: 0, required: true }) readonly step!: number;
  /**
   * The total number of steps
   */
  @Prop({ default: 0, required: true }) readonly steps!: number;


  /**
   * The number of finished steps
   */
  get finishedSteps(): number {
    return Math.max(0, this.step - 1)
  }

  /**
   * The top offset of the step indicator line, in px
   *  Each step takes up 64px. The parent element add 50px due to padding
   */
  get indicatorOffset(): string {
    return `${(this.finishedSteps * 64) + 50}px`
  }

  /**
   * The future steps (numbers)
   */
  get futureSteps(): number[] {
    return this.range((this.steps - Math.min(this.steps, this.step)), this.step + 1)
  }

  /**
   * When the current step is beyond the maximum steps we can take we're done.
   */
  get isDone(): boolean {
    return this.steps < this.step
  }

  /**
   * Generate an array of numbers, with length of size and starting at startAt
   */
  range(size: number, startAt = 0): number[] {
    return [...Array(size).keys()].map(i => i + startAt);
  }
}
</script>


<style lang="scss">
.ProgressSteps {
  position: relative;
  width: 80px;
  height: 100%;
  padding: 50px 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  &__Current,
  &__Finished,
  &__Future {
    width: 24px;
    height: 24px;
    position: relative;
    margin-bottom: 40px;
    text-align: center;
    border-radius: 50%;
    user-select: none;

    &:after {
      content: "";
      position: absolute;
      bottom: -30px;
      left: 11.5px; // 50% of 24px - 1/2 * 1px
      height: 20px;
      width: 1px;
      background: #d4daf0;
    }

    &:last-child {
      margin-bottom: 0;

      &:after {
        display: none;
      }
    }
  }

  &__Current,
  &__Future {
    font-size: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  &__Current {
    background: #00c95d;
    color: white;
  }
  &__Finished {
    fill: #d4daf0;
    font-size: 24px;
    line-height: 24px;
  }
  &__Future {
    color: rgba(119, 128, 141, 0.5);
    border: 2px solid #d4daf0;
  }

  &__Indicator {
    position: absolute;
    left: 0;
    height: 24px;
    width: 2px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    background: #00c95d;
  }
}
</style>