<template>
  <Page class="Home">
    
    <div class="Home__Wrapper">
      <div class="Home--left">
        <Title>
          Wat doen we?
        </Title>

        <BodyText>
          Stichting Kennis Centrum Aanpak Funderingsproblematiek (KCAF) is een stichting met als doelstelling het verzamelen, ontwikkelen en ontsluiten van kennis rond de aanpak en preventie van funderingsproblemen. 
        </BodyText>

        <BodyText>
          KCAF fungeert als nationaal funderingsloket voor alle vragen rond deze problematiek. Van funderingsonderzoek tot funderingsherstel, van aanpak tot financiering, van preventie tot innovatie. Deze doelstelling willen we samen met vakmensen en eigen medewerkers bereiken. KCAF is een stichting zonder winstoogmerk. Bij dit loket kunt u een melding maken van een funderingsprobleem aan uw woning. Wij zullen u vrijblijvend van advies voorzien.
        </BodyText>

        <div>
          <Button>
            <span>Melding maken</span>
            <SvgIcon icon="icon_arrow_next" />
          </Button>
        </div>
      </div>

      <img class="Home--right" src="../assets/home.jpg" width="640" />
    </div>

    <template slot="footer">
      <Copyright />
    </template>
  
  </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Page from '@/components/layout/Page.vue'
import Title from '@/components/Title.vue'
import BodyText from '@/components/BodyText.vue'
import Copyright from '@/components/Copyright.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

@Component({
  components: {
    Page, Button, SvgIcon, Copyright, Title, BodyText
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.Home {
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