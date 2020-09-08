<template>
  <Page :step="step" :steps="8" class="Questions">
    
    <component v-bind:is="currentQuestionComponent" :busy="busy" v-model="fieldData" @validity="handleValidity"></component>

    <template slot="footer">
      <Button :ghost="true" @click="handleNavigateBack">
        <SvgIcon icon="icon_arrow_previous" />
        <span>Vorige</span>
      </Button>      
      <Button :disabled="!valid"  @click="handleNavigate">
        <span>Volgende</span>
        <SvgIcon icon="icon_arrow_next" />
      </Button>
    </template>
  
  </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Page from '@/components/layout/Page.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

import QuestionOne from '@/components/questions/QuestionOne.vue'
import QuestionTwo from '@/components/questions/QuestionTwo.vue'
import QuestionThree from '@/components/questions/QuestionThree.vue'
import QuestionFour from '@/components/questions/QuestionFour.vue'
import QuestionFive from '@/components/questions/QuestionFive.vue'

@Component({
  components: {
    Page, Button, SvgIcon,
    QuestionOne, QuestionTwo, QuestionThree, QuestionFour, QuestionFive
  }
})
export default class Questions extends Vue {

  
  /**
   * Whether all inputs are valid
   */
  private valid = false

  /**
   * Indicates the form is being submitted
   */
  private busy = false

  /**
   * The data for all questions
   */
  // private questionData !: Record<string,string|Array<string>>
  private questionData: Record<string,string|Array<string>|Record<string, string>> = {
    'QuestionOne': '',
    'QuestionTwo': {
      'vrijstaand': '',
      'eigendom': '',
      'buren': ''
    },
    'QuestionThree': '',
    'QuestionFour': [],
    'QuestionFive': [],
  }

  /**
   * The current step is based on the question number from the route
   */
  get step(): number {
    return 1 + parseInt(this.$route.params.question, 10)
  }

  /**
   * The question component is loaded based on the question number from the route
   */
  get currentQuestionComponent(): string {
    switch(this.step) {
      case 2:
        return 'QuestionOne'
      case 3: 
        return 'QuestionTwo'
      case 4:
        return 'QuestionThree'
      case 5:
        return 'QuestionFour'
      case 6: 
        return 'QuestionFive'
    }

    return 'QuestionOne'
  } 

  /**
   * The v-model connection between question data & question components
   */
  get fieldData(): string|Array<string>|Record<string, string> {
    return this.questionData[this.currentQuestionComponent]
  }
  set fieldData(value: string|Array<string>|Record<string, string>) {
    this.questionData[this.currentQuestionComponent] = value
  }

  /**
   * Register changes in the form validity
   */
  handleValidity(valid: boolean) {
    this.valid = valid
  }

  /**
   * Handle navigation forward
   */
  handleNavigate() {
    if (! this.valid || !this.busy) return

    // TODO: Busy animation in button?
    this.busy = true;

    // TODO: Replace with API call...
    setTimeout(() => {
      this.busy = false

      const to = this.step === 6 
        ? { name: 'Upload' } 
        : { name: 'Questions',
            params: {
              question: '' + this.step
            }
          }

      this.$router.push(to)
    }, 600)
  
  }

  /**
   * Handle navigation backward
   */
  handleNavigateBack() {
    if (this.busy) return

    const to = this.step === 2 
      ? { name: 'Address' }
      : { name: 'Questions',
          params: {
            question: '' + (this.step - 2)
          }
        }
    this.$router.push(to)
  }
}
</script>