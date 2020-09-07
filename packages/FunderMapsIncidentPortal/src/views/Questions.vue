<template>
  <Page :step="step" :steps="8" class="Questions">
    
    <component v-bind:is="currentQuestionComponent" @validity="handleValidity"></component>

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

  

  private valid = false

  get step(): number {
    return 1 + parseInt(this.$route.params.question, 10)
  }

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
   * 
   */
  handleValidity(valid: boolean) {
    this.valid = valid
  }

  /**
   * Handle navigation forward
   */
  handleNavigate() {
    if (this.valid) {
      const to = this.step === 6 
        ? { name: 'Upload' } 
        : { name: 'Questions',
            params: {
              question: '' + this.step
            }
          }

      this.$router.push(to)
    }
  }

  /**
   * Handle navigation backward
   */
  handleNavigateBack() {
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

<style lang="scss">
.Questions {
  &__Wrapper {
    display: flex;
    max-width: 100%;
    justify-content: space-between;

    img {
      max-width: 640px;
    }
  }
  &--left {
    max-width: calc(100% - 720px);

    .Title, .BodyText {
      margin-bottom: 26px;
    }
    .Button {
      margin-top: 24px;
    }
  }
}
</style>