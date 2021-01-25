<template>
  <div
    class="RiskLabel"
    :style="{ background: risk.labelColor }"
    :class="{
      'RiskLabel--submit': isSubmit,
      'RiskLabel--wide': wide,
      'RiskLabel--ghost': ghost,
      'RiskLabel--line': line
    }"
  >
    <div class="RiskLabel__Banner" :style="{ background: risk.labelColor }">
      <div class="RiskLabel__Title">Funderingsrisico</div>
      <div class="RiskLabel__Label" :style="{ background: risk.labelColor }">
        <span>{{ risk.foundationRisk.translate }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { AnalysisRisk } from "@fundermaps/common";
import { defineComponent } from "vue";

export default defineComponent({
  name: "RiskLabel",
  props: {
    // The analysis risk to display
    risk: {
      type: AnalysisRisk,
      required: true
    },
    // A ghost button has no fill or border
    ghost: {
      type: Boolean,
      default: false
    },
    // A line button only shows a border in normal view. Fill shows in states
    line: {
      type: Boolean,
      default: false
    },
    // The button takes up full width if true
    wide: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style lang="scss">
$active: adjust-color($VENDOR_PRIMARY_COLOR, $red: 120, $green: 91, $blue: 0);
$hover: adjust-color($VENDOR_PRIMARY_COLOR, $red: -7, $green: -19, $blue: -58);

.RiskLabel {
  width: 250px;
  margin-bottom: 15px;
  position: relative;
  padding: 15px 27px 16px;
  border-radius: 4px;
  user-select: none;
  color: white;

  &__Banner {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
  }

  &__Title {
    font-size: 18px;
    line-height: 1.25;
    padding: 0;
    margin: 0;
    font-weight: bold;
  }

  &__Label {
    position: absolute;
    right: -20px;
    font-size: 40px;
    font-weight: bold;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    user-select: none;

    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .SvgIcon {
    font-size: 14px;

    &:last-child {
      margin-left: 15px;
    }
    &:first-child {
      margin-right: 15px;
    }
  }
}
</style>
