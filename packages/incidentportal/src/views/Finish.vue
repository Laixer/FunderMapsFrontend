<template>
  <Page class="Finish" :step="9" :steps="8">
    <div class="Finish__Wrapper">
      <Title>Advies</Title>

      <BodyText :bold="true">Bedankt voor het doorgeven van uw melding.</BodyText>
      <BodyText><span v-html="content"/></BodyText>
      <div>
        <a href="https://www.kcaf.nl/publicaties/stappenplan-funderingsherstel/" target="_blank" alt="stappenplann">
          <Button :line="true">
            <span>Bekijk het stappenplan</span>
            <SvgIcon icon="icon_externallink" />
          </Button>
        </a>
      </div>
    </div>

    <template #footer> <SvgIcon icon="icon_circle_check" />Verzending gelukt </template>
  </Page>
</template>

<script lang="ts">
import Page from "@/components/layout/Page.vue";

import { Title, BodyText, Button, SvgIcon } from "@fundermaps/common";
import { IncidentPortalConfig } from "@fundermaps/vendor";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Finish",
  components: {
    Page,
    Button,
    SvgIcon,
    Title,
    BodyText
  },
  setup() {
    return { content: IncidentPortalConfig.final.content };
  }
});
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
    text-decoration: none;
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
