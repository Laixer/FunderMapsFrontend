<template>
  <Page class="Home">
    <div class="Home__Wrapper">
      <div class="Home--left">
        <Title>
          <span v-html="text.title" />
        </Title>
        <BodyText :bold="true">
          <span v-html="text.subtitle" />
        </BodyText>
        <BodyText>
          <span v-html="text.content" />
        </BodyText>
        <!-- <router-link :to="{ name: 'Questions' }">
          <Button id="navigateBodyButton">
            <span>Bekijk funderingsrisico</span>
            <SvgIcon icon="icon_arrow_next" />
          </Button>
        </router-link> -->
      </div>
      <div class="Home--right">
        <img class="Home__Image" width="640" height="585" alt="Logo" />
      </div>
    </div>

    <template #footer>
      <Copyright company="FunderMaps" />
      <!-- <router-link :to="{ name: 'Questions' }">
        <Button id="navigateFooterButton">
          <span>Bekijk funderingsrisico</span>
          <SvgIcon icon="icon_arrow_next" />
        </Button>
      </router-link> -->
    </template>
  </Page>
</template>

<script lang="ts">
import Page from "@/components/layout/Page.vue";
import { /*SvgIcon, Button,*/ BodyText, Copyright, Title } from "@fundermaps/common";
import { defineComponent, inject } from "vue";
import { CustomerPortalConfig } from "@fundermaps/vendor";

export default defineComponent({
  name: "Home",
  components: {
    Page,
    // Button,
    // SvgIcon,
    Copyright,
    Title,
    BodyText
  },
  setup() {
    const app = inject("app_config") as CustomerPortalConfig;
    const text = {
      title: app.home.title,
      subtitle: app.home.subtitle,
      content: app.home.content
    };

    return { text };
  }
});
</script>

<style lang="scss">
.Home {
  &__Image {
    content: $VENDOR_HOME_IMAGE;
  }
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
      border-radius: 5px;
      display: block;
      // object-fit: contain;
      width: 100%;
      height: auto;
    }
  }

  #navigateBodyButton {
    display: none;

    @media only screen and (min-width: $BREAKPOINT) {
      display: inline-flex;
    }
  }

  #navigateFooterButton {
    display: inline-flex;

    @media only screen and (min-width: $BREAKPOINT) {
      display: none;
    }
  }

  // Align Copyright to the start
  .Footer {
    justify-content: center;

    .Copyright {
      display: none;
    }

    @media only screen and (min-width: $BREAKPOINT) {
      justify-content: start;
      .Copyright {
        display: block;
      }
    }
  }
}
</style>
