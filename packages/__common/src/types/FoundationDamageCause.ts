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
    Drainage = 0,

    /// <summary>
    /// Construction flaw.
    /// </summary>
    ConstructionFlaw = 1,

    /// <summary>
    /// Drystand.
    /// </summary>
    Drystand = 2,

    /// <summary>
    /// Overcharge.
    /// </summary>
    Overcharge = 3,

    /// <summary>
    /// Overcharge and negative cling.
    /// </summary>
    OverchargeNegativeCling = 4,

    /// <summary>
    /// Negative cling.
    /// </summary>
    NegativeCling = 5,

    /// <summary>
    /// Bio infection.
    /// </summary>
    BioInfection = 6,

    /// <summary>
    /// Fungus infection.
    /// </summary>
    FungusInfection = 8,

    /// <summary>
    /// Bio and fungus infection.
    /// </summary>
    BioFungusInfection = 9,

    /// <summary>
    /// Foundation flaw.
    /// </summary>
    FoundationFlaw = 10,

    /// <summary>
    /// Construnction heave.
    /// </summary>
    ConstructionHeave = 11,

    /// <summary>
    /// Subsidence.
    /// </summary>
    Subsidence = 12,

    /// <summary>
    /// Vegetation.
    /// </summary>
    Vegetation = 13,

    /// <summary>
    /// Gas.
    /// </summary>
    Gas = 14,

    /// <summary>
    /// Vibrations.
    /// </summary>
    Vibrations = 15,

    /// <summary>
    /// Foundation was partially recovered.
    /// </summary>
    PartialFoundationRecovery = 16,
  }
}
