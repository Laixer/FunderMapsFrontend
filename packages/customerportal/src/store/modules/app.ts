import store, { State } from "@/store";
import { getModule, Module, VuexModule } from "vuex-module-decorators";

export interface AppState {
  riskRequestBody: unknown;
}

@Module({ dynamic: true, store, name: "app", namespaced: true })
class AppModule extends VuexModule implements AppState {
  riskRequestBody: unknown;

  get RiskRequestBody() {
    return (this.state as State).form;
  }
}

export default getModule(AppModule);
