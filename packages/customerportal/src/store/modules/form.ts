import store from "@/store";
import { getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface FormState {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

@Module({ dynamic: true, store, name: "form", namespaced: true })
class FormModule extends VuexModule implements FormState {
  firstName: string | null = null;
  lastName: string | null = null;
  email: string | null = null;

  @Mutation
  setFirstname(value: string | null) {
    this.firstName = value;
  }

  @Mutation
  setLastname(value: string | null) {
    this.firstName = value;
  }

  @Mutation
  setEmail(value: string | null) {
    this.firstName = value;
  }
}

export default getModule(FormModule);
