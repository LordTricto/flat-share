import CtaButton from "@/components/landing/cta-button";
import Image from "next/image";
import {Inter} from "next/font/google";
import easyUseImg from "@/public/images/home/easy-use.png";
import heroImgOne from "@/public/images/home/hero-1.png";
import heroImgTwo from "@/public/images/home/hero-2.png";
import homeImgOne from "@/public/images/home/home-1.png";
import lighteningIcon from "@/public/images/icons/lightening.svg";
import pageDivider from "@/public/images/general/page-divider.svg";
import reliableImg from "@/public/images/home/reliable.png";
import strongCommunityImg from "@/public/images/home/strong-community.png";
import structureImg from "@/public/images/home/structure.png";
import supportImg from "@/public/images/home/support.png";
import wideRangeImg from "@/public/images/home/wide-range.png";

export default function Home() {
	return (
		<main className="flex min-h-screen w-full flex-col items-center justify-between">
			<section className="flex flex-col md:flex-row justify-between items-center min-h-screen w-full max-w-7xl mx-auto gap-12 lg:gap-0 px-4 2xs:px-8 lg:px-16">
				<div className="flex flex-col justify-start items-start h-full w-full md:max-w-xl gap-12 pt-36 md:pt-0">
					<div className="flex flex-col justify-start items-start gap-6">
						<div className="flex flex-col justify-start items-start gap-4">
							<div className="flex justify-start items-center gap-4">
								<Image src={lighteningIcon} alt="lightening" priority />
								<span className="text-sm text-black-tertiary font-medium uppercase">1% of the industry</span>
							</div>
							<p className="text-4xl xs:text-5xl lg:text-6xl text-black font-black">
								Find Your <span className="text-pink-500 font-normal italic">Perfect</span>
								<br />
								Flatmate and <br />
								Home with Us
							</p>
						</div>
						<p className="text-base xs:text-lg lg:text-xl text-black-tertiary">
							Looking for a new flatmate or a place to call home? Our community makes it easy to find your perfect match.
						</p>
					</div>
					<div className="w-full sm:w-max">
						<CtaButton />
					</div>
				</div>
				<div className="flex justify-center md:justify-end items-center gap-4 h-full w-full pb-36 md:pb-0">
					<div>
						<Image className=" md:hidden lg:block mt-10" src={heroImgTwo} alt="black woman smiling" width={190} height={562} priority />
					</div>
					<div>
						<Image src={heroImgOne} alt="black man smiling" width={301} height={562} priority />
					</div>
				</div>
			</section>
			<section className="relative min-h-screen w-full">
				<Image className="top-0 left-0 w-full" src={pageDivider} alt="divider with colors" priority />
				<div className="w-full bg-sky-blue">
					<div className="flex flex-col justify-center items-center gap-14 pt-14 pb-16 max-w-7xl mx-auto px-4 2xs:px-8 lg:px-16">
						<h1 className="text-2xl xs:text-3xl lg:text-4xl text-black font-black">How FlatShare Works</h1>

						<div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full">
							<div className="flex flex-col gap-5 p-6 bg-white rounded-2xl">
								<div>
									<div className="p-3 w-max rounded-[10px] bg-white-grey">
										<Image width={40} height={40} src={easyUseImg} alt="icon depicting easy use" priority />
									</div>
								</div>
								<div className="flex flex-col gap-4">
									<h3 className="text-sm sm:text-base text-black font-semibold">Easy to Use</h3>
									<p className="text-sm sm:text-base text-black-tertiary">
										FlatShare is designed to be simple and intuitive, so you can find your perfect flatmate and home with ease.
										With a few clicks, you&apos;re connecting with potential flatmates in no time.
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-5 p-6 bg-white rounded-2xl">
								<div>
									<div className="p-3 w-max rounded-[10px] bg-white-grey">
										<Image width={40} height={40} src={wideRangeImg} alt="icon depicting wide range" priority />
									</div>
								</div>
								<div className="flex flex-col gap-4">
									<h3 className="text-sm sm:text-base text-black font-semibold">Easy to Use</h3>
									<p className="text-sm sm:text-base text-black-tertiary">
										FlatShare is designed to be simple and intuitive, so you can find your perfect flatmate and home with ease.
										With a few clicks, you&apos;re connecting with potential flatmates in no time.
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-5 p-6 bg-white rounded-2xl">
								<div>
									<div className="p-3 w-max rounded-[10px] bg-white-grey">
										<Image width={40} height={40} src={strongCommunityImg} alt="icon depicting strong community" priority />
									</div>
								</div>
								<div className="flex flex-col gap-4">
									<h3 className="text-sm sm:text-base text-black font-semibold">Easy to Use</h3>
									<p className="text-sm sm:text-base text-black-tertiary">
										FlatShare is designed to be simple and intuitive, so you can find your perfect flatmate and home with ease.
										With a few clicks, you&apos;re connecting with potential flatmates in no time.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col md:flex-row justify-between items-center gap-14 md:gap-8 w-full py-16 max-w-7xl mx-auto px-4 2xs:px-8 lg:px-16">
					<div className="flex justify-center items-center w-full">
						<div className="rounded-[10px] overflow-hidden w-max md:w-full">
							<Image width={560} height={560} src={homeImgOne} alt="two women smiling" priority />
						</div>
					</div>
					<div className="flex flex-col gap-10 w-full md:max-w-lg">
						<div className="flex flex-col gap-4">
							<h3 className="text-xl xs:text-2xl lg:text-3xl text-black font-black">We are here to serve you</h3>
							<p className="text-sm sm:text-base text-black-tertiary">
								Our service have never been better, and we are always ready to improve, innovate and bring you the best.
							</p>
						</div>
						<div className="flex flex-col justify-start items-start gap-10">
							<div className="flex flex-row justify-start items-start gap-6">
								<div>
									<div className="p-2 w-max rounded-[10px] bg-white-grey">
										<Image width={26} height={26} src={supportImg} alt="icon depicting customer support" priority />
									</div>
								</div>
								<div className="flex flex-col justify-start items-start gap-4">
									<h6 className="text-sm sm:text-base font-semibold">Customer Support</h6>
									<p className="text-xs sm:text-sm text-black-tertiary">
										We prioritize the satisfaction of our members above all else. That&apos;s why our support team is available
										online 24/7 to swiftly address any issues that may arise while using our system.
									</p>
								</div>
							</div>
							<div className="flex flex-row justify-start items-start gap-6">
								<div>
									<div className="p-2 w-max rounded-[10px] bg-white-grey">
										<Image width={26} height={26} src={structureImg} alt="icon depicting best structure" priority />
									</div>
								</div>
								<div className="flex flex-col justify-start items-start gap-4">
									<h6 className="text-sm sm:text-base font-semibold">Best Structure</h6>
									<p className="text-xs sm:text-sm text-black-tertiary">
										From start to finish, our processes are designed to be as easy as possible, so you can focus on reaching your
										objectives without any unnecessary obstacles.
									</p>
								</div>
							</div>
							<div className="flex flex-row justify-start items-start gap-6">
								<div>
									<div className="p-2 w-max rounded-[10px] bg-white-grey">
										<Image width={26} height={26} src={reliableImg} alt="icon depicting 100% reliability" priority />
									</div>
								</div>
								<div className="flex flex-col justify-start items-start gap-4">
									<h6 className="text-sm sm:text-base font-semibold">100% Reliable</h6>
									<p className="text-xs sm:text-sm text-black-tertiary">
										We employ strict measures to ensure we quickly detect unserious and unready members and we constantly carry
										out these processes to ensure we protect our integrity.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-row justify-between items-center w-full py-16 bg-purple">
					<div className="flex flex-col justify-center items-center gap-8 w-full max-w-7xl mx-auto px-4 2xs:px-8 lg:px-16 text-center md:text-left">
						<h3 className="text-xl xs:text-2xl lg:text-3xl text-white font-black">Subscribe to Our Newsletter</h3>
						<p className="text-sm sm:text-base text-white w-full max-w-[600px]">
							Don&apos;t miss out on the latest news and events in the FlatShare community! Subscribe to our newsletter for expert tips,
							new property listings, and useful information on shared living.
						</p>
						<div className="flex flex-row h-[46px] w-full max-w-xl rounded-lg overflow-hidden">
							<input
								className="py-3 px-4 h-full w-full z-10 placeholder-black-quat focus:outline-none focus:border-none text-black-secondary"
								type="text"
								placeholder="Your email address"
							/>
							<button className="border-black-tertiary border-l px-[18px] max-w-max w-max whitespace-nowrap capitalize font-semibold outline-none focus:outline-none focus:shadow-none bg-grey-secondary">
								submit
							</button>
						</div>
					</div>
				</div>
			</section>
			<section></section>
		</main>
	);
}
