<template>
  <div class="Address">
    <div class="MapBox__Wrapper">
      <MapBox :accessToken="token" :mapStyle="style" @load="handleMapbox" />
    </div>
    <div class="Address__Wrapper">
      <Title>Melding maken voor het adres:</Title>

      <Form :busy="busy">
        <GeoCoder
          :novalidate="false"
          v-model="addressLabel"
          label="Zoek het adres"
          id="address"
          :valid="isValid"
          @suggestion="handleSuggestion"
        />
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import QuestionMixin from '@/components/questions/Question'

import Page from '@/components/layout/Page.vue'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

import Form from '@/components/common/Form.vue'
import GeoCoder from '@/components/form/GeoCoder.vue'

import MapBox from '@/components/common/MapBox.vue'
import { ISuggestion } from '@/components/form/ISuggestion'
import { formatAddressSuggestion } from '@/helpers/text'


@Component({
  mixins: [QuestionMixin],
  components: {
    Page, Button, SvgIcon, Title,
    Form, GeoCoder,
    MapBox
  },
})
export default class AddressQuestion extends Mixins(QuestionMixin) {
  private addressLabel = '';
  private address = '';
  private addressCoordinates: Array<number> | null = null;
  private addressGeojson: JSON | null = null;

  private map: any;

  private token = process.env.VUE_APP_MAPBOX_TOKEN;
  private style = process.env.VUE_APP_MAPBOX_STYLE;

  created(): void {
    this.addressLabel = this.$store.state.addressLabel
    this.addressCoordinates = this.$store.state.addressCoordinates
    this.address = this.$store.state.address
    this.addressGeojson = this.$store.state.addressGeojson
  }

  public get isValid(): boolean {
    return this.address !== null
  }

  public storeData(): void {
    this.$store.commit('updateState', [
      {
        key: 'addressLabel',
        value: this.addressLabel
      },
      {
        key: 'addressCoordinates',
        value: this.addressCoordinates
      },
      {
        key: 'address',
        value: this.address
      },
      {
        key: 'addressGeojson',
        value: this.addressGeojson
      },
    ])
  }

  private handleMapbox({ map }: Record<string, any>) {
    this.map = map
    if (this.addressCoordinates !== undefined && this.addressGeojson !== undefined) {
      this.handleCoordinates()
    }
  }

  private handleSuggestion(suggestion: ISuggestion) {
    const geojson = JSON.parse(this.hex_to_ascii(suggestion.buildingGeometry))

    const coordinates = geojson['coordinates'][0][0][0]

    this.addressLabel = formatAddressSuggestion(suggestion)
    this.address = suggestion.addressId
    this.addressCoordinates = coordinates
    this.addressGeojson = geojson


    this.handleCoordinates()
  }

  private handleCoordinates() {
    if (this.map && this.addressCoordinates && this.addressGeojson) {
      this.map.getSource('address').setData(this.addressGeojson)
      this.map.flyTo({
        center: this.addressCoordinates,
        zoom: 18
      })
    }
  }

  private hex_to_ascii(str1: string): string {
    let hex = str1.toString();
    let str = '';
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }
}
</script>

<style lang="scss">
.Address {
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  max-width: 100%;
  height: 100%;

  @media only screen and (min-width: $BREAKPOINT) {
    flex-direction: row-reverse;
  }

  .Address__Wrapper {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    justify-content: flex-start;
    padding: 25px 20px;

    @media only screen and (min-width: $BREAKPOINT) {
      padding: 50px 80px;
    }

    .Title,
    .BodyText {
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
      width: calc(100% - 503px);
    }
  }
}
</style>