import { hex_to_ascii } from '@/helpers/text'
import { LngLat } from 'mapbox-gl';
import { Feature, MultiPolygon } from 'geojson'
import { centroid } from '@turf/turf'

export default class Address {

  addressId: string;
  buildingGeometry: string;
  buildingId: string;
  buildingNumber: string;
  builtYear: string;
  postalCode: string;
  street: string;
  city: string;

  constructor(
    addressId: string,
    buildingGeometry: string,
    buildingId: string,
    buildingNumber: string,
    builtYear: string,
    postalCode: string,
    street: string,
    city: string
  ) {
    this.addressId = addressId
    this.buildingGeometry = buildingGeometry
    this.buildingNumber = buildingNumber
    this.buildingId = buildingId
    this.builtYear = builtYear
    this.postalCode = postalCode
    this.street = street
    this.city = city
  }

  get geojson(): Feature<MultiPolygon> {
    return JSON.parse(hex_to_ascii(this.buildingGeometry)) as Feature<MultiPolygon>
  }

  get coordinates(): LngLat {
    const center = centroid(this.geojson)
    if (center.geometry !== null) {
      return new LngLat(center.geometry.coordinates[0], center.geometry.coordinates[1])
    }
    else {
      throw Error(`Unable to retrieve coordinates for ${this.geojson}`)
    }
  }

  get label(): string {
    return this._format()
  }

  get label_compact(): string {
    return this._format(true, true, false, true)
  }

  labelWithMarkup(inputValue: string): string {
    let formatted = this._format()
    const indexOf = formatted.toLowerCase().indexOf(inputValue.toLowerCase())

    formatted = formatted.length > 32
      ? formatted.substr(0, 32 - 1) + '&hellip;'
      : formatted;

    if (indexOf >= 0) {
      const length: number = inputValue.length as number
      const end: number = indexOf + length
      return [formatted.slice(0, indexOf), '<strong>', formatted.slice(indexOf, end), '</strong>', formatted.slice(end, formatted.length)].join('')
    }

    return formatted
  }

  private _format(includeStreet = true, includeBuildingNumber = true, includePostalCode = true, includeCity = true): string {
    return `${includeStreet ? this.street : ''} ${includeBuildingNumber ? this.buildingNumber : ''}${(this.postalCode && includePostalCode) ? `, ${this.postalCode}` : ''}, ${includeCity ? this.city : ''}`.replace(/\s\s+/g, '')
  }
}