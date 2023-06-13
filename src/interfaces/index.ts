import { IFullCard } from "../data/cardOptions";
import { SuitEnum } from "../util/enums";

export interface ICard {
    name: string;
    value: string;
    suit: SuitEnum;
}

export type DeckType = IFullCard[];