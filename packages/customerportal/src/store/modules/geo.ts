import store from "@/store";
import { Address } from "@fundermaps/common";
import { getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface GeoState {
  address: Address | null;
}

@Module({ dynamic: true, store, name: "geo" })
class Geo extends VuexModule {
  address: Address | null = null;

  @Mutation
  setAddress(value: Address) {
    this.address = value;
  }
}

export const GeoModule = getModule(Geo);
