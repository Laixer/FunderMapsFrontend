<template>
  <Page :step="currentStep" :steps="totalSteps" class="Questions">
    <transition name="slide" mode="out-in" appear>
      <component :is="getComponent" ref="currentQuestionComponent" :busy="busy" @isValid="isValid" />
    </transition>

    <template #footer>
      <Button v-if="currentStep > 1 && !isFinal" :ghost="true" @click="handleNavigate(-1)">
        <SvgIcon icon="icon_arrow_previous" />
        <span>Vorige</span>
      </Button>
      <template v-if="!isLastStep && !isFinal">
        <Button :disabled="!valid" @click="handleNavigate(1)">
          <span>Volgende</span>
          <SvgIcon icon="icon_arrow_next" />
        </Button>
      </template>
      <template v-else-if="!isFinal">
        <Button :is-submit="true" :disabled="!valid" @click="handleNavigate(1)">
          <span>Bekijk funderingsrisico</span>
          <SvgIcon icon="icon_check" />
        </Button>
      </template>
      <template v-else>
        <span>
          <a id="changeLabel" href="https://www.kcaf.nl/funderingslabel/" target="_blank">
            Label wijzigen?
          </a>
        </span>
      </template>
    </template>
  </Page>
</template>

<script lang="ts">
import Page from "@/components/layout/Page.vue";
import Button from "@/components/Button.vue";
import SvgIcon from "@/components/common/SvgIcon.vue";

import ProfileQuestion from "@/components/questions/ProfileQuestion.vue";
// import AddressQuestion from "@/components/questions/AddressQuestion.vue";
// import PaymentQuestion from '@/components/questions/PaymentQuestion.vue'
import QuestionMixin from "@/components/questions/Question.vue";
import ResultPage from "@/components/questions/ResultPage.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Questions",
  components: {
    Page,
    Button,
    SvgIcon,
    ProfileQuestion,
    // AddressQuestion,
    QuestionMixin,
    ResultPage
  },
  props: {},
  setup() {
    // TODO: Typing
    // The question component is a reference to the currently loaded dynamic component,
    // which in turn is loaded based on the question index from the route
    const currentQuestionComponent: any = ref(null);

    return { currentQuestionComponent };
  },
  data() {
    return {
      questions: {
        // 1: AddressQuestion,
        2: ProfileQuestion
        // 3: PaymentQuestion,
      } as { [key: number]: typeof QuestionMixin },
      finalComponent: ResultPage,
      valid: false,
      // Indicates the form is being submitted
      busy: false,
      currentStep: 1
    };
  },
  computed: {
    nextButtonText(): string {
      return this.isLastStep ? "Versturen" : "Volgende";
    },
    isLastStep(): boolean {
      return this.currentStep === this.totalSteps;
    },
    isFinal(): boolean {
      return this.currentStep === this.totalSteps + 1;
    },
    totalSteps(): number {
      return Object.keys(this.questions).length;
    },
    component(): any {
      if (this.isFinal) {
        return this.finalComponent;
      }
      return this.questions[this.currentStep];
    }
  },
  methods: {
    // Retrieve validation state of current question component
    isValid(validity: boolean): void {
      this.valid = validity;
    },
    // Handle navigation
    async handleNavigate(direction: number): Promise<void> {
      if (direction > 0 && !this.currentQuestionComponent().isValid) return;
      if (this.currentQuestionComponent) {
        try {
          this.currentQuestionComponent().storeData();
        } catch (e) {
          console.error(`Error storing form data: ${e.message}`);
        }
      }

      this.valid = false;
      this.currentStep += direction;
    }
  }
});
</script>

<style lang="scss">
#changeLabel {
  display: flex;
  align-items: center;
  color: #606976;
}
.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter {
  transform: translateX(-10px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
