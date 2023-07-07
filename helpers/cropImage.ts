/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} imageSrc - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */

import {Area} from "react-easy-crop/types";

const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});

function getRadianAngle(degreeValue: number) {
	return (degreeValue * Math.PI) / 180;
}

export default async function getCroppedImg(imageSrc: string, pixelCrop: Area, rotation = 0) {
	const image = await createImage(imageSrc);
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d")!;

	const maxSize = Math.max(image.width, image.height);
	const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

	// set each dimensions to double largest dimension to allow for a safe area for the
	// image to rotate in without being clipped by canvas context
	canvas.width = safeArea;
	canvas.height = safeArea;

	// translate canvas context to a central location on image to allow rotating around the center.
	ctx.translate(safeArea / 2, safeArea / 2);
	ctx.rotate(getRadianAngle(rotation));
	ctx.translate(-safeArea / 2, -safeArea / 2);

	// draw rotated image and store data.
	ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);

	const data = ctx.getImageData(0, 0, safeArea, safeArea);

	// set canvas width to final desired crop size - this will clear existing context
	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;

	// paste generated rotate image with correct offsets for x,y crop values.
	ctx.putImageData(data, 0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x, 0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y);

	// As Base64 string
	// return canvas.toDataURL("image/jpeg");
	return canvas;
}

export function getBlobFromCanvas(canvas: HTMLCanvasElement): Blob {
	const dataURI = canvas.toDataURL("image/png");
	// convert base64/URLEncoded data component to raw binary data held in a string
	let byteString;
	if (dataURI.split(",")[0].indexOf("base64") >= 0) {
		byteString = atob(dataURI.split(",")[1]);
	} else {
		byteString = unescape(dataURI.split(",")[1]);
	}

	// write the bytes of the string to a typed array
	const ia = new Uint8Array(byteString.length);
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	return new Blob([ia], {type: "image/png"});
}

export const generateCroppedImage = async (imageSrc: string, crop: Area): Promise<Blob | null> => {
	if (!crop || !imageSrc) {
		return null;
	}

	const canvas = await getCroppedImg(imageSrc, crop);

	return getBlobFromCanvas(canvas);
};

export const blobToString = (blob: Blob): string => {
	return window.URL && window.URL.createObjectURL ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
};

export const cropImage = (imageSrc: string, crop: Area): string => {
	let blobString = "";
	generateCroppedImage(imageSrc, crop).then((blob) => {
		if (blob) {
			blobString = window.URL && window.URL.createObjectURL ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
		}
	});

	return blobString;
};

export const generateDownload = async (imageSrc: string, crop: Area) => {
	if (!crop || !imageSrc) {
		return;
	}

	const canvas = await getCroppedImg(imageSrc, crop);

	canvas.toBlob(
		(blob) => {
			if (blob) {
				const previewUrl = window.URL.createObjectURL(blob);
				const anchor = document.createElement("a");
				anchor.download = "image.jpeg";
				anchor.href = URL.createObjectURL(blob);
				anchor.click();
				window.URL.revokeObjectURL(previewUrl);
			}
		},
		"image/jpeg",
		0.66
	);
};

export const generateCroppedImageToBase64 = async (imageSrc: string, crop: Area): Promise<string | ArrayBuffer | null> => {
	if (!crop || !imageSrc) {
		return null;
	}

	const canvas = await getCroppedImg(imageSrc, crop);

	const blobFile = getBlobFromCanvas(canvas);

	return blobToBase64(blobFile);
};

function blobToBase64(blob: Blob): Promise<string | ArrayBuffer | null> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}
