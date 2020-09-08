import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    "Name": "",
    "FirstName": "", // Not part of the API, but available as input field
    "LastName": "", // Not part of the API, but available as input field
    "ClientId": 3,
    "Email": "",
    "PhoneNumber": "06360557722",
    "FoundationType": 5,
    "Address": "gfm-00000163c7e04fa9a562688df1e077b9",
    "AddressLabel": "",  // Not part of the API, but available as input field
    "AddressCoordinates": null, // Not part of the API, but available as input field
    "FoundationDamageCharacteristics": [
      1,
      3
    ],
    "EnvironmentDamageCharacteristics": [
      1
    ],
    "Owner": "",
    "ChainedBuilding": "",
    "NeighborRecovery": "",
    "FoundationDamageCause": 6,
    "DocumentFile": [
      "https://somefile.ext"
    ],
    "Note": "",
    "InternalNote": ""
  },
  getters: {
    /**
     * Retrieve the indent request body
     */
    getIndicentRequestBody(state) {
      const request = Object.assign(state)
      request.Name = `${state.FirstName} ${state.LastName}`

      delete request.FirstName
      delete request.LastName

      delete request.AddressLabel
      delete request.AddressCoordinates

      return request
    }
  },
  mutations: {
    /**
     * TODO: fix this...
     */
    updateState(state: Record<string, string|number|null|Array<string|number>>, { prop, value }: Record<string, string|number|Array<string|number>>) {
      state[prop+''] = value
    },
  },
  actions: {
  },
  modules: {
  }
})
