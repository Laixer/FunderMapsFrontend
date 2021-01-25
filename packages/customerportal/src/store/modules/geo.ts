import store from "@/store";
import { Address } from "@fundermaps/common";
import { getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface GeoState {
  address: Address | null;
}

@Module({ dynamic: true, store, name: "geo", namespaced: true })
class GeoModule extends VuexModule {
  address: Address | null = null;

  @Mutation
  setAddress(value: Address | null) {
    this.address = value;
  }
}

export default getModule(GeoModule);
