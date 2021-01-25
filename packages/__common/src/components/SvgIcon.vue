<template>
  <!--  eslint-disable-next-line vue/no-v-html -->
  <div class="SvgIcon svg-container" v-html="import(`!html-loader!~assets/icons/${icon}.svg`)"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/**
 * Obtained from https://gist.github.com/achhunna/cae74645f3ef1e7787c07bcdee163d18
 * Article on usage: https://medium.com/js-dojo/making-svg-icon-component-in-vue-cb7fac70e758
 * Modified as per comment on article.
 *
 * Also requires webpack.config.js rule. See: https://stackoverflow.com/a/55318979/1533140
 *
 * TODO: Avoid inline svg. Convert into svg element with all icons in head, and use 'use' for inline.
 */
export const SvgIcon = defineComponent({
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
  watch: {
    icon() {
      this.$nextTick(this.setupSvg);
    },
    hasFill() {
      this.$nextTick(this.setupSvg);
    },
    growByHeight() {
      this.$nextTick(this.setupSvg);
    }
  },
  mounted() {
    this.setupSvg();
  },
  methods: {
    setupSvg(): void {
      if (this.$el.firstElementChild.nodeName === "svg") {
        const svgElement = this.$el.firstElementChild;
        // use `viewBox` attribute to get the svg's inherent width and height
        const viewBox = svgElement
          .getAttribute("viewBox")
          .split(" ")
          .map((n: string) => Number(n));
        const widthToHeight = Number((viewBox[2] / viewBox[3]).toFixed(2));
        if (this.hasFill) {
          // recursively remove all fill attribute of element and its nested children
          this.recursivelyRemoveFill(svgElement);
        }
        // set width and height relative to font size
        // if growByHeight is true, height set to 1em else width set to 1em and remaining is calculated based on widthToHeight ratio
        if (this.growByHeight) {
          svgElement.setAttribute("height", "1em");
          svgElement.setAttribute("width", `${widthToHeight}em`);
        } else {
          svgElement.setAttribute("width", "1em");
          svgElement.setAttribute("height", `${1 / widthToHeight}em`);
        }
        svgElement.classList.add("svg-class");
      }
    },
    recursivelyRemoveFill(el: Element): void {
      if (!el) {
        return;
      }
      el.removeAttribute("fill");
      [].forEach.call(el.children, child => {
        this.recursivelyRemoveFill(child);
      });
    }
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
