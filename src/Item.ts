import { ItemNames } from ".";
import { ItemProps } from "./core/ItemProps";
import { IUpdateCalculator, AgedBrieUpdateCalculator, BackStageUpdateCalculator, SulfurasUpdateCalculator, NormalUpdateCalculator } from "./core/classStyle";
import { agedBrieUpdate, backStageUpdate, sulfurasUpdate, normalUpdate } from "./core/functionStyle";

export class Item implements ItemProps {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    updateClassStyle() {
        const newItem = this.getUpdateCalculator()
        this.quality = newItem.getUpdatedQuality()
        this.sellIn = newItem.getUpdatedSellIn()
    }

    updateFunctionalStyle() {
        const newItem = this.getUpdatedProps();
        this.quality = newItem.quality;
        this.sellIn = newItem.sellIn;
    }

    private getUpdatedProps(): ItemProps {
        switch (this.name) {
            case ItemNames.AgedBrie:
                return agedBrieUpdate({ ...this });
            case ItemNames.BackStage:
                return backStageUpdate({ ...this });
            case ItemNames.Sulfuras:
                return sulfurasUpdate(this.sellIn);
            default:
                return normalUpdate({ ...this });
        }
    }

    private getUpdateCalculator(): IUpdateCalculator {
        switch (this.name) {
            case ItemNames.AgedBrie:
                return new AgedBrieUpdateCalculator({ ...this });
            case ItemNames.BackStage:
                return new BackStageUpdateCalculator({ ...this });
            case ItemNames.Sulfuras:
                return new SulfurasUpdateCalculator(this.sellIn);
            default:
                return new NormalUpdateCalculator({ ...this });
        }
    }
}