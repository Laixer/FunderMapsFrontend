<template>
  <Page :step="currentStep" :steps="totalSteps" class="Questions">
    <transition name="slide" mode="out-in" appear>
      <component :is="component" ref="currentQuestionComponent" :busy="busy" @isValid="isValid" />
    </transition>

    <template #footer>
      <Button v-if="currentStep > 1" :ghost="true" @click="handleNavigate(-1)">
        <SvgIcon icon="icon_arrow_previous" />
        <span>Vorige</span>
      </Button>
      <template v-if="!isFinal">
        <Button :disabled="!validated" @click="handleNavigate(1)">
          <span>Volgende</span>
          <SvgIcon icon="icon_arrow_next" />
        </Button>
      </template>
      <template v-else>
        <Button :is-submit="true" :disabled="!validated" @click="handleNavigate(1)">
          <span>Versturen</span>
          <SvgIcon icon="icon_check" />
        </Button>
      </template>
    </template>
  </Page>
</template>

<script lang="ts">
import Page from "@/components/layout/Page.vue";
import { SvgIcon, Button } from "@fundermaps/common";

import { useRouter } from "vue-router";

import ProfileQuestion from "@/components/questions/ProfileQuestion.vue";
import AddressCharacteristicsQuestion from "@/components/questions/AddressCharacteristicsQuestion.vue";
import AddressQuestion from "@/components/questions/AddressQuestion.vue";
import EnvironmentDamageCharacteristicsQuestion from "@/components/questions/EnvironmentDamageCharacteristicsQuestion.vue";
import FoundationDamageCauseQuestion from "@/components/questions/FoundationDamageCauseQuestion.vue";
import FoundationDamageCharacteristicsQuestion from "@/components/questions/FoundationDamageCharacteristicsQuestion.vue";
import FoundationTypeQuestion from "@/components/questions/FoundationTypeQuestion.vue";
import UploadQuestion from "@/components/questions/UploadQuestion.vue";
import NoteQuestion from "@/components/questions/NoteQuestion.vue";
import form from "../store/modules/form";

// import PaymentQuestion from '@/components/questions/PaymentQuestion.vue'
// import useQuestions from "@/components/questions/Question";
// import ResultPage from "@/components/questions/ResultPage.vue";
import { defineComponent, DefineComponent, ref, computed, Ref, watch } from "vue";

export default defineComponent({
  name: "Questions",
  components: {
    Page,
    Button,
    SvgIcon,
    NoteQuestion,
    ProfileQuestion,
    FoundationDamageCauseQuestion,
    AddressCharacteristicsQuestion,
    AddressQuestion,
    EnvironmentDamageCharacteristicsQuestion,
    FoundationDamageCharacteristicsQuestion,
    FoundationTypeQuestion,
    UploadQuestion
  },
  setup(props) {
    // TODO: Typing
    // The question component is a reference to the currently loaded dynamic component,
    // which in turn is loaded based on the question index from the route
    const currentQuestionComponent: Ref<DefineComponent | null> = ref<DefineComponent | null>(null);
    const router = useRouter();

    const questions = [
      "AddressQuestion",
      "FoundationDamageCauseQuestion",
      "FoundationDamageCharacteristicsQuestion",
      "AddressCharacteristicsQuestion",
      "FoundationTypeQuestion",
      "EnvironmentDamageCharacteristicsQuestion",
      "UploadQuestion",
      "NoteQuestion",
      "ProfileQuestion"
    ];

    const validated = computed(() => (currentQuestionComponent.value ? currentQuestionComponent.value.isValid : false));
    const busy = ref<boolean>(false);
    const currentStep = ref<number>(1);

    const totalSteps = computed((): number => questions.length);
    const isFinal = computed((): boolean => currentStep.value === totalSteps.value);

    // const component = computed((): any => (isFinal.value ? finalComponent : questions[currentStep.value]));
    const component = computed((): string => questions[currentStep.value - 1]);

    watch(currentQuestionComponent, (newComponent, oldComponent) => {
      // TODO: Rewrite, this is not type safe
      if (typeof oldComponent?.onSubmit === "function") {
        oldComponent?.onSubmit();
      }
    });

    // // Retrieve validation state of current question component
    // const isValid = (validity: boolean): void => {
    //   valid.value = validity;
    // };

    const handleNavigate = async (direction: number): Promise<void> => {
      if (direction > 0 && !currentQuestionComponent.value?.isValid) {
        return;
      }

      if (typeof currentQuestionComponent.value?.onSubmit === "function") {
        currentQuestionComponent.value?.onSubmit();
      }

      // TODO: Rewrite? Doesn't seem like the right place for this to be but it will do for now
      if (isFinal.value && direction > 0) {
        // TODO: Move to API module
        const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/api/incident-portal/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form.incidentRequestBody) // body data type must match "Content-Type" header
        });

        // Navigate to last page and pass success state
        router.push({
          name: "Finish",
          params: {
            success: response.ok.toString()
          }
        });
      }

      currentStep.value += direction;
    };

    return {
      currentQuestionComponent,
      validated,
      busy,
      currentStep,
      totalSteps,
      isFinal,
      component,
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
