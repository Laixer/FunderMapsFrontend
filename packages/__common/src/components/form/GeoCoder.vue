<template>
  <div class="FormField GeoCoder" :class="fieldClasses">
    <label :for="id" class="FormField__Label">{{ label }}</label>

    <div class="FormField__Wrapper">
      <input
        :id="id"
        v-model="searchText"
        :type="type"
        :placeholder="placeholder"
        :autocomplete="autocomplete ? autocomplete : 'off'"
        :disabled="isDisabled"
        class="FormField__Field"
        @input="handleInput"
        @blur="handleBlur"
      />

      <SvgIcon :icon="fieldIcon" class="FormField__Icon" />

      <div v-if="suggestions.length !== 0" class="GeoCoder__Suggestions">
        <div
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          class="Suggestion"
          :title="suggestion.weergavenaam"
          @click="handleSelect(suggestion)"
        >
          <SvgIcon icon="icon_location" class="Suggestion__Icon" />
          <span v-html="suggestion.highlighting"></span>
        </div>
      </div>
    </div>

    <span v-if="error" class="FormField__Feedback">{{ error }}</span>
  </div>
</template>

<script lang="ts">
import { PDOKAddressSuggestion } from "../../types/PDOKAddressSuggestion";
import SvgIcon from "../SvgIcon.vue";
import { Address } from "../../types/Address";
import { withFormFieldProps } from "../../props/FormFieldProps";
import { useFormField } from "../../props/useFormField";
import { defineComponent, ref, Ref, PropType, SetupContext, computed } from "vue";

export default defineComponent({
  name: "GeoCoder",
  components: { SvgIcon },
  props: {
    ...withFormFieldProps(),
    address: {
      type: Object as PropType<Address | null>,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(props, context: SetupContext) {
    const searchText = ref("");
    const suggestions: Ref<Array<PDOKAddressSuggestion>> = ref([]);

    const { validationIcon } = useFormField(props, context);

    const handleInput = async (e: Event): Promise<void> => {
      const target = e.target as HTMLInputElement;

      // TODO: Move to API
      // We only want to send an API call if the length of the input is at least 3.
      if (target.value.length >= 3) {
        try {
          // Request addresses from API
          const json = await fetch(
            `https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?fq=type:adres&q=${target.value}&rows=7`
          ).then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
          });

          suggestions.value = [];

          // Populate address collection with parsed TypeScript classes
          json.response.docs.forEach((item: PDOKAddressSuggestion) => {
            suggestions.value.push({
              id: item.id,
              type: item.type,
              weergavenaam: item.weergavenaam,
              score: item.score,
              highlighting: json.highlighting[item.id].suggest[0]
            });
          });
        } catch (e) {
          // If the response fails, clear the collection
          suggestions.value = [];
        }
      }

      // // We are in search mode. Emit a null value until we select something with [handleSelect]
      context.emit("update:modelValue", null);
    };

    // Handle selection events
    const handleSelect = async (suggestion: PDOKAddressSuggestion): Promise<void> => {
      suggestions.value = [];
      searchText.value = suggestion.weergavenaam;

      const { response } = await fetch(
        `https://geodata.nationaalgeoregister.nl/locatieserver/v3/lookup?fl=nummeraanduiding_id,centroide_ll&id=${suggestion.id}`
      ).then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      });

      const addr = response.docs[0];
      const id = `NL.IMBAG.NUMMERAANDUIDING.${addr.nummeraanduiding_id}`;
      const coords = addr.centroide_ll.replace(/[^\d., ]/g, "").split(" ");

      context.emit(
        "update:modelValue",
        new Address(
          id,
          {
            Long: +coords[0],
            Lat: +coords[1]
          },
          suggestion.weergavenaam
        )
      );
    };

    // Format our address suggestions
    // We use a specific function that includes
    // HTML markup so we can use highlighting.
    const fieldIcon = computed(() => (validationIcon.value ? validationIcon.value : "icon_search"));

    return { handleSelect, suggestions, handleInput, fieldIcon, searchText };
  }
});
</script>

<style lang="scss">
.GeoCoder {
  position: relative;

  .FormField__Field {
    padding-right: 45px;
  }

  .FormField__Icon {
    opacity: 1;
    font-size: 20px;
  }
}
.GeoCoder.FormField--invalid,
.GeoCoder.FormField--valid {
  .FormField__Icon {
    font-size: 12px;
  }
}

.GeoCoder__Suggestions {
  width: 100%;
  padding-top: 5px;
  border: 2px solid #d4daf0;
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
  background: white;

  @media only screen and (max-width: $BREAKPOINT) {
    position: absolute;
    top: 80px;
    z-index: 9999;
  }

  .Suggestion {
    display: block;
    position: relative;
    padding: 13px 15px 14px 50px;

    span {
      display: inline-block;
      font-size: 14px;
      line-height: 19px;
      color: #202122;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .SvgIcon {
      color: #d4daf0;
      position: absolute;
      top: 13px;
      left: 20px;
      font-size: 19px;
    }

    &:hover {
      cursor: pointer;
      background: $VENDOR_PRIMARY_COLOR;

      .SvgIcon,
      span {
        color: white;
      }
    }
  }
}
</style>
