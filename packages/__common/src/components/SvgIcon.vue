<template>
  <div ref="container" class="SvgIcon svg-container" v-html="svg"></div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, nextTick, ref } from "vue";

declare const __APP: string;

/**
 * TODO: Avoid inline svg. Convert into svg element with all icons in head, and use 'use' for inline.
 */
export default defineComponent({
  name: "SvgIcon",
  props: {
    icon: {
      type: String,
      required: true
    },
    hasFill: {
      type: Boolean,
      default: false
    },
    growByHeight: {
      type: Boolean,
      default: true
    }
  },
  setup(props: { icon: string; hasFill: boolean; growByHeight: boolean }) {
    const container = ref<HTMLElement | null>(null);

    const recursivelyRemoveFill = (el: Element): void => {
      if (!el) {
        return;
      }
      el.removeAttribute("fill");
      [].forEach.call(el.children, child => {
        recursivelyRemoveFill(child);
      });
    };

    const setupSvg = () => {
      const element = container.value?.firstElementChild;
      if (element) {
        if (element.nodeName === "svg") {
          // use `viewBox` attribute to get the svg's inherent width and height
          const viewBox = element
            .getAttribute("viewBox")
            ?.split(" ")
            .map((n: string) => Number(n)) || [0, 0, 0, 0];
          const widthToHeight = Number((viewBox[2] / viewBox[3]).toFixed(2));
          if (props.hasFill) {
            // recursively remove all fill attribute of element and its nested children
            recursivelyRemoveFill(element);
          }
          // set width and height relative to font size
          // if growByHeight is true, height set to 1em else width set to 1em and remaining is calculated based on widthToHeight ratio
          if (props.growByHeight) {
            element.setAttribute("height", "1em");
            element.setAttribute("width", `${widthToHeight}em`);
          } else {
            element.setAttribute("width", "1em");
            element.setAttribute("height", `${1 / widthToHeight}em`);
          }
          element.classList.add("svg-class");
        }
      }
    };

    onMounted(() => {
      setupSvg();
    });

    watch(props, () => {
      nextTick(setupSvg);
    });

    console.log(process.env);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const svg = require(`!html-loader!../assets/icons/${__APP}/${props.icon}.svg`);

    return { svg };
  }
});
</script>

<style lang="scss" scoped>
.svg-container {
  display: inline-flex;
}
.svg-class {
  vertical-align: middle;
}
</style>
