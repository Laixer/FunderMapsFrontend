<template>
  <div class="FoundationType">
    <Title :center="true">Op welke type fundering is de woning gebouwd?</Title>

    <Form :on-submit="onSubmit">
      <RadioImageInput id="type" v-model="foundationType" :options="options" :valid="isValid" />
    </Form>
  </div>
</template>

<script lang="ts">
import form from "../../store/modules/form";
import { computed, ComputedRef, defineComponent, Ref, ref } from "vue";

import { Form, Option, Title, RadioImageInput, FoundationType } from "@fundermaps/common";

export default defineComponent({
  name: "AddressCharacteristicsQuestion",
  components: {
    Title,
    Form,
    RadioImageInput
  },
  setup() {
    const foundationType: Ref<FoundationType | null> = ref(form.foundationType);
    const { Type } = FoundationType;

    const options: Array<Option> = [
      {
        label: "Houten palen",
        value: Type.Wood,
        image: "options/type_hout"
      },
      {
        label: "Ondiep op staal",
        value: Type.NoPile,
        image: "options/type_staal"
      },
      {
        label: "Betonnen palen",
        value: Type.Concrete,
        image: "options/type_beton"
      },
      {
        label: "Weet ik niet",
        value: null,
        image: "options/type_onbekend"
      }
    ];
    const isValid: ComputedRef<boolean> = computed(() => true);

    function onSubmit(): void {
      form.setFoundationType(foundationType.value);
    }

    return {
      foundationType,
      options,
      isValid,
      onSubmit
    };
  }
});
</script>

<style lang="scss">
.FoundationType {
  padding: 20px 20px;

  @media only screen and (min-width: $BREAKPOINT) {
    padding: 50px 80px;
  }
  .Title {
    margin-bottom: 21px;
  }

  .RadioImageInput__Wrapper {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .RadioImageInput__Field {
    margin: 10px 10px 10px 10px;
  }
}
</style>
