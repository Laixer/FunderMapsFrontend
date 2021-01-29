<template>
  <div class="AddressCharacteristics">
    <Form :on-submit="onSubmit">
      <div class="AddressCharacteristics--one">
        <Title :center="true">Is het een vrijstaand pand of onderdeel van een (bouw)blok?</Title>
        <RadioImageInput
          id="vrijstaand"
          v-model="chainedBuilding"
          :options="vrijstaandOptions"
          :valid="chainedBuilding !== null"
        />
      </div>
      <div class="AddressCharacteristics--two">
        <Title :center="true">Bent u eigenaar of huurder van de woning?</Title>
        <RadioImageInput id="eigendom" v-model="owner" :options="eigendomOptions" :valid="owner !== null" />
      </div>
      <div class="AddressCharacteristics--three">
        <Title :center="true">Is bij een van uw directe buren funderingsherstel uitgevoerd?</Title>
        <RadioImageInput
          id="buren"
          v-model="neighborRecovery"
          :options="burenOptions"
          :valid="neighborRecovery !== null"
        />
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import form from "../../store/modules/form";
import { computed, ComputedRef, defineComponent, Ref, ref } from "vue";

import { Form, Option, Title, RadioImageInput } from "@fundermaps/common";

export default defineComponent({
  name: "AddressCharacteristicsQuestion",
  components: {
    Title,
    Form,
    RadioImageInput
  },
  setup() {
    const chainedBuilding: Ref<boolean | null> = ref(form.chainedBuilding);
    const owner: Ref<boolean | null> = ref(form.owner);
    const neighborRecovery: Ref<boolean | null> = ref(form.neighborRecovery);

    const vrijstaandOptions: Array<Option> = [
      {
        label: "Vrijstaand",
        value: false,
        image: "options/vrijstaand_vrijstaand"
      },
      {
        label: "(Bouw)blok",
        value: true,
        image: "options/vrijstaand_bouwblok"
      }
    ];

    const eigendomOptions: Array<Option> = [
      {
        label: "Eigenaar",
        value: true,
        image: "options/eigendom_eigenaar"
      },
      {
        label: "Huurder",
        value: false,
        image: "options/eigendom_huurder"
      }
    ];

    const burenOptions: Array<Option> = [
      {
        label: "Ja",
        value: true,
        image: "options/buren_ja"
      },
      {
        label: "Nee",
        value: false,
        image: "options/buren_nee"
      }
    ];

    const isValid: ComputedRef<boolean> = computed(
      () => chainedBuilding.value !== null && owner.value !== null && neighborRecovery.value !== null
    );

    function onSubmit(): void {
      form.setChainedBuilding(chainedBuilding.value);
      form.setOwner(owner.value);
      form.setNeighborRecover(neighborRecovery.value);
    }

    return {
      chainedBuilding,
      owner,
      neighborRecovery,
      vrijstaandOptions,
      eigendomOptions,
      burenOptions,
      isValid,
      onSubmit
    };
  }
});
</script>

<style lang="scss">
.AddressCharacteristics {
  padding: 20px 20px;

  @media only screen and (min-width: $BREAKPOINT) {
    padding: 50px 80px;
  }

  .Title {
    margin-bottom: 21px;
  }
  .Form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    @media only screen and (min-width: 1115px) {
      flex-direction: row;
    }
  }

  &--one,
  &--two,
  &--three {
  }
  &--one,
  &--two {
    padding-bottom: 44px;
    border-bottom: 1px solid #d4daf0;
  }
  &--two,
  &--three {
    padding-top: 25px;
  }
  &--three {
    padding-bottom: 24px;
  }

  // More than regular breakpoint, because the items won't fit otherwise
  @media only screen and (min-width: 1115px) {
    &--one {
      width: 430px;
      padding: 0 50px 31px 0;
    }
    &--two {
      width: 430px;
      padding: 0 0 31px 50px;
      border-left: 1px solid #d4daf0;
    }
    &--three {
      padding-bottom: 0;
    }
  }
}
</style>
