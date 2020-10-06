<template>
  <div class="Address">
    <div class="MapBox__Wrapper">
      <MapBox
        ref="mapbox"
        :options="{ interactive: false }"
        @load="handleMapbox"
      />
    </div>
    <div class="Address__Wrapper">
      <Title>Melding maken voor het adres:</Title>

      <Form :busy="busy">
        <GeoCoder
          :placeholder="'test'"
          :novalidate="false"
          :address="this.address"
          label="Zoek het adres"
          id="address"
          :valid="isValid"
          @select="handleAddress"
        />
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import QuestionMixin from '@/components/questions/Question'

import Page from '@/components/layout/Page.vue'
import Title from '@/components/Title.vue'
import Button from '@/components/Button.vue'
import SvgIcon from '@/components/common/SvgIcon.vue'

import Form from '@/components/common/Form.vue'
import GeoCoder from '@/components/form/GeoCoder.vue'

import MapBox from '@/components/common/MapBox.vue'
import Address from '@/models/Address'

@Component({
  mixins: [QuestionMixin],
  components: {
    Page, Button, SvgIcon, Title,
    Form, GeoCoder,
    MapBox
  },
})
export default class AddressQuestion extends Mixins(QuestionMixin) {
  $refs!: {
    mapbox: MapBox
  }

  private address: Address | null = null;

  public get isValid(): boolean {
    return this.address !== null
  }

  public async getData(): Promise<void> {
    this.address = this.$store.state.address
  }

  public async storeData(): Promise<void> {
    this.$store.commit('updateState', [
      {
        key: 'address',
        value: this.address
      }
    ])
  }

  @Watch('address')
  onAddressChanged(address: Address): void {
    if (address) {
      this.$refs.mapbox.show(address)
    }
  }

  private handleMapbox() {
    if (this.address) {
      this.$refs.mapbox.show(this.address)
    }
  }

  private handleAddress(address: Address) {
    this.address = address
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