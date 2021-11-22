<template>
  <div class="FoundationDamageCause">
    <Title :center="true">Wat veroorzaakt de schade aan de woning?</Title>

    <Form>
      <RadioTextInput id="type" v-model="value" :options="options" :valid="isValid" @input="handleInput" />
    </Form>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from "vue";
import { Title, Form, Option, FoundationDamageCause, RadioTextInput } from "@fundermaps/common";
import form from "../../store/modules/form";

export default defineComponent({
  name: "EnvironmentDamageCharacteristicsQuestion",
  components: {
    Title,
    Form,
    RadioTextInput
  },
  setup() {
    const value: Ref<FoundationDamageCause | null> = ref(form.foundationDamageCause);
    const { Type } = FoundationDamageCause;
    const options: Array<Option> = [
      {
        label: "Verkeerd gefundeerd bij de bouw",
        value: Type.ConstructionFlaw
      },
      {
        label: "Beschadiging van de fundering door (planten)wortels",
        value: Type.Vegetation
      },
      {
        label: "Aantasting van houten palen door schimmels/bacterieën",
        value: Type.BioFungusInfection
      },
      {
        label: "Gaswinning of mijnbouw",
        value: Type.Gas
      },
      {
        label: "De funderingspalen drukken de woning omhoog",
        value: Type.ConstructionHeave
      },
      {
        label: "Verkeer nabij de woning",
        value: Type.Vibrations
      },
      {
        label: "De funderingspalen worden naar beneden getrokken",
        value: Type.NegativeCling
      },
      {
        label: "Funderingsherstel bij de buren",
        value: Type.PartialFoundationRecovery
      },
      {
        label: "Bodemdaling",
        value: Type.Subsidence
      },
      {
        label: "Fundering niet meer berekend op het huidige gewicht",
        value: Type.FoundationFlaw
      },
      {
        label: "Japanse duizendknoop",
        value: Type.JapanseKnotweed
      },
      {
        label: "Weet ik niet",
        value: null
      }
    ];

    const isValid: ComputedRef<boolean> = computed(() => true);

    function onSubmit(): void {
      form.setFoundationDamageCause(value.value);
    }

    return { value, options, onSubmit, isValid };
  }
});
</script>
<style lang="scss">
.FoundationDamageCause {
  padding: 20px 20px;

  @media only screen and (min-width: $BREAKPOINT) {
    padding: 50px 80px;
  }
  .Title {
    margin-bottom: 21px;
  }
}
</style>
