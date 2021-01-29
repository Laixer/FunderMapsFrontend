<template>
  <aside class="ProgressSteps">
    <transition name="slide">
      <div v-if="!isDone" class="ProgressSteps__Indicator" :style="{ top: indicatorOffset }"></div>
    </transition>

    <transition-group name="list" tag="ul">
      <li v-for="currentStep in steps" :key="currentStep" :class="getClassFor(step)">
        <template v-if="currentStep < step">
          <span>
            <SvgIcon icon="icon_check" />
          </span>
        </template>
        <template v-else>
          <span>{{ currentStep }}</span>
        </template>
      </li>
    </transition-group>
  </aside>
</template>

<script lang="ts">
import { SvgIcon } from "@fundermaps/common";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProgressSteps",
  components: { SvgIcon },
  props: {
    // The progress # (step)
    step: {
      type: Number,
      required: false,
      default: 0
    },
    // The total number of steps
    steps: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // The number of finished steps
    finishedSteps(): number {
      return Math.max(0, this.step - 1);
    },
    // The top offset of the step indicator line, in px
    // Each step takes up 64px. The parent element add 50px due to padding
    indicatorOffset(): string {
      return `${this.finishedSteps * 64 + 50}px`;
    },
    // The future steps (numbers)
    futureSteps(): number[] {
      return this.range(this.steps - Math.min(this.steps, this.step), this.step + 1);
    },
    // When the current step is beyond the maximum steps we can take we're done.
    isDone(): boolean {
      return this.steps < this.step;
    }
  },
  methods: {
    getClassFor(currentStep: number): string {
      if (currentStep < this.step) {
        return "ProgressSteps__Finished";
      }

      if (currentStep === this.step) {
        return "ProgressSteps__Current";
      }

      return "ProgressSteps__Future";
    },
    // Generate an array of numbers, with length of size and starting at startAt
    range(size: number, startAt = 0): number[] {
      return [...Array(size).keys()].map(i => i + startAt);
    }
  }
});
</script>

<style lang="scss">
.list-enter-active {
  transition: all 1s;
}
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
.ProgressSteps {
  position: relative;
  width: 80px;
  height: 100%;
  padding: 50px 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  ul {
    display: flex;
    flex-direction: column;
  }

  &__Current,
  &__Finished,
  &__Future {
    transition: color 0.3s;
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
  &__Future,
  &__Finished {
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
    span {
      display: flex;
      align-content: center;
      justify-content: center;

      svg {
        width: 1em;
        height: 1em;
      }
    }
    background: $VENDOR_PRIMARY_COLOR;
    color: white;
  }
  &__Future {
    color: rgba(119, 128, 141, 0.5);
    border: 2px solid #d4daf0;
  }

  &__Indicator {
    transition: top 0.3s ease;
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
