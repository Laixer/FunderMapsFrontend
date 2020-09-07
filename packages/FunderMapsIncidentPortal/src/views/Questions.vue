<template>
  <Page :step="step" :steps="9" class="Questions">
    
    <component v-bind:is="currentQuestionComponent" @validity="handleValidity"></component>

    <template slot="footer">
      <Button :ghost="true" @click="handleNavigate">
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

@Component({
  components: {
    Page, Button, SvgIcon,
    QuestionOne
  }
})
export default class Questions extends Vue {

  private currentQuestionComponent = 'QuestionOne'

  private valid = false

  get step(): number {
    return 1 + parseInt(this.$route.params.question, 10)
  }

  /**
   * 
   */
  handleValidity(valid: boolean) {
    console.log("hello?", valid)
    this.valid = valid
  }

  handleNavigate() {
    if (this.valid) {
      this.$router.push({
        name: 'Questions',
        params: {
          question: this.step + 1 + ''
        }
      })
    }
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