import store from "@/store";
import { getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface FormState {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

@Module({ dynamic: true, store, name: "form" })
class Form extends VuexModule implements FormState {
  firstName: string | null = null;
  lastName: string | null = null;
  email: string | null = null;

  @Mutation
  setFirstname(value: string) {
    this.firstName = value;
  }

  @Mutation
  setLastname(value: string) {
    this.firstName = value;
  }

  @Mutation
  setEmail(value: string) {
    this.firstName = value;
  }
}

export const FormModule = getModule(Form);
