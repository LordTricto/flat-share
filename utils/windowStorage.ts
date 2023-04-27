function storageAvailable(type: "localStorage" | "sessionStorage"): boolean {
	let storage;
	try {
		storage = window[type];
		const x = "__storage_test__";
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return false;
	}
}

export const isStorageAvailable = storageAvailable("localStorage");
