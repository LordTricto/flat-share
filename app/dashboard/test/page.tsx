import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import House1 from "@/public/images/dashboard/my-ad/house-1.png";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const SliderSettings = {
	infinite: true,
	slidesToShow: 1,
	dots: true,
	autoplay: true,
	autoplaySpeed: 8000,
	slidesToScroll: 1,
	speed: 500,
	pauseOnHover: true,
};

function page() {
	return (
		<div>
			<Slider {...SliderSettings}>
				<div className="relative h-[286px] w-max" tabIndex={-1}>
					{" "}
					{/* Parent has position: relative */}
					<Image
						src={House1}
						alt="bedroom"
						fill={true}
						// Remove !relative, h-full, w-full from Image component
						// Use object-cover for how the image fits within the parent
						className="rounded-lg object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Recommended for performance
					/>
				</div>
				<div className="relative h-[286px] w-max" tabIndex={-1}>
					<Image
						src={House1}
						alt="bedroom"
						fill={true}
						className="rounded-lg object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
				<div className="relative h-[286px] w-max" tabIndex={-1}>
					<Image
						src={House1}
						alt="bedroom"
						fill={true}
						className="rounded-lg object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
				<div className="relative h-[286px] w-max" tabIndex={-1}>
					<Image
						src={House1}
						alt="bedroom"
						fill={true}
						className="rounded-lg object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
			</Slider>
		</div>
	);
}

export default page;
