import EnvironmentDamageCharacteristics from '@/types/EnvironmentDamageCharacteristics'
import FoundationDamageCause from '@/types/FoundationDamageCause'
import FoundationDamageCharacteristics from '@/types/FoundationDamageCharacteristics'
import FoundationType from '@/types/FoundationType'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

type Prop = {
  key: string,
  value: string | number | Array<string | number | JSON>
}

interface State {
  [key: string]: any | null,
  name: null | string
  firstName: null | string,
  lastName: null | string,
  email: null | string,
  phoneNumber: null | string,
  foundationType: null | FoundationType
  address: null | string,
  addressLabel: null | string,
  addressCoordinates: null | string,
  addressGeojson: null | JSON,
  foundationDamageCharacteristics: Array<FoundationDamageCharacteristics>,
  environmentDamageCharacteristics: Array<EnvironmentDamageCharacteristics>,
  owner: null | boolean,
  chainedBuilding: null | boolean,
  neighborRecovery: null | boolean,
  foundationDamageCause: null | FoundationDamageCause,
  documentFile: Array<string>,
  note: null | string,
  internalNote: null | string,
}

export default new Vuex.Store({
  state: {
    name: null,
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    foundationType: null,
    address: null,
    addressLabel: null,
    addressCoordinates: null,
    addressGeojson: null,
    foundationDamageCharacteristics: [],
    environmentDamageCharacteristics: [],
    owner: null,
    chainedBuilding: null,
    neighborRecovery: null,
    foundationDamageCause: null,
    documentFile: [],
    note: null,
    internalNote: null,
  } as State,
  getters: {
    /**
     * Retrieve the indent request body
     */
    getIndicentRequestBody(state) {
      console.log(process.env.VUE_APP_CLIENTID, state.environmentDamageCharacteristics)
      const request = {
        "Name": state.name,
        "ClientId": parseInt(process.env.VUE_APP_CLIENTID, 10),
        "Email": state.email,
        "PhoneNumber": state.phoneNumber,
        "FoundationType": parseInt(state.foundationType + '', 10),
        "Address": state.address,
        "FoundationDamageCharacteristics": state.foundationDamageCharacteristics.flatMap((val) => parseInt(val + '', 10)),
        "EnvironmentDamageCharacteristics": state.environmentDamageCharacteristics.flatMap((val) => parseInt(val + '', 10)),
        "Owner": state.owner,
        "OhainedBuilding": state.chainedBuilding,
        "NeighborRecovery": state.neighborRecovery,
        "FoundationDamageCause": parseInt(state.foundationDamageCause + '', 10),
        "DocumentFile": state.documentFile,
        "Note": state.note,
      }

      return request
    }
  },
  mutations: {
    updateState(state: State, props: Prop[]) {
      Object.entries(props).map((val) => {
        const prop: Prop = val[1]
        state[prop.key] = prop.value
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
