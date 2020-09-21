<template>
  <Page class="Finish" :step="9" :steps="8">
    <div class="Finish__Wrapper">
      <Title>Advies</Title>

      <BodyText :bold="true">Bedankt voor het doorgeven van uw melding.</BodyText>
      <BodyText><span v-html="vendor.final.content"/></BodyText>
      <div>
        <a href="https://www.kcaf.nl/publicaties/stappenplan-funderingsherstel/" target="_blank" alt="stappenplann">
          <Button :line="true">
            <span>Bekijk het stappenplan</span>
           <SvgIcon icon="icon_externallink" />
         </Button>
        </a>
      </div>
    </div>

    <template slot="footer">
      <SvgIcon icon="icon_circle_check" />Verzending gelukt
    </template>
  </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Page from '@/components/layout/Page.vue'
import Title from '@/components/Title.vue'
import BodyText from '@/components/BodyText.vue'

import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'
import vendor from '@/vendor'


@Component({
  components: {
    Page, Button, SvgIcon, Title, BodyText
  }
})
export default class Finish extends Vue { 
    private vendor = vendor
}
</script>

<style lang="scss">
.Finish {
  &__Wrapper {
    padding: 20px 20px;

    @media only screen and (min-width: $BREAKPOINT) {
      padding: 50px 80px;
    }
    max-width: 550px;
    margin: 0 auto;
  }

  a {
    text-decoration: none
  }

  .Title,
  .BodyText {
    margin-bottom: 26px;
  }
  .Title + .BodyText {
    color: #202122;
  }

  .Footer {
    color: #202122;
    font-size: 18px;

    .SvgIcon {
      font-size: 24px;
      color: #00c95d;
      margin-right: 6px;
    }
  }
}
</style>