<template>
  <div class="EnvironmentDamageCharacteristics">
    <Title :center="true" subtitle="Meerdere opties mogelijk"
      >Herkent u minstens één van de volgende punten in de omgeving van de woning?</Title
    >
    <Form :on-submit="onSubmit">
      <CheckboxInput id="omgeving" v-model="value" :options="options" :valid="isValid" />
    </Form>
  </div>
</template>

<script lang="ts">
import { CheckboxInput, Title, Form, Option, EnvironmentDamageCharacteristics } from "@fundermaps/common";
import form from "../../store/modules/form";

import { computed, ComputedRef, defineComponent, Ref, ref } from "vue";

export default defineComponent({
  name: "EnvironmentDamageCharacteristicsQuestion",
  components: {
    Title,
    Form,
    CheckboxInput
  },
  setup() {
    const value: Ref<Array<EnvironmentDamageCharacteristics>> = ref(form.environmentDamageCharacteristics);
    const { Type } = EnvironmentDamageCharacteristics;
    const options: Array<Option> = [
      {
        label: "Er is sprake van bodemdaling tuin/erf",
        value: Type.Subsidence
      },
      {
        label: "Andere panden in de buurt met funderingsproblemen",
        value: Type.FoundationDamageNearby
      },
      {
        label: "Verzakkende rioolaansluitingen",
        value: Type.SaggingSewerConnection
      },
      {
        label: "Toenemende verkeersdrukte in de straat",
        value: Type.IncreasingTraffic
      },
      {
        label: "Verzakkende kabels en leidingen",
        value: Type.SaggingCablesPipes
      },
      {
        label: "De straat is onlangs opgehoogd",
        value: Type.Elevation
      },
      {
        label: "Wateroverlast (water op straat)",
        value: Type.Flooding
      },

      {
        label: "Er zijn bouwactiviteiten in de omgeving gaande (geweest)",
        value: Type.ConstructionNearby
      },
      {
        label: "Water onderlast (droge bodem)",
        value: Type.LowGroundWater
      },
      {
        label: "Er staan grote bomen dicht bij (< 10 m) mijn woning",
        value: Type.VegetationNearby
      },
      {
        label: "Lekke riolering",
        value: Type.SewageLeakage
      }
    ];

    const isValid: ComputedRef<boolean> = computed(() => value.value.length > 0);

    function onSubmit(): void {
      form.setEnvironmentDamageCharacteristics(value.value);
    }

    return { value, options, onSubmit, isValid };
  }
});
</script>

<style lang="scss">
.EnvironmentDamageCharacteristics {
  padding: 20px 20px;

  @media only screen and (min-width: $BREAKPOINT) {
    padding: 50px 80px;
  }
  .Title {
    margin-bottom: 21px;
  }
}
</style>
