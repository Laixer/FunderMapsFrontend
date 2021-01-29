<template>
  <Page :step="currentStep" :steps="totalSteps" class="Questions">
    <transition name="slide" mode="out-in" appear>
      <component :is="component" ref="currentQuestionComponent" :busy="busy" @isValid="isValid" />
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
import { SvgIcon } from "@fundermaps/common";

// import ProfileQuestion from "@/components/questions/ProfileQuestion.vue";
// import AddressQuestion from "@/components/questions/AddressQuestion.vue";
// import PaymentQuestion from '@/components/questions/PaymentQuestion.vue'
// import useQuestions from "@/components/questions/Question";
// import ResultPage from "@/components/questions/ResultPage.vue";
import { defineComponent, DefineComponent, ref, computed, Ref } from "vue";

export default defineComponent({
  name: "Questions",
  components: {
    Page,
    Button,
    SvgIcon
    // ProfileQuestion
    // AddressQuestion,
    // ResultPage
  },
  props: {},
  setup() {
    // TODO: Typing
    // The question component is a reference to the currently loaded dynamic component,
    // which in turn is loaded based on the question index from the route
    const currentQuestionComponent: Ref<DefineComponent | null> = ref<DefineComponent | null>(null);
    const questions: { [key: number]: string } = {
      2: "ProfileQuestion"
    };
    // const finalComponent: { extends: DefineComponent } = {
    //   extends: ResultPage,
    //   data() {
    //     return new AnalysisRisk("da");
    //   }
    // };
    const valid = ref<boolean>(false);
    const busy = ref<boolean>(false);
    const currentStep = ref<number>(1);

    const isLastStep = computed((): boolean => false);
    const nextButtonText = computed((): string => (isLastStep.value ? "Vesturen" : "Volgende"));
    const totalSteps = computed((): number => Object.keys(questions).length);
    const isFinal = computed((): boolean => currentStep.value === totalSteps.value);
    // const component = computed((): any => (isFinal.value ? finalComponent : questions[currentStep.value]));
    const component = computed((): string => "ProfileQuestion");

    // Retrieve validation state of current question component
    const isValid = (validity: boolean): void => {
      valid.value = validity;
    };

    const handleNavigate = (direction: number): void => {
      // if (direction > 0 && !currentQuestionComponent.value.isValid) return;
      // if (currentQuestionComponent) {
      //   try {
      //     currentQuestionComponent.storeData();
      //   } catch (e) {
      //     console.error(`Error storing form data: ${e.message}`);
      //   }
      // }

      valid.value = false;
      currentStep.value += direction;
    };

    return {
      currentQuestionComponent,
      questions,
      // finalComponent,
      valid,
      busy,
      currentStep,
      isLastStep,
      nextButtonText,
      totalSteps,
      isFinal,
      component,
      isValid,
      handleNavigate
    };
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
