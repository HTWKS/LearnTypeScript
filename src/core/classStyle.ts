import { ItemProps } from "./ItemProps";

export interface IUpdateCalculator {
    getUpdatedQuality(): number;
    getUpdatedSellIn(): number;
}

abstract class UpdateCalculatorTemplate implements IUpdateCalculator {
    private readonly MaxAllowedQuality = 50;
    private readonly MinAllowedQuality = 0;

    constructor(protected readonly props: ItemProps) { }

    getUpdatedQuality(): number {
        return this.normalizedQuality(this.props.quality + this.getQualityIncrementalUnit());
    }

    getUpdatedSellIn(): number {
        return this.props.sellIn - 1;
    }

    protected abstract getQualityIncrementalUnit(): number;

    private normalizedQuality(quality: number) {
        return quality >= this.MaxAllowedQuality ? this.MaxAllowedQuality : Math.max(quality, this.MinAllowedQuality);
    }
}
export class NormalUpdateCalculator extends UpdateCalculatorTemplate {
    getQualityIncrementalUnit(): number {
        return this.props.sellIn <= 0 ? -2 : -1;
    }
}
export class BackStageUpdateCalculator extends UpdateCalculatorTemplate {
    protected getQualityIncrementalUnit(): number {
        if (this.props.sellIn > 10) {
            return 1;
        }
        if (this.props.sellIn > 5) {
            return 2;
        }
        if (this.props.sellIn > 0) {
            return 3;
        }
        return -this.props.quality;
    }
}
export class SulfurasUpdateCalculator implements IUpdateCalculator {
    private readonly LegendaryUnchangeableQuality = 80;

    constructor(private readonly currentSellIn: number) {
    }
    getUpdatedQuality(): number {
        return this.LegendaryUnchangeableQuality;
    }
    getUpdatedSellIn(): number {
        return this.currentSellIn;
    }
}
export class AgedBrieUpdateCalculator extends UpdateCalculatorTemplate {
    protected getQualityIncrementalUnit(): number {
        return -new NormalUpdateCalculator(this.props).getQualityIncrementalUnit();
    }
}
