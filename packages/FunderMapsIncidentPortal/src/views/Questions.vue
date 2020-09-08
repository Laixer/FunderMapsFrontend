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

import FoundationType from '@/components/questions/FoundationType.vue'
import QuestionTwo from '@/components/questions/QuestionTwo.vue'
import FoundationDamageCause from '@/components/questions/FoundationDamageCause.vue'
import FoundationDamageCharacteristics from '@/components/questions/FoundationDamageCharacteristics.vue'
import EnvironmentDamageCharacteristics from '@/components/questions/EnvironmentDamageCharacteristics.vue'

@Component({
  components: {
    Page, Button, SvgIcon,
    FoundationType, QuestionTwo, FoundationDamageCause, FoundationDamageCharacteristics, EnvironmentDamageCharacteristics
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
    'FoundationType': '',
    'QuestionTwo': {
      'vrijstaand': '',
      'Owner': '',
      'NeighborRecovery': ''
    },
    'FoundationDamageCause': '',
    'FoundationDamageCharacteristics': [],
    'EnvironmentDamageCharacteristics': [],
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
        return 'FoundationType'
      case 3: 
        return 'QuestionTwo'
      case 4:
        return 'FoundationDamageCause'
      case 5:
        return 'FoundationDamageCharacteristics'
      case 6: 
        return 'EnvironmentDamageCharacteristics'
    }

    return 'FoundationType'
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
   * Load all question data at creation
   */
  created() {

    Object.keys(this.questionData).forEach(key => {
      if (key === 'QuestionTwo') {
        this.questionData[key] = {
          'vrijstaand': this.$store.state['vrijstaand'],
          'Owner': this.$store.state['Owner'],
          'NeighborRecovery': this.$store.state['NeighborRecovery']
        }
      } else {
        this.questionData[key] = this.$store.state[key]
      }
    })
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
    if (! this.valid) return

    this.storeData()

    const to = this.step === 6 
      ? { name: 'Upload' } 
      : { name: 'Questions',
          params: {
            question: '' + this.step
          }
        }

    this.$router.push(to)
  }

  /**
   * Handle navigation backward
   */
  handleNavigateBack() {

    if (this.valid) {
      this.storeData()
    }

    const to = this.step === 2 
      ? { name: 'Address' }
      : { name: 'Questions',
          params: {
            question: '' + (this.step - 2)
          }
        }
    this.$router.push(to)
  }

  /**
   * Store the question data in vuex
   */
  storeData() {
    const question = this.currentQuestionComponent

    if (question === 'QuestionTwo') {
      Object
        .entries(this.questionData['QuestionTwo'])
        .forEach((entry) => {
        this.$store.commit('updateState', {
          prop: entry[0],
          value: entry[1]
        })
      })
    } else {
      this.$store.commit('updateState', {
        prop: question,
        value: this.questionData[question]
      })
    }
  }
}
</script>