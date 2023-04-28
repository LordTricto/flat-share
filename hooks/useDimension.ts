"use client";

import {useEffect, useState} from "react";

function getWindowDimensions() {
	let width: number = 0;
	let height: number = 0;

	if (typeof window !== "undefined") {
		/* we're not on the server */
		const {innerWidth, innerHeight} = window;
		width = innerWidth;
		height = innerHeight;
	}

	return {
		width,
		height,
	};
}

const useDimension = (): {width: number; height: number} => {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
};

export default useDimension;
