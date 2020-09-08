<template>
  <Page class="Finish" :step="9" :steps="8">
    
    <div class="Finish__Wrapper">
      <Title>
        Advies
      </Title>

      <BodyText :bold="true">
        Bedankt voor het doorgeven van uw melding.
      </BodyText>

      <BodyText>
        Wij nemen contact met u op om u van een persoonlijk advies te voorzien. Uw gegevens blijven strikt vertrouwelijk en worden niet buiten het KCAF gedeeld. 
      </BodyText>

      <BodyText>
        In ons stappenplan voor funderingsherstel leggen wij duidelijk uit welke stappen u alvast kunt nemen en voor welke stappen professionele hulp noodzakelijk is om grip te krijgen op funderingsproblemen.
      </BodyText>

      <div>
        <Button :line="true">
          <span>Bekijk het stappenplan</span>
          <SvgIcon icon="icon_externallink" />
        </Button>
      </div>
    </div>

    <template slot="footer">
      <SvgIcon icon="icon_circle_check" />
      Verzending gelukt
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

@Component({
  components: {
    Page, Button, SvgIcon, Title, BodyText
  }
})
export default class Finish extends Vue {}
</script>

<style lang="scss">
.Finish {
  &__Wrapper {
    max-width: 550px;
    margin: 0 auto;
  }

  .Title, .BodyText {
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
      color: #00C95D;
      margin-right: 6px;
    }
  }
  
}
</style>