import { AppState } from "@/store/modules/app";
import { FormState } from "@/store/modules/form";
import { GeoState } from "@/store/modules/geo";
import { createStore } from "vuex";

export interface State {
  app: AppState;
  form: FormState;
  geo: GeoState;
}

// Declare empty store first, dynamically register all modules later.
export default createStore<State>({});
