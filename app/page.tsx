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
			<section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-between gap-12 px-4 2xs:px-8 md:flex-row lg:gap-0 lg:px-16">
				<div className="flex h-full w-full flex-col items-start justify-start gap-12 pt-36 md:max-w-xl md:pt-0">
					<div className="flex flex-col items-start justify-start gap-6">
						<div className="flex flex-col items-start justify-start gap-4">
							<div className="flex items-center justify-start gap-4">
								<Image src={lighteningIcon} alt="lightening" priority />
								<span className="text-sm font-medium uppercase text-black-tertiary">1% of the industry</span>
							</div>
							<p className="text-4xl font-black text-black xs:text-5xl lg:text-6xl">
								Find Your <span className="font-normal italic text-pink-500">Perfect</span>
								<br />
								Flatmate and <br />
								Home with Us
							</p>
						</div>
						<p className="text-base text-black-tertiary xs:text-lg lg:text-xl">
							Looking for a new flatmate or a place to call home? Our community makes it easy to find your perfect match.
						</p>
					</div>
					<div className="w-full sm:w-max">
						<CtaButton />
					</div>
				</div>
				<div className="flex h-full w-full items-center justify-center gap-4 pb-36 md:justify-end md:pb-0">
					<div>
						<Image className=" mt-10 md:hidden lg:block" src={heroImgTwo} alt="black woman smiling" width={190} height={562} priority />
					</div>
					<div>
						<Image src={heroImgOne} alt="black man smiling" width={301} height={562} priority />
					</div>
				</div>
			</section>
			<section className="relative min-h-screen w-full overflow-hidden">
				<Image className="left-0 top-0 w-screen scale-[1.1]" src={pageDivider} alt="divider with colors" priority />
				<div className="w-full bg-sky-blue">
					<div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-14 px-4 pb-16 pt-14 2xs:px-8 lg:px-16">
						<h1 className="text-2xl font-black text-black xs:text-3xl lg:text-4xl">How FlatShare Works</h1>

						<div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
							<div className="flex flex-col gap-5 rounded-2xl bg-white p-6">
								<div>
									<div className="w-max rounded-[10px] bg-white-grey p-3">
										<Image width={40} height={40} src={easyUseImg} alt="icon depicting easy use" priority />
									</div>
								</div>
								<div className="flex flex-col gap-4">
									<h3 className="text-sm font-semibold text-black sm:text-base">Easy to Use</h3>
									<p className="text-sm text-black-tertiary sm:text-base">
										FlatShare is designed to be simple and intuitive, so you can find your perfect flatmate and home with ease.
										With a few clicks, you&apos;re connecting with potential flatmates in no time.
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-5 rounded-2xl bg-white p-6">
								<div>
									<div className="w-max rounded-[10px] bg-white-grey p-3">
										<Image width={40} height={40} src={wideRangeImg} alt="icon depicting wide range" priority />
									</div>
								</div>
								<div className="flex flex-col gap-4">
									<h3 className="text-sm font-semibold text-black sm:text-base">Easy to Use</h3>
									<p className="text-sm text-black-tertiary sm:text-base">
										FlatShare is designed to be simple and intuitive, so you can find your perfect flatmate and home with ease.
										With a few clicks, you&apos;re connecting with potential flatmates in no time.
									</p>
								</div>
							</div>
							<div className="flex flex-col gap-5 rounded-2xl bg-white p-6">
								<div>
									<div className="w-max rounded-[10px] bg-white-grey p-3">
										<Image width={40} height={40} src={strongCommunityImg} alt="icon depicting strong community" priority />
									</div>
								</div>
								<div className="flex flex-col gap-4">
									<h3 className="text-sm font-semibold text-black sm:text-base">Easy to Use</h3>
									<p className="text-sm text-black-tertiary sm:text-base">
										FlatShare is designed to be simple and intuitive, so you can find your perfect flatmate and home with ease.
										With a few clicks, you&apos;re connecting with potential flatmates in no time.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-14 px-4 py-16 2xs:px-8 md:flex-row md:gap-8 lg:px-16">
					<div className="flex w-full items-center justify-center">
						<div className="w-max overflow-hidden rounded-[10px] md:w-full">
							<Image
								className="overflow-hidden !rounded-[10px]"
								width={560}
								height={560}
								src={homeImgOne}
								alt="two women smiling"
								priority
							/>
						</div>
					</div>
					<div className="flex w-full flex-col gap-10 md:max-w-lg">
						<div className="flex flex-col gap-4">
							<h3 className="text-xl font-black text-black xs:text-2xl lg:text-3xl">We are here to serve you</h3>
							<p className="text-sm text-black-tertiary sm:text-base">
								Our service have never been better, and we are always ready to improve, innovate and bring you the best.
							</p>
						</div>
						<div className="flex flex-col items-start justify-start gap-10">
							<div className="flex flex-row items-start justify-start gap-6">
								<div>
									<div className="w-max rounded-[10px] bg-white-grey p-2">
										<Image width={26} height={26} src={supportImg} alt="icon depicting customer support" priority />
									</div>
								</div>
								<div className="flex flex-col items-start justify-start gap-4">
									<h6 className="text-sm font-semibold sm:text-base">Customer Support</h6>
									<p className="text-xs text-black-tertiary sm:text-sm">
										We prioritize the satisfaction of our members above all else. That&apos;s why our support team is available
										online 24/7 to swiftly address any issues that may arise while using our system.
									</p>
								</div>
							</div>
							<div className="flex flex-row items-start justify-start gap-6">
								<div>
									<div className="w-max rounded-[10px] bg-white-grey p-2">
										<Image width={26} height={26} src={structureImg} alt="icon depicting best structure" priority />
									</div>
								</div>
								<div className="flex flex-col items-start justify-start gap-4">
									<h6 className="text-sm font-semibold sm:text-base">Best Structure</h6>
									<p className="text-xs text-black-tertiary sm:text-sm">
										From start to finish, our processes are designed to be as easy as possible, so you can focus on reaching your
										objectives without any unnecessary obstacles.
									</p>
								</div>
							</div>
							<div className="flex flex-row items-start justify-start gap-6">
								<div>
									<div className="w-max rounded-[10px] bg-white-grey p-2">
										<Image width={26} height={26} src={reliableImg} alt="icon depicting 100% reliability" priority />
									</div>
								</div>
								<div className="flex flex-col items-start justify-start gap-4">
									<h6 className="text-sm font-semibold sm:text-base">100% Reliable</h6>
									<p className="text-xs text-black-tertiary sm:text-sm">
										We employ strict measures to ensure we quickly detect unserious and unready members and we constantly carry
										out these processes to ensure we protect our integrity.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex w-full flex-row items-center justify-between bg-purple py-16">
					<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-4 text-center 2xs:px-8 md:text-left lg:px-16">
						<h3 className="text-xl font-black text-white xs:text-2xl lg:text-3xl">Subscribe to Our Newsletter</h3>
						<p className="w-full max-w-[600px] text-sm text-white sm:text-base">
							Don&apos;t miss out on the latest news and events in the FlatShare community! Subscribe to our newsletter for expert tips,
							new property listings, and useful information on shared living.
						</p>
						<div className="flex h-[46px] w-full max-w-xl flex-row overflow-hidden rounded-lg">
							<input
								className="z-10 h-full w-full !rounded-none px-4 py-3 text-black-secondary placeholder-black-quat focus:border-none focus:outline-none"
								type="text"
								placeholder="Your email address"
							/>
							<button className="w-max max-w-max whitespace-nowrap border-l border-black-tertiary bg-grey-secondary px-[18px] font-semibold capitalize outline-none focus:shadow-none focus:outline-none">
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
