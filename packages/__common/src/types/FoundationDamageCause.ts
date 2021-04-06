/* eslint-disable @typescript-eslint/no-namespace */

export class FoundationDamageCause {
  constructor(type: FoundationDamageCause.Type) {
    this.type = type;
  }

  type: FoundationDamageCause.Type;
}

export namespace FoundationDamageCause {
  export enum Type {
    /// <summary>
    /// Drainage.
    /// </summary>
    Drainage,

    /// <summary>
    /// Construction flaw.
    /// </summary>
    ConstructionFlaw,

    /// <summary>
    /// Drystand.
    /// </summary>
    Drystand,

    /// <summary>
    /// Overcharge.
    /// </summary>
    Overcharge,

    /// <summary>
    /// Overcharge and negative cling.
    /// </summary>
    OverchargeNegativeCling,

    /// <summary>
    /// Negative cling.
    /// </summary>
    NegativeCling,

    /// <summary>
    /// Bio infection.
    /// </summary>
    BioInfection,

    /// <summary>
    /// Fungus infection.
    /// </summary>
    FungusInfection,

    /// <summary>
    /// Bio and fungus infection.
    /// </summary>
    BioFungusInfection,

    /// <summary>
    /// Foundation flaw.
    /// </summary>
    FoundationFlaw,

    /// <summary>
    /// Construnction heave.
    /// </summary>
    ConstructionHeave,

    /// <summary>
    /// Subsidence.
    /// </summary>
    Subsidence,

    /// <summary>
    /// Vegetation.
    /// </summary>
    Vegetation,

    /// <summary>
    /// Gas.
    /// </summary>
    Gas,

    /// <summary>
    /// Vibrations.
    /// </summary>
    Vibrations,

    /// <summary>
    /// Foundation was partially recovered.
    /// </summary>
    PartialFoundationRecovery
  }
}
