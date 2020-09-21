<template>
  <Page class="Home">
    <div class="Home__Wrapper">
      <div class="Home--left">
        <Title>Wat doen we?</Title>

        <BodyText
          :bold="true"
        >Stichting Kennis Centrum Aanpak Funderingsproblematiek (KCAF) is een stichting met als doelstelling het verzamelen, ontwikkelen en ontsluiten van kennis rond de aanpak en preventie van funderingsproblemen.</BodyText>

        <BodyText>KCAF fungeert als nationaal funderingsloket voor alle vragen rond deze problematiek. Van funderingsonderzoek tot funderingsherstel, van aanpak tot financiering, van preventie tot innovatie. Deze doelstelling willen we samen met vakmensen en eigen medewerkers bereiken. KCAF is een stichting zonder winstoogmerk. Bij dit loket kunt u een melding maken van een funderingsprobleem aan uw woning. Wij zullen u vrijblijvend van advies voorzien.</BodyText>

        <div>
          <Button @click="handleNavigate">
            <span>Melding maken</span>
            <SvgIcon icon="icon_arrow_next" />
          </Button>
        </div>
      </div>
      <div class="Home--right">
        <img src="../assets/home.jpg" width="640" height="585" alt="Logo" />
      </div>
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
export default class Home extends Vue {
  handleNavigate(): void {
    this.$router.push({
      name: 'Questions',
      params: {
        question: '1',
      }
    })
  }
}
</script>

<style lang="scss">
.Home {
  &__Wrapper {
    padding: 20px 20px;

    @media only screen and (min-width: $BREAKPOINT) {
      padding: 50px 80px;
    }
    display: flex;
    max-width: 100%;
    justify-content: space-between;
    flex-direction: column;

    @media only screen and (min-width: $BREAKPOINT) {
      flex-direction: row;

      &--right {
        display: none;
      }
    }
  }
  &--left {
    .Title,
    .BodyText {
      margin-bottom: 26px;
    }
    .Button {
      margin-top: 12px;

      @media only screen and (min-width: $BREAKPOINT) {
        margin-top: 24px;
      }
    }
  }

  &--right {
    display: none;
    margin: 40px 0;
    max-width: 100%;
    max-height: 580px;

    // The max width of the image
    @media only screen and (min-width: 640px) {
      max-width: 640px;
      display: none;
    }

    @media only screen and (min-width: $BREAKPOINT) {
      display: block;
      margin: 0;
      max-width: calc(100% - 610px); // 640px;
    }

    img {
      display: block;
      // object-fit: contain;
      width: 100%;
      height: auto;
    }
  }

  // Align Copyright to the start
  .Footer {
    justify-content: start;
  }
}
</style>