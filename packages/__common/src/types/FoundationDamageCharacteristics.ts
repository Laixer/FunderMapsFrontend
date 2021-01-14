/* eslint-disable @typescript-eslint/no-namespace */

export class FoundationDamageCharacteristics {
  constructor(type: FoundationDamageCharacteristics.Type) {
    this.type = type;
  }

  type: FoundationDamageCharacteristics.Type;
}

export namespace FoundationDamageCharacteristics {
  /// <summary>
  /// Foundation damage characteristics.
  /// </summary>
  export enum Type {
    /// <summary>
    /// Jamming door window.
    /// </summary>
    JammingDoorWindow,

    /// <summary>
    /// Crack.
    /// </summary>
    Crack,

    /// <summary>
    /// Skewed.
    /// </summary>
    Skewed,

    /// <summary>
    /// CrawlspaceFlooding.
    /// </summary>
    CrawlspaceFlooding,

    /// <summary>
    /// Threshold above subsurface.
    /// </summary>
    ThresholdAboveSubsurface,

    /// <summary>
    /// Threshold below subsurface.
    /// </summary>
    ThresholdBelowSubsurface,

    /// <summary>
    /// Crooked floor wall.
    /// </summary>
    CrookedFloorWall
  }
}
