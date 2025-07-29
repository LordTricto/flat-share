import {GenericObject} from "@/helpers/types";
import {MyADResponse} from "./my-ad.constants";
import Parsers from "@/utils/parsers";
import PropertyImage from "@/models/property-image";
import {getAbortControllerSignal} from "@/helpers/request/abortControllers";
import {makeGetRequestWithSignal} from "@/helpers/request/makeRequest";
import store from "@/redux/store";

export enum myAdSignal {
	MY_AD = "user.my-ad",
}

export const myAdApi = async (): Promise<MyADResponse> => {
	const signal = getAbortControllerSignal(myAdSignal.MY_AD);

	const res = await makeGetRequestWithSignal(`user/load/host/property/details/${store.getState().init?.user?.codec || ""}`, signal);
	if (res instanceof Error) {
		throw res;
	}

	return {
		apartment_type: Parsers.string((res.data as GenericObject).apartment_type),
		rooms_no: Parsers.number((res.data as GenericObject).rooms_no),
		bathrooms_no: Parsers.number((res.data as GenericObject).bathrooms_no),
		toilets_no: Parsers.number((res.data as GenericObject).toilets_no),
		rent_cost: Parsers.string((res.data as GenericObject).rent_cost),
		payment_frequency: Parsers.string((res.data as GenericObject).payment_frequency),
		rent_contribution: Parsers.string((res.data as GenericObject).rent_contribution),
		host_hunter_contribution: Parsers.number((res.data as GenericObject).host_hunter_contribution),
		monthly_rent_charge: Parsers.string((res.data as GenericObject).monthly_rent_charge),
		description: Parsers.string((res.data as GenericObject).description),
		house_state: Parsers.string((res.data as GenericObject).house_state),
		house_city: Parsers.string((res.data as GenericObject).house_city),
		house_street_address: Parsers.string((res.data as GenericObject).house_street_address),
		house_full_address: Parsers.string((res.data as GenericObject).house_full_address),
		house_rules: Parsers.stringArray((res.data as GenericObject).house_rules),
		features: Parsers.stringArray((res.data as GenericObject).features),
		interests: Parsers.stringArray((res.data as GenericObject).interests),
		property_images: Parsers.classObjectArray((res.data as GenericObject).property_images, PropertyImage),
		property_image_1: Parsers.string((res.data as GenericObject).property_image_1),
		property_image_1_thumb: Parsers.string((res.data as GenericObject).property_image_1_thumb),
		property_image_2: Parsers.string((res.data as GenericObject).property_image_2),
		property_image_2_thumb: Parsers.string((res.data as GenericObject).property_image_2_thumb),
		property_image_3: Parsers.string((res.data as GenericObject).property_image_3),
		property_image_3_thumb: Parsers.string((res.data as GenericObject).property_image_3_thumb),
		property_image_4: Parsers.string((res.data as GenericObject).property_image_4),
		property_image_4_thumb: Parsers.string((res.data as GenericObject).property_image_4_thumb),
		property_image_5: Parsers.string((res.data as GenericObject).property_image_5),
		property_image_5_thumb: Parsers.string((res.data as GenericObject).property_image_5_thumb),
		property_image_6: Parsers.string((res.data as GenericObject).property_image_6),
		property_image_6_thumb: Parsers.string((res.data as GenericObject).property_image_6_thumb),
	};
};
