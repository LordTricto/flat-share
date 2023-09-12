export const canShowPreReleaseFeatures =
	process.env.NODE_ENV === "development" || !!Number(process.env.NEXT_PUBLIC_ENABLE_PRE_RELEASE_FEATURES) || false;
