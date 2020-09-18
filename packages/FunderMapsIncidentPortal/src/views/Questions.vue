<template>
  <Page :step="this.currentStep" :steps="this.totalSteps" class="Questions">
    <component
      ref="currentQuestionComponent"
      :is="this.questions[this.currentStep]"
      :busy="busy"
      @isValid="isValid"
    />

    <template slot="footer">
      <Button :ghost="true" v-if="this.currentStep > 1" @click="handleNavigate(-1)">
        <SvgIcon icon="icon_arrow_previous" />
        <span>Vorige</span>
      </Button>
      <template v-if="!this.isLastStep">
        <Button :disabled="!this.valid" @click="handleNavigate(1)">
          <span>Volgende</span>
          <SvgIcon icon="icon_arrow_next" />
        </Button>
      </template>
      <template v-else>
        <Button :isSubmit="true" :disabled="!this.valid" @click="handleNavigate(1)">
          <span>Versturen</span>
          <SvgIcon icon="icon_check" />
        </Button>
      </template>
    </template>
  </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Page from '@/components/layout/Page.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

import ProfileQuestion from '@/components/questions/ProfileQuestion.vue'
import UploadQuestion from '@/components/questions/UploadQuestion.vue'
import AddressQuestion from '@/components/questions/AddressQuestion.vue'
import FoundationTypeQuestion from '@/components/questions/FoundationTypeQuestion.vue'
import AddressCharacteristicsQuestion from '@/components/questions/AddressCharacteristicsQuestion.vue'
import FoundationDamageCharacteristicsQuestion from '@/components/questions/FoundationDamageCharacteristicsQuestion.vue'
import EnvironmentDamageCharacteristicsQuestion from '@/components/questions/EnvironmentDamageCharacteristicsQuestion.vue'
import FoundationDamageCauseQuestion from '@/components/questions/FoundationDamageCauseQuestion.vue'
import QuestionMixin from '@/components/questions/Question'

@Component({
  components: {
    Page, Button, SvgIcon,
    AddressQuestion, FoundationTypeQuestion, AddressCharacteristicsQuestion, FoundationDamageCauseQuestion, FoundationDamageCharacteristicsQuestion, EnvironmentDamageCharacteristicsQuestion, ProfileQuestion
  }
})
export default class Questions extends Vue {
  private questions: { [key: number]: typeof QuestionMixin } = {
    1: AddressQuestion,
    2: FoundationDamageCauseQuestion,
    3: FoundationDamageCharacteristicsQuestion,
    4: AddressCharacteristicsQuestion,
    5: FoundationTypeQuestion,
    6: EnvironmentDamageCharacteristicsQuestion,
    7: UploadQuestion,
    8: ProfileQuestion,
  }

  private valid = false

  /**
   * Retrieve validation state of current question component
   */
  private isValid(validity: boolean): void {
    this.valid = validity
  }

  /**
   * Indicates the form is being submitted
   */
  private busy = false

  /**
   * The current step is based on the question number from the route
   */
  get currentStep(): number {
    return parseInt(this.$route.params.question, 10)
  }

  private get nextButtonText() {
    return this.isLastStep ? "Versturen" : "Volgende"
  }


  private get isLastStep(): boolean {
    return this.currentStep === this.totalSteps
  }
  /**
   * The question component is a reference to the currently loaded dynamic component, 
   * which in turn is loaded based on the question index from the route
   */
  private currentQuestionComponent(): QuestionMixin {
    return this.$refs.currentQuestionComponent as QuestionMixin
  }

  get totalSteps(): number {
    return Object.keys(this.questions).length
  }

  /**
   * Handle navigation 
   */
  private async handleNavigate(direction: number): Promise<void> {
    if (direction > 0 && !this.currentQuestionComponent().isValid) return
    if (this.currentQuestionComponent)
      try {
        this.currentQuestionComponent().storeData()
      } catch (e) {
        console.error(`Error storing form data: ${e.message}`)
      }

    if (this.isLastStep && direction > 0) {
      const data = JSON.stringify(this.$store.getters.getIndicentRequestBody)
      const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/api/incident-portal/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data // body data type must match "Content-Type" header
      });

      // Navigate to last page and pass success state
      this.$router.push(
        {
          name: 'Finish',
          params: {
            success: response.ok.toString()
          }
        }
      )


    } else {

      this.valid = false
      this.$router.push(
        {
          name: 'Questions',
          params: {
            question: (this.currentStep + direction).toString()
          }
        }
      )
    }
  }

  // /**
  //  * Store the question data in vuex
  //  */
  // storeData() {
  //   const question = this.currentQuestionComponent

  //   if (question === 'QuestionTwo') {
  //     Object
  //       .entries(this.questionData['QuestionTwo'])
  //       .forEach((entry) => {
  //         this.$store.commit('updateState', {
  //           prop: entry[0],
  //           value: entry[1]
  //         })
  //       })
  //   } else {
  //     this.$store.commit('updateState', {
  //       prop: question,
  //       value: this.questionData[question]
  //     })
  //   }
  // }
}
</script>