<template>
  <Page :step="1" :steps="8" class="Address">
    
    <div class="Address__Wrapper">
      <Title>
        Melding maken voor het adres:
      </Title>
      
      <Form :busy="busy">
        <GeoCoder 
          :novalidate="true" 
          v-model="address" 
          label="Zoek het adres" 
          id="address" 
          :valid="valid" 
          @coordinates="handleCoordinates" />
      </Form>
      
    </div>
    <div class="MapBox__Wrapper">
      <MapBox :accessToken="token" :mapStyle="style" @load="handleMapbox" />
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
import GeoCoder from '@/components/form/GeoCoder.vue'

import MapBox from '@/components/common/MapBox.vue'


@Component({
  components: {
    Page, Button, SvgIcon, Title,
    Form, GeoCoder,
    MapBox
  }
})
export default class Address extends Vue {

  private valid: boolean|null = null;

  private address = '';

  private busy = false;

  private map: any;

  // TODO: Replace with mapbox wrapper component that inserts a pin
  private token = process.env.VUE_APP_MAPBOX_TOKEN;
  private style = process.env.VUE_APP_MAPBOX_STYLE;


  handleNavigate() {
    if (! this.valid) return

    // TODO: Also store user input, not just the address reference id
    this.$store.commit('updateState', {
      prop: 'Address',
      value: this.address
    })

    this.$router.push({
      name: 'Questions',
      params: {
        question: '1'
      }
    })
  }

  handleMapbox({ map }: Record<string, any>) {
    this.map = map
  }

  handleCoordinates(coordinates: Array<number>) {
    if (this.map) {
      
      this.valid = true

      this.map.flyTo({
        center: coordinates,
        zoom: 15
      })
    }
  }

}
</script>

<style lang="scss">
.Address {

  .Page__Content {
    padding: 0;
    justify-content: space-between;

    @media only screen and (min-width: $BREAKPOINT) {
      flex-direction: row;
    }
  }

  &__Wrapper {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    justify-content: space-between;
    height: 100%;
    padding: 25px 20px;

    @media only screen and (min-width: $BREAKPOINT) {
      padding: 50px 80px;
    }

    .Title, .BodyText {
      margin-bottom: 26px;
    }
    .Button {
      margin-top: 24px;
    }
  }
  .MapBox__Wrapper {
    position: relative;

    max-width: 100%;
    width: 100%;
    min-height: 285px;
    height: calc(100vh - 406px);

    @media only screen and (min-width: $BREAKPOINT) {
      height: auto;
      max-width: 758px;
      width: calc(100% - 503px);
    }
    
  }
}
</style>