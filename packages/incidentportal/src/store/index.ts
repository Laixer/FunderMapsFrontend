import { FormState } from "@/store/modules/form";
import { createStore } from "vuex";

export interface State {
  form: FormState;
}

// Declare empty store first, dynamically register all modules later.
export default createStore<State>({});
