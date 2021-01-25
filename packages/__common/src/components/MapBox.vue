<template>
  <div class="jw-map-wrapper">
    <div ref="container"></div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Map, MapboxOptions } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { defineComponent, ref, onBeforeUnmount, onMounted, inject, SetupContext, PropType, nextTick } from "vue";

/**
 * A Generic MapBox wrapper component
 */
export default defineComponent({
  name: "MapBox",
  props: {
    options: {
      type: Object as PropType<MapboxOptions>,
      default: {}
    }
  },
  emits: ["load"],
  setup(props, { emit }: SetupContext) {
    const vendorStyle = inject<{ mapboxPrimaryColor: string }>("vendor_style", { mapboxPrimaryColor: "#2657FF" });

    const token = ref<string>(process.env.VUE_APP_MAPBOX_TOKEN!);
    const mapStyle = ref<string>(process.env.VUE_APP_MAPBOX_STYLE!);

    const map = ref<Map>(
      new Map({
        ...props.options,
        accessToken: token.value,
        style: mapStyle.value
      })
    );

    onBeforeUnmount(async () => {
      await nextTick(() => {
        map.value.remove();
      });
    });

    onMounted(() => {
      map.value.on("load", () => {
        map.value.addSource("address", {
          type: "geojson"
        });

        map.value.addLayer({
          id: "address",
          type: "fill",
          source: "address",
          layout: {},
          paint: {
            "fill-color": vendorStyle.mapboxPrimaryColor,
            "fill-opacity": 0.8
          }
        });

        emit("load", { map });
      });
    });

    return {
      map
    };
  }
});
</script>

<style>
.jw-map-wrapper,
.mapboxgl-map {
  height: 100%;
  width: 100%;
}

.mapboxgl-control-container {
  display: none;
}
</style>
