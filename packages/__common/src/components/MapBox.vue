<template>
  <div class="jw-map-wrapper">
    <div id="container" />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Map, MapboxOptions, Marker } from "mapbox-gl";
import { Address } from "../types/Address";
import "mapbox-gl/dist/mapbox-gl.css";
import { defineComponent, onBeforeUnmount, onMounted, inject, SetupContext, PropType, nextTick, watch } from "vue";

/**
 * A Generic MapBox wrapper component
 */
export default defineComponent({
  name: "MapBox",
  props: {
    options: {
      type: Object as PropType<MapboxOptions>,
      default: {}
    },
    address: {
      type: Object as PropType<Address | null>,
      default: null,
      required: false
    }
  },
  emits: ["load"],
  setup(props, { emit }: SetupContext) {
    const { mapboxPrimaryColor } = inject<{ mapboxPrimaryColor: string }>("vendor_style", {
      mapboxPrimaryColor: "#2657FF"
    });

    const token = process.env.VUE_APP_MAPBOX_TOKEN;
    const mapStyle = process.env.VUE_APP_MAPBOX_STYLE;

    let map: Map | null = null;

    let addressMarker: Marker | null = null;

    const moveToAddress = () => {
      if (props.address && map) {
        const { Long, Lat } = props.address.coordinates;
        addressMarker?.remove();
        addressMarker = new Marker().setLngLat([Long, Lat]).addTo(map);

        map.jumpTo({
          center: [Long, Lat],
          zoom: 18
        });
      }
    };

    watch(
      () => props.address,
      () => {
        moveToAddress();
      }
    );

    onBeforeUnmount(async () => {
      await nextTick(() => {
        map?.remove();
      });
    });

    onMounted(() => {
      map = new Map({
        ...props.options,
        container: "container",
        accessToken: token,
        style: mapStyle
      });

      map.once("load", () => {
        map?.addSource("address", {
          type: "geojson",
          data: ""
        });

        map?.addLayer({
          id: "address",
          type: "fill",
          source: "address",
          layout: {},
          paint: {
            "fill-color": mapboxPrimaryColor,
            "fill-opacity": 0.8
          }
        });

        emit("load", map);
        moveToAddress();
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

.mapboxgl-canvas {
  outline: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0); /* mobile webkit */
}

.mapboxgl-control-container {
  display: none;
}
</style>
