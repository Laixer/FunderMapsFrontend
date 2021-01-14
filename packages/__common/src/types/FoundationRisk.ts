/* eslint-disable @typescript-eslint/no-namespace */

export class FoundationRisk {
  constructor(type: FoundationRisk.Type) {
    this.type = type;
  }

  type: FoundationRisk.Type;

  translate(): string {
    switch (this.type) {
      case FoundationRisk.Type.A:
        return "A";
      case FoundationRisk.Type.B:
        return "B";
      case FoundationRisk.Type.C:
        return "C";
      case FoundationRisk.Type.D:
        return "D";
      case FoundationRisk.Type.E:
        return "E";
      default:
        return FoundationRisk.Type[this.type];
    }
  }

  describe(): string {
    switch (this.type) {
      case FoundationRisk.Type.A:
        return "Er is geen verhoogd funderingsrisico.";
      case FoundationRisk.Type.B:
        return "Er is een normaal voorkomend funderingsrisico. Er zijn indicaties van funderingsproblematiek, maar vooralsnog wordt voldaan aan de toetsingen voor funderingsschade.";
      case FoundationRisk.Type.C:
        return "Er is een licht verhoogd funderingsrisico. De toetsing voor funderingsschade geeft een aanleiding voor een licht verhoogd funderingsrisico.";
      case FoundationRisk.Type.D:
        return "Er is een verhoogd funderingsrisico. De toetsing voor funderingsschade wordt niet gehaald en geeft een aanleiding voor een verhoogd funderingsrisico.";
      case FoundationRisk.Type.E:
        return "Er is een verhoogd funderingsrisico. De toetsing voor funderingsschade wordt niet gehaald en geeft een aanleiding voor een sterk verhoogd funderingsrisico. Ook is de zakkingssnelheid van het pand hoger dan gemiddeld binnen de omgeving.";
      default:
        return FoundationRisk.Type[this.type];
    }
  }
}

export namespace FoundationRisk {
  /// <summary>
  /// Represents the foundation risk.
  /// </summary>
  export enum Type {
    /// <summary>
    /// Risk level A.
    /// </summary>
    A,

    /// <summary>
    /// Risk level B.
    /// </summary>
    B,

    /// <summary>
    /// Risk level C.
    /// </summary>
    C,

    /// <summary>
    /// Risk level D.
    /// </summary>
    D,

    /// <summary>
    /// Risk level E.
    /// </summary>
    E
  }
}
