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

  private formatter = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2
  });

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

  get formattedRestorationCosts(): string {
    return this.formatter.format(this.restorationCosts);
  }

  get propertyDescription(): string | null {
    if (this.foundationType.isPile()) {
      if (this.drystand !== null) {
        if (this.drystand > 0) {
          return `Er komt regelmatig een droogstand van de fundering voor. De grondwaterstand staat ca. <strong>${Math.abs(
            this.drystand
          ).toFixed(
            2
          )}</strong> meter lager dan het hoogstgelegen funderingshout. Dat kan schimmelaantasting aan de houten paalfundering veroorzaken dat tot funderingsschade kan leiden.`;
        } else {
          return `Er komt geen droogstand van de fundering voor. De grondwaterstand staat ca. <strong>${Math.abs(
            this.drystand
          ).toFixed(
            2
          )} meter</strong> hoger dan het hoogstgelegen funderingshout. Dat is gunstig voor het behoud van de fundering.`;
        }
      }
    } else {
      if (this.dewateringDepth !== null) {
        if (this.dewateringDepth > 0) {
          return `Er komt regelmatig een ontwateringsdiepte van de fundering voor. De grondwaterstand staat ca. <strong>${Math.abs(
            this.dewateringDepth
          ).toFixed(
            2
          )} meter</strong> te hoog en komt daarmee dicht in de buurt van de fundering. Dat kan schadelijk voor het pand zijn.`;
        } else {
          return `Er is doorgaans voldoende ontwateringsdiepte van de fundering. De grondwaterstand staat met een marge van ca. <strong>${Math.abs(
            this.dewateringDepth
          ).toFixed(2)} meter</strong> dieper dan de veilige zone.`;
        }
      }
    }
    return null;
  }

  get restorationCostDescription(): string | null {
    if ([FoundationRisk.Type.C, FoundationRisk.Type.D, FoundationRisk.Type.E].includes(this.foundationRisk.type)) {
      return `Het pand heeft een verhoogd risico op funderingsproblematiek. Indien funderingsherstel noodzakelijk blijkt zijn de indicatieve funderingsherstelkosten geraamd op: <strong>${this.formattedRestorationCosts}</strong>.`;
    }
    return null;
  }
}
