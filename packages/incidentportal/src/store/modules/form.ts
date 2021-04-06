import store from "@/store";
import {
  Address,
  EnvironmentDamageCharacteristics,
  FoundationDamageCause,
  FoundationDamageCharacteristics,
  FoundationType
} from "@fundermaps/common";
import { vendorConfig } from "@fundermaps/vendor";
import { getModule, Module, Mutation, MutationAction, VuexModule } from "vuex-module-decorators";

export interface FormState {
  name: null | string;
  firstName: null | string;
  lastName: null | string;
  email: null | string;
  phoneNumber: null | string;
  foundationType: null | FoundationType;
  address: null | Address;
  foundationDamageCharacteristics: Array<FoundationDamageCharacteristics>;
  environmentDamageCharacteristics: Array<EnvironmentDamageCharacteristics>;
  owner: null | boolean;
  chainedBuilding: null | boolean;
  neighborRecovery: null | boolean;
  foundationDamageCause: null | FoundationDamageCause;
  documentFile: Array<{ uuid: string; file: string }>;
  note: null | string;
  internalNote: null | string;
}

@Module({ dynamic: true, store, name: "form", namespaced: true })
class FormModule extends VuexModule implements FormState {
  name: string | null = null;
  firstName: string | null = null;
  lastName: string | null = null;
  email: string | null = null;
  phoneNumber: string | null = null;
  foundationType: FoundationType | null = null;
  address: Address | null = null;
  foundationDamageCharacteristics: Array<FoundationDamageCharacteristics> = [];
  environmentDamageCharacteristics: Array<EnvironmentDamageCharacteristics> = [];
  owner: boolean | null = null;
  chainedBuilding: boolean | null = null;
  neighborRecovery: boolean | null = null;
  foundationDamageCause: FoundationDamageCause | null = null;
  documentFile: Array<{ uuid: string; file: string }> = [];
  note: string | null = null;
  internalNote: string | null = null;

  /**
   * Retrieve the indent request body
   */
  get incidentRequestBody() {
    return {
      Name: this.firstName ? `${this.firstName} ${this.lastName}` : null,
      ClientId: vendorConfig.client_id,
      Email: this.email,
      PhoneNumber: this.phoneNumber,
      FoundationType: this.foundationType ? parseInt(this.foundationType + "", 10) : null,
      Address: this.address?.externalId,
      FoundationDamageCharacteristics: this.foundationDamageCharacteristics.flatMap(val => parseInt(val + "", 10)),
      EnvironmentDamageCharacteristics: this.environmentDamageCharacteristics.flatMap(val => parseInt(val + "", 10)),
      Owner: this.owner,
      ChainedBuilding: this.chainedBuilding,
      NeighborRecovery: this.neighborRecovery,
      FoundationDamageCause: this.foundationDamageCause ? parseInt(this.foundationDamageCause + "", 10) : null,
      DocumentFile: this.documentFile.flatMap((entry: any) => [entry.file]), // TODO: Fix typing
      Note: this.note
    };
  }

  @MutationAction({
    mutate: [
      "name",
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "foundationType",
      "address",
      "foundationDamageCharacteristics",
      "environmentDamageCharacteristics",
      "owner",
      "chainedBuilding",
      "neighborRecovery",
      "foundationDamageCause",
      "documentFile",
      "note",
      "internalNote"
    ]
  })
  async reset() {
    return {
      name: null,
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      foundationType: null,
      address: null,
      foundationDamageCharacteristics: [],
      environmentDamageCharacteristics: [],
      owner: null,
      chainedBuilding: null,
      neighborRecovery: null,
      foundationDamageCause: null,
      documentFile: [],
      note: null,
      internalNote: null
    };
  }

  @Mutation
  setFirstname(value: string | null) {
    this.firstName = value;
  }

  @Mutation
  setLastname(value: string | null) {
    this.lastName = value;
  }

  @Mutation
  setEmail(value: string | null) {
    this.email = value;
  }

  @Mutation
  setPhoneNumber(value: string | null) {
    this.phoneNumber = value;
  }

  @Mutation
  setFoundationType(value: FoundationType | null) {
    this.foundationType = value;
  }

  @Mutation
  setAddress(value: Address | null) {
    this.address = value;
  }

  @Mutation
  setFoundationDamageCharacteristics(value: Array<FoundationDamageCharacteristics>) {
    this.foundationDamageCharacteristics = value;
  }

  @Mutation
  setEnvironmentDamageCharacteristics(value: Array<EnvironmentDamageCharacteristics>) {
    this.environmentDamageCharacteristics = value;
  }

  @Mutation
  setOwner(value: boolean | null) {
    this.owner = value;
  }

  @Mutation
  setChainedBuilding(value: boolean | null) {
    this.chainedBuilding = value;
  }

  @Mutation
  setNeighborRecover(value: boolean | null) {
    this.neighborRecovery = value;
  }

  @Mutation
  setFoundationDamageCause(value: FoundationDamageCause | null) {
    this.foundationDamageCause = value;
  }

  @Mutation
  setDocumentFile(value: Array<{ uuid: string; file: string }>) {
    this.documentFile = value;
  }

  @Mutation
  setNote(value: string | null) {
    this.note = value;
  }

  @Mutation
  setInternalNote(value: string | null) {
    this.internalNote = value;
  }
}

export default getModule(FormModule);
