<template>
  <div class="Address">
    <div class="MapBox__Wrapper">
      <MapBox :access-token="token" :address="address" :map-style="style" />
    </div>
    <div class="Address__Wrapper">
      <Title>Melding maken voor het adres:</Title>

      <Form :busy="busy">
        <GeoCoder
          id="address"
          v-model="address"
          :novalidate="false"
          :placeholder="address ? address.displayName : ''"
          label="Zoek het adres"
          :valid="true"
        />
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { Map } from "mapbox-gl";
import { Form, Title, MapBox, Address, GeoCoder } from "@fundermaps/common";
import { computed, ComputedRef, defineComponent, Ref, ref } from "vue";
import form from "../../store/modules/form";

export default defineComponent({
  name: "AddressQuestion",
  components: { Title, Form, GeoCoder, MapBox },
  setup() {
    const address: Ref<Address | null> = ref(form.address);
    const map = ref<Map | null>(null);

    const isValid: ComputedRef<boolean> = computed(() => address.value !== null);

    function onSubmit(): void {
      form.setAddress(address.value);
    }

    return {
      map,
      isValid,
      address,
      onSubmit
    };
  }
});

//   private handleMapbox({ map }: Record<string, any>) {
//     this.map = map;
//     if (this.addressCoordinates !== undefined && this.addressGeojson !== undefined) {
//       this.handleCoordinates();
//     }
//   }

//   private handleSuggestion(suggestion: ISuggestion) {
//     const geojson = JSON.parse(this.hex_to_ascii(suggestion.buildingGeometry));

//     const coordinates = geojson["coordinates"][0][0][0];

//     this.addressLabel = formatAddressSuggestion(suggestion);
//     this.address = suggestion.addressId;
//     this.addressCoordinates = coordinates;
//     this.addressGeojson = geojson;

//     this.handleCoordinates();
//   }

//   private handleCoordinates() {
//     if (this.map && this.addressCoordinates && this.addressGeojson) {
//       this.map.getSource("address").setData(this.addressGeojson);
//       this.map.flyTo({
//         center: this.addressCoordinates,
//         zoom: 18
//       });
//     }
//   }

//   private hex_to_ascii(str1: string): string {
//     const hex = str1.toString();
//     let str = "";
//     for (let n = 0; n < hex.length; n += 2) {
//       str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
//     }
//     return str;
//   }
// });
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
