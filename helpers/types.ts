import {StaticImageData} from "next/image";

export type GenericObject = Record<string, unknown>;

export type ClassConstructor<T> = new (...args: unknown[]) => T;

export type DropdownItemValueType = number | string | null | boolean;

export interface DropdownItem<T extends DropdownItemValueType> {
	value: T;
	text: string;
	icon?: StaticImageData;
	subtext?: string;
}
