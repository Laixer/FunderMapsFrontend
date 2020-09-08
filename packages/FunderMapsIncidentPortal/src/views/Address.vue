<template>
  <Page :step="1" :steps="8" class="Address">
    
    <div class="Address__Wrapper">
      <Title>
        Melding maken voor het adres:
      </Title>
      
      <Form :busy="busy">
        <FormField v-model="address" label="Zoek het adres" id="address" :valid="valid" @validate="handleValidation" />
      </Form>
      <!-- Replace with Mapbox / Google Map + position without borders: remove padding from wrapper + apply to left -->
      
    </div>
    <div class="MapBox__Wrapper">
      <MapBox :accessToken="token" :mapStyle="style" />
    </div>

    <template slot="footer">
      <Button :disabled="!valid || busy" :line="true" @click="handleNavigate">
        <span>Volgende</span>
        <SvgIcon icon="icon_arrow_next" />
      </Button>
    </template>
  
  </Page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Page from '@/components/layout/Page.vue'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

import Form from '@/components/common/Form.vue'
import FormField from '@/components/common/FormField.vue'

import MapBox from '@/components/common/MapBox.vue'


@Component({
  components: {
    Page, Button, SvgIcon, Title,
    Form, FormField,
    MapBox
  }
})
export default class Address extends Vue {

  private valid: boolean|null = null;

  private address = '';

  private busy = false;

  private token = process.env.VUE_APP_MAPBOX_TOKEN;
  private style = process.env.VUE_APP_MAPBOX_STYLE;


  /**
   * TODO: A string longer than 1 character will do...
   */
  handleValidation(value: string|number|boolean|Array<string>) {
    this.valid = ((value + '').trim().length > 1)
  }

  handleNavigate() {
    if (! this.valid || this.busy) return
      
    // TODO: Busy animation in button?
    this.busy = true;

    // TODO: Replace with API call...
    setTimeout(() => {
      console.log(this.address)

      this.busy = false

      this.$router.push({
        name: 'Questions',
        params: {
          question: '1'
        }
      })

    }, 600)
  }

}
</script>

<style lang="scss">
.Address {

  .Page__Content {
    padding: 0;
    flex-direction: row;
    justify-content: space-between;
  }

  &__Wrapper {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    justify-content: space-between;
    height: 100%;
    padding: 50px 80px;

    .Title, .BodyText {
      margin-bottom: 26px;
    }
    .Button {
      margin-top: 24px;
    }
  }
  .MapBox__Wrapper {
    position: relative;
    max-width: 758px;
    width: 758px;
  }
}
</style>