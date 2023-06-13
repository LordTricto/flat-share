"use client";
import React from "react";

interface OverlayProps {
	onClick(e: React.MouseEvent): void;
}

function Overlay({onClick}: OverlayProps): JSX.Element {
	return <div className="backdrop fixed z-40 h-screen w-screen " onClick={onClick} />;
}

export default Overlay;
