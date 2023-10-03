import { ItemProps } from "./ItemProps";

export function normalUpdate(props: ItemProps): ItemProps {
    return update({ qualityIncrementalUnit: normalQualityIncrementalUnit(props.sellIn), ...props });
}

export function backStageUpdate(props: ItemProps): ItemProps {
    let qualityIncrementalUnit = -props.quality;
    if (props.sellIn > 10) qualityIncrementalUnit = 1;
    else if (props.sellIn > 5) qualityIncrementalUnit = 2;
    else if (props.sellIn > 0) qualityIncrementalUnit = 3;
    return update({ qualityIncrementalUnit, ...props });
}

export function agedBrieUpdate(props: ItemProps): ItemProps {
    return update({ qualityIncrementalUnit: -normalQualityIncrementalUnit(props.sellIn), ...props });
}

export function sulfurasUpdate(sellIn: number): ItemProps {
    const LegendaryUnchangeableQuality = 80;
    return {
        quality: LegendaryUnchangeableQuality,
        sellIn: sellIn
    };
}

const normalQualityIncrementalUnit = (sellIn: number) => sellIn <= 0 ? -2 : -1;

function update(props: { qualityIncrementalUnit: number; } & ItemProps): ItemProps {
    return {
        quality: normalizedQuality(props.quality + props.qualityIncrementalUnit),
        sellIn: props.sellIn - 1
    };
}

function normalizedQuality(quality: number) {
    const MaxAllowedQuality = 50;
    const MinAllowedQuality = 0;
    return quality >= MaxAllowedQuality ? MaxAllowedQuality : Math.max(quality, MinAllowedQuality);
}