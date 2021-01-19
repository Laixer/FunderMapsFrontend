<template>
  <div class="Risk">
    <div v-if="risk !== null" class="Risk__Wrapper">
      <Title>{{ address.label_compact }}</Title>
      <RiskLabel :risk="risk" />
      <BodyText v-html="risk.describe()" />
      <BodyText v-if="risk.restorationCostDescripton" v-html="risk.restorationCostDescripton" />
      <BodyText v-if="risk.propertyDescription" v-html="risk.propertyDescription" />
      <BodyText>
        <ul>
          <li v-if="risk.foundationType !== null">
            <strong>Funderingstype:</strong>
            {{ risk.foundationType.translate() }}
          </li>
          <li v-if="risk.restorationCostDescription !== null">
            <strong>Indicatieve herstelkosten:</strong>
            {{ risk.restorationCostDescription }}
          </li>
        </ul>
      </BodyText>
    </div>
    <div class="MapBox__Wrapper">
      <MapBox @load="handleMapbox" />
    </div>
  </div>
</template>

<script lang="ts">
import Title from "@/components/Title.vue";
import { GeoJSONSource, Map } from "mapbox-gl";

import BodyText from "@/components/BodyText.vue";
import RiskLabel from "@/components/RiskLabel.vue";

import { MapBox } from "@fundermaps/common";
import { AnalysisRisk, Address } from "@fundermaps/common";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ResultPage",
  components: {
    Title,
    BodyText,
    RiskLabel,
    MapBox
  },
  props: {
    address: {
      type: Address,
      required: true
    },
    risk: {
      type: AnalysisRisk,
      required: true
    }
  },
  data() {
    return {
      map: undefined as undefined | Map
    };
  },
  computed: {
    isValid(): boolean {
      return this.address !== undefined;
    }
  },
  methods: {
    storeData(): void {
      return;
    },
    handleMapbox(map: Map) {
      this.map = map;
      if (this.address !== undefined) {
        this.handleCoordinates();
      }
    },
    handleCoordinates(): void {
      const { map } = this;
      if (map !== undefined && this.address) {
        (map.getSource("address") as GeoJSONSource).setData(this.address.geojson);
        map.flyTo({
          center: this.address.coordinates,
          zoom: 18
        });
      }
    }
  }
  // async created(): Promise<void> {
  //   this.address = this.$store.state.address

  //   const id = this.$store.state.address?.buildingId
  //   const json = await fetch(`${process.env.VUE_APP_API_BASE_URL}/api/incident-portal/risk?id=${id}`).then(res => {
  //     if (!res.ok) throw new Error(res.statusText)
  //     return res.json()
  //   })

  //   this.risk = new AnalysisRisk(
  //     json.neighborhoodId,
  //     json.foundationType,
  //     json.foundationRisk,
  //     json.restorationCosts,
  //     json.dewateringDepth,
  //     json.drystand,
  //     json.reliability
  //   )
  // }
});
</script>

<style lang="scss">
.Risk {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;

  @media only screen and (min-width: $BREAKPOINT) {
    flex-direction: row;
  }

  &__Wrapper {
    flex-basis: auto;
    order: 1;

    display: flex;
    flex-direction: column;
    max-width: 100%;
    justify-content: flex-start;
    padding: 25px 20px;
    flex-basis: 66%;
    @media only screen and (min-width: $BREAKPOINT) {
      flex-basis: auto;
    }

    .Title,
    .BodyText {
      font-size: 17px;
      margin-bottom: 24px;
    }
    .RiskLabel {
      margin: 0 0 24px 0;
    }
  }
  .MapBox__Wrapper {
    order: 2;
    max-width: 100%;
    height: 265px;

    @media only screen and (min-width: $BREAKPOINT) {
      flex-basis: 66%;
      height: 100%;
    }
  }
}
</style>
