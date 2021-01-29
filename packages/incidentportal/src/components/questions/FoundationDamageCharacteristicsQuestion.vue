<template>
  <div class="FoundationDamageCharacteristics">
    <Title :center="true" subtitle="Meerdere opties mogelijk"
      >Herkent u minstens één van de volgende punten aan de woning?</Title
    >

    <Form>
      <CheckboxInput id="woning" v-model="value" :options="options" :valid="isValid" />
    </Form>
  </div>
</template>

<script lang="ts">
import { CheckboxInput, Title, Form, Option, FoundationDamageCharacteristics } from "@fundermaps/common";
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
    const value: Ref<Array<FoundationDamageCharacteristics>> = ref(form.foundationDamageCharacteristics);
    const { Type } = FoundationDamageCharacteristics;
    const options: Array<Option> = [
      {
        label: "Klemmende ramen en/of deuren",
        value: Type.JammingDoorWindow
      },
      {
        label: "De woning ligt hoger dan trottoir/weg",
        value: Type.ThresholdAboveSubsurface
      },
      {
        label: "Scheur(en) in de muur en/of gevel(s)",
        value: Type.Crack
      },
      {
        label: "De woning ligt lager dan trottoir/weg",
        value: Type.ThresholdBelowSubsurface
      },
      {
        label: "De woning staat wat scheef",
        value: Type.Skewed
      },
      {
        label: "Scheve vloeren/muren in de woning",
        value: Type.CrookedFloorWall
      },
      {
        label: "Hoog water in de kruipruimte",
        value: Type.CrawlspaceFlooding
      }
    ];

    const isValid: ComputedRef<boolean> = computed(() => value.value.length > 0);

    function onSubmit(): void {
      form.setFoundationDamageCharacteristics(value.value);
    }

    return { value, options, onSubmit, isValid };
  }
});
</script>

<style lang="scss">
.FoundationDamageCharacteristics {
  padding: 20px 20px;

  @media only screen and (min-width: $BREAKPOINT) {
    padding: 50px 80px;
  }
  .Title {
    margin-bottom: 21px;
  }
}
</style>
