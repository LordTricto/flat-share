import PropertyImage from "@/models/property-image";

export type MyADResponse = {
	apartment_type: string;
	rooms_no: number;
	bathrooms_no: number;
	toilets_no: number;
	rent_cost: string;
	payment_frequency: string;
	rent_contribution: string;
	host_hunter_contribution: number;
	monthly_rent_charge: string;
	description: string;
	house_state: string;
	house_city: string;
	house_street_address: string;
	house_full_address: string;
	house_rules: string[];
	features: string[];
	interests: string[];
	property_images: PropertyImage[];

	property_image_1: string;
	property_image_1_thumb: string;
	property_image_2: string;
	property_image_2_thumb: string;
	property_image_3: string;
	property_image_3_thumb: string;
	property_image_4: string;
	property_image_4_thumb: string;
	property_image_5: string;
	property_image_5_thumb: string;
	property_image_6: string;
	property_image_6_thumb: string;
};
