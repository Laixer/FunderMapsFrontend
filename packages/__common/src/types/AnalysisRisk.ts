import { FoundationRisk } from "../types/FoundationRisk";
import { FoundationType } from "../types/FoundationType";
import { Reliability } from "../types/Reliability";

export class AnalysisRisk {
  neighborhoodId: string;
  foundationType: FoundationType;
  foundationRisk: FoundationRisk;
  restorationCosts: number;
  dewateringDepth: number;
  drystand: number;
  reliability: Reliability;

  constructor(
    neighborhoodId: string,
    foundationType: FoundationType,
    foundationRisk: FoundationRisk,
    restorationCosts: number,
    dewateringDepth: number,
    drystand: number,
    reliability: Reliability
  ) {
    this.neighborhoodId = neighborhoodId;
    this.foundationType = foundationType;
    this.foundationRisk = foundationRisk;
    this.restorationCosts = restorationCosts;
    this.dewateringDepth = dewateringDepth;
    this.drystand = drystand;
    this.reliability = reliability;
  }

  get labelColor(): string {
    switch (this.foundationRisk.type) {
      case FoundationRisk.Type.A:
        return "#2bb02b";
      case FoundationRisk.Type.B:
        return "#b0a22b";
      case FoundationRisk.Type.C:
        return "#b0832b";
      case FoundationRisk.Type.D:
        return "#b05f2b";
      case FoundationRisk.Type.E:
        return "#b02b2b";
      default:
        return "#606976";
    }
  }
}
