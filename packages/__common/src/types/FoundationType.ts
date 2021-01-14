/* eslint-disable @typescript-eslint/no-namespace */

export class FoundationType {
  constructor(type: FoundationType.Type) {
    this.type = type;
  }

  type: FoundationType.Type;

  translate(): string {
    switch (this.type) {
      case FoundationType.Type.Concrete:
        return "Betonnen paalfundering";
      case FoundationType.Type.NoPile:
        return "Niet onderheid";
      case FoundationType.Type.NoPileBearingFloor:
        return "Niet onderheid";
      case FoundationType.Type.NoPileConcreteFloor:
        return "Niet onderheid";
      case FoundationType.Type.NoPileMasonry:
        return "Niet onderheid";
      case FoundationType.Type.NoPileSlit:
        return "Niet onderheid";
      case FoundationType.Type.NoPileStrips:
        return "Niet onderheid";
      case FoundationType.Type.Other:
        return "Anders";
      case FoundationType.Type.SteelPile:
        return "Stalen paalfundering";
      case FoundationType.Type.Unknown:
        return "Onbekend";
      case FoundationType.Type.WeightedPile:
        return "Verzwaarde betonpuntpaal";
      case FoundationType.Type.Wood:
        return "Houten paalfundering";
      case FoundationType.Type.WoodAmsterdam:
        return "Houten paalfundering";
      case FoundationType.Type.WoodCharger:
        return "Houten paalfundering met betonoplanger";
      case FoundationType.Type.WoodRotterdam:
        return "Houten paalfundering";
      default:
        return "Onbekend";
    }
  }

  isPile(): boolean {
    return [
      FoundationType.Type.Concrete,
      FoundationType.Type.SteelPile,
      FoundationType.Type.WeightedPile,
      FoundationType.Type.Wood,
      FoundationType.Type.WoodAmsterdam,
      FoundationType.Type.WoodCharger,
      FoundationType.Type.WoodRotterdam
    ].includes(this.type);
  }
}

export namespace FoundationType {
  /// <summary>
  /// Foundation type.
  /// </summary>
  export enum Type {
    /// <summary>
    /// Wood.
    /// </summary>
    Wood,

    /// <summary>
    /// Wood foundation accoring to Amsterdam.
    /// </summary>
    WoodAmsterdam,

    /// <summary>
    /// Wood foundation accoring to Rotterdam.
    /// </summary>
    WoodRotterdam,

    /// <summary>
    /// Concrete.
    /// </summary>
    Concrete,

    /// <summary>
    /// No pile.
    /// </summary>
    NoPile,

    /// <summary>
    /// No pile and no masonry.
    /// </summary>
    NoPileMasonry,

    /// <summary>
    /// No pile strips.
    /// </summary>
    NoPileStrips,

    /// <summary>
    /// No pile and no bearing floor.
    /// </summary>
    NoPileBearingFloor,

    /// <summary>
    /// No pile and no concrete floor.
    /// </summary>
    NoPileConcreteFloor,

    /// <summary>
    /// No pile and no slit.
    /// </summary>
    NoPileSlit,

    /// <summary>
    /// Wood charger.
    /// </summary>
    WoodCharger,

    /// <summary>
    /// Weighted pile.
    /// </summary>
    WeightedPile,

    /// <summary>
    /// Combined.
    /// </summary>
    Combined,

    /// <summary>
    /// Steel pile.
    /// </summary>
    SteelPile,

    /// <summary>
    /// Other.
    /// </summary>
    Other,

    /// <summary>
    /// Unknown.
    /// </summary>
    Unknown
  }
}
