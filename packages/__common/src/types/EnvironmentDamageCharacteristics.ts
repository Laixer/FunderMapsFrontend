/* eslint-disable @typescript-eslint/no-namespace */

export class EnvironmentDamageCharacteristics {
  constructor(type: EnvironmentDamageCharacteristics.Type) {
    this.type = type;
  }

  type: EnvironmentDamageCharacteristics.Type;
}

export namespace EnvironmentDamageCharacteristics {
  /// <summary>
  /// Environment damage characteristics.
  /// </summary>
  export enum Type {
    /// <summary>
    /// Subsidence.
    /// </summary>
    Subsidence,

    /// <summary>
    /// Sagging cewer connections.
    /// </summary>
    SaggingSewerConnection,

    /// <summary>
    /// Sagging cables and pipes.
    /// </summary>
    SaggingCablesPipes,

    /// <summary>
    /// Flooding.
    /// </summary>
    Flooding,

    /// <summary>
    /// Foundation damage nearby.
    /// </summary>
    FoundationDamageNearby,

    /// <summary>
    /// Elevation.
    /// </summary>
    Elevation,

    /// <summary>
    /// Increasing traffic.
    /// </summary>
    IncreasingTraffic,

    /// <summary>
    /// Construction nearby.
    /// </summary>
    ConstructionNearby,

    /// <summary>
    /// Vegetation nearby.
    /// </summary>
    VegetationNearby,

    /// <summary>
    /// Sewage leakage.
    /// </summary>
    SewageLeakage,

    /// <summary>
    /// Low ground water.
    /// </summary>
    LowGroundWater
  }
}
