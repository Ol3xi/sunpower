import { preliminaryEstimateConfig } from "../config/estimate";
import type { ConsumptionBand } from "./quote";

export type QuoteEstimate = {
  isDemo: boolean;
  label: string;
  disclaimer: string;
  shortConfiguration: string;
  configuration: string;
  production: string;
  savings: string;
};

export function getPreliminaryEstimate(
  consumptionBand: ConsumptionBand,
): QuoteEstimate {
  return {
    isDemo: preliminaryEstimateConfig.isDemo,
    label: preliminaryEstimateConfig.label,
    disclaimer: preliminaryEstimateConfig.disclaimer,
    ...preliminaryEstimateConfig.scenarios[consumptionBand],
  };
}
