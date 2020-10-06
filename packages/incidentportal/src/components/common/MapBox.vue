<template>
  <div class="jw-map-wrapper">
    <keep-alive>
      <div ref="container"></div>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import mapboxgl, { MapboxOptions, GeoJSONSource, Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import vendor from '@/vendor'
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import Address from '@/models/Address';

/**
 * A Generic MapBox wrapper component
 */
@Component
export default class MapBox extends Vue {

  $refs!: {
    container: HTMLElement
  }

  @Prop({ default: process.env.VUE_APP_MAPBOX_STYLE }) readonly mapStyle!: string;
  @Prop({ default: () => { return {} } }) readonly options!: MapboxOptions;

  map!: Map

  created(): void {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;
  }

  mounted(): void {
    this.map = new mapboxgl.Map(
      {
        ...this.options,
        container: this.$refs.container,
        style: this.mapStyle,
      }
    )

    this.map.on('load', () => {

      this.map.addSource('address', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      })
      this.map.addLayer({
        id: 'address',
        type: 'fill',
        source: 'address',
        layout: {},
        paint: {
          'fill-color': vendor.style.mapboxPrimaryColor,
          'fill-opacity': 0.8,
        },
      })

      this.$emit('load', this.map)
    })
  }

  beforeDestroy(): void {
    this.$nextTick(() => {
      this.map?.remove()
    })
  }

  show(address: Address): void {
    if (this.map?.getSource('address')) {
      (this.map.getSource('address') as GeoJSONSource).setData(address.geojson)
      this.map.flyTo({
        center: address.coordinates,
        zoom: 18
      })
    }
  }

}
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
/* .jw-map-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  user-select: none;
}

.mapboxgl-map {
  width: 100% !important;
  height: 100% !important;
} */
</style>
