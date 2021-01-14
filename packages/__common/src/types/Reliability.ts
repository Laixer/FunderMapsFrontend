/* eslint-disable @typescript-eslint/no-namespace */

export class Reliability {
  constructor(type: Reliability.Type) {
    this.type = type;
  }

  type: Reliability.Type;
}

export namespace Reliability {
  /// <summary>
  ///     Indicates the reliability of a product.
  /// </summary>
  export enum Type {
    /// <summary>
    ///     When our model was used.
    /// </summary>
    Indicative,

    /// <summary>
    ///     When a report is present.
    /// </summary>
    Established
  }
}
