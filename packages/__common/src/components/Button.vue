<template>
  <button
    class="Button"
    :class="{ 'Button--submit': isSubmit, 'Button--wide': wide, 'Button--ghost': ghost, 'Button--line': line }"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  componens: {},
  props: {
    // Whether this is a submit button for a form
    isSubmit: {
      type: Boolean,
      default: false
    },
    // A ghost button has no fill or border
    ghost: {
      type: Boolean,
      default: false
    },
    // A line button only shows a border in normal view. Fill shows in states
    line: {
      type: Boolean,
      default: false
    },
    // The button takes up full width if true
    wide: {
      type: Boolean,
      default: false
    }
  },
  emits: { click: null },
  setup(_, { emit }) {
    // Pass on the click event
    const handleClick = (e: Event) => {
      emit("click", e);
    };

    return { handleClick };
  }
});
</script>

<style lang="scss">
$active: adjust-color($VENDOR_PRIMARY_COLOR, $red: 120, $green: 91, $blue: 0);
$hover: adjust-color($VENDOR_PRIMARY_COLOR, $red: -7, $green: -19, $blue: -58);

.Button:focus {
  outline: none;
}

.Button {
  border-width: 0px;
  position: relative;
  padding: 15px 27px 16px;
  font-size: 18px;
  line-height: 19px;
  letter-spacing: -0.3px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;

  // Regular
  background: $VENDOR_PRIMARY_COLOR;
  color: white;

  &--submit {
    background: #00c95d;
  }

  &:hover {
    background: $hover;
  }

  &:active {
    background: $active;
  }
  &[disabled] {
    opacity: 0.25;
    filter: grayscale(80%);
    cursor: not-allowed;
  }

  &--line {
    background: white;
    color: $VENDOR_PRIMARY_COLOR;
    padding: 13px 25px 14px;
    border: 2px solid $VENDOR_PRIMARY_COLOR;

    &:hover {
      background: $VENDOR_PRIMARY_COLOR;
      color: white;
      border: none;
      padding: 15px 27px 16px;
    }
    &:active {
      background: $active;
      color: white;
      border: none;
      padding: 15px 27px 16px;
    }
    &[disabled] {
      filter: grayscale(80%);
      color: white;
      border: none;
      padding: 15px 27px 16px;
    }
  }

  &--ghost {
    background: transparent;
    color: $VENDOR_PRIMARY_COLOR;
    filter: grayscale(80%);
    opacity: 0.8;

    &:hover {
      background: transparent;
      filter: none;
      opacity: 1;

      color: $VENDOR_PRIMARY_COLOR;
    }
    &:active {
      background: transparent;
      filter: none;
      opacity: 1;
      color: $active;
    }
  }

  &--wide {
    text-align: center;
    width: 100%;
  }

  .SvgIcon {
    font-size: 14px;

    &:last-child {
      margin-left: 15px;
    }
    &:first-child {
      margin-right: 15px;
    }
  }
}
</style>
