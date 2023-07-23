import Button from "@/components/general/button/button";
import CtaButton from "@/components/landing/cta-button";
import Image from "next/image";
import connectWithCommunityImg from "@/public/images/home/connect-with-community.png";
// import {Inter} from "next/font/google";
// import easyUseImg from "@/public/images/home/easy-use.png";
import heroImgOne from "@/public/images/home/hero-1.png";
import heroImgTwo from "@/public/images/home/hero-2.png";
import homeImgOne from "@/public/images/home/home-1.png";
import howFlatShareWorksBG from "@/public/images/home/how-flatshare-works-bg.png";
import howFlatShareWorksImg from "@/public/images/home/how-flatshare-works-img.png";
import instantMessagingImg from "@/public/images/home/instant-messaging.png";
import lighteningIcon from "@/public/images/icons/lightening.svg";
import newsletterBG from "@/public/images/home/newsletter-bg.png";
import pageDivider from "@/public/images/general/page-divider.svg";
import personalizedRecommendationImg from "@/public/images/home/personalized-recommendation.png";
import reliableImg from "@/public/images/home/reliable.png";
// import strongCommunityImg from "@/public/images/home/strong-community.png";
import structureImg from "@/public/images/home/structure.png";
import supportImg from "@/public/images/home/support.png";

// import wideRangeImg from "@/public/images/home/wide-range.png";

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
				<Image className="left-0 top-0 z-0 w-screen scale-[1.1]" src={pageDivider} alt="divider with colors" priority />
				<Image className="absolute bottom-0 left-0 z-10 w-screen scale-[1.1]" src={pageDivider} alt="divider with colors" priority />

				<div className="relative w-full">
					<Image
						className="absolute left-0 top-0 z-0 h-full w-full"
						src={howFlatShareWorksBG}
						alt="how flatshare works background"
						priority
					/>
					<div className="relative z-20 mx-auto flex max-w-7xl flex-col items-center justify-between gap-14 px-4 py-16 2xs:px-8 xs:py-24 md:flex-row lg:px-16">
						<div className="flex w-full max-w-[477px] flex-col gap-10 md:min-w-[340px] lg:min-w-[477px]">
							<h1 className="text-2xl font-black text-black xs:text-3xl lg:text-4xl">How FlatShare Works</h1>
							<div className="flex w-full flex-col items-center justify-between gap-8">
								<div className="flex gap-4 2xs:gap-6">
									<div>
										<div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-grey-tertiary bg-white p-3 2xs:w-12 xs:h-12">
											<span className="text-xs font-semibold text-black sm:text-sm">1</span>
										</div>
									</div>
									<div className="flex flex-col gap-2">
										<h3 className="text-lg font-semibold !leading-[100%] text-black sm:text-xl">Create Account</h3>
										<p className="text-sm text-black-tertiary sm:text-base">
											Sign up and create an account with your email and password in a few steps.
										</p>
									</div>
								</div>
								<div className="flex gap-4 2xs:gap-6">
									<div>
										<div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-grey-tertiary bg-white p-3 2xs:w-12 xs:h-12">
											<span className="text-xs font-semibold text-black sm:text-sm">2</span>
										</div>
									</div>
									<div className="flex flex-col gap-2">
										<h3 className="text-lg font-semibold !leading-[100%] text-black sm:text-xl">Browse Community</h3>
										<p className="text-sm text-black-tertiary sm:text-base">
											Browse potential flatmates who align with your budget and preferences.
										</p>
									</div>
								</div>
								<div className="flex gap-4 2xs:gap-6">
									<div>
										<div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-grey-tertiary bg-white p-3 2xs:w-12 xs:h-12">
											<span className="text-xs font-semibold text-black sm:text-sm">3</span>
										</div>
									</div>
									<div className="flex flex-col gap-2">
										<h3 className="text-lg font-semibold !leading-[100%] text-black sm:text-xl">Connect with Flatmate</h3>
										<p className="text-sm text-black-tertiary sm:text-base">
											Connect with preferred flatmates and get the most out of FlatShare.
										</p>
									</div>
								</div>
							</div>
							<div className="w-full sm:w-max">
								<CtaButton text="Get started for free" color="black" />
							</div>
						</div>
						<div>
							<Image className="" src={howFlatShareWorksImg} alt="how flatshare works" priority />
						</div>
					</div>
				</div>
				<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-14 px-4 py-16 2xs:px-8 xs:py-24 md:flex-row md:gap-8 lg:px-16">
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
								<div className="flex flex-col items-start justify-start gap-2">
									<h6 className="text-sm font-semibold !leading-[100%] sm:text-base">Customer Support</h6>
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
								<div className="flex flex-col items-start justify-start gap-2">
									<h6 className="text-sm font-semibold !leading-[100%] sm:text-base">Best Structure</h6>
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
								<div className="flex flex-col items-start justify-start gap-2">
									<h6 className="text-sm font-semibold !leading-[100%] sm:text-base">100% Reliable</h6>
									<p className="text-xs text-black-tertiary sm:text-sm">
										We employ strict measures to ensure we quickly detect unserious and unready members and we constantly carry
										out these processes to ensure we protect our integrity.
									</p>
								</div>
							</div>
						</div>
						<div className="w-full sm:w-max">
							<CtaButton />
						</div>
					</div>
				</div>
				<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-14 px-4 py-16 2xs:px-8 xs:py-24 md:flex-row md:gap-8 lg:px-16">
					<div className="flex w-full flex-col gap-10 md:max-w-lg">
						<div className="flex flex-col gap-4">
							<h3 className="text-4xl font-black text-black xs:text-5xl lg:text-6xl">
								Connect with <span className="font-normal italic text-pink-500">thousands</span> on our community
							</h3>
							<p className="text-base text-black-tertiary xs:text-lg lg:text-xl">
								Join a vibrant community connect with numerous Individuals who align with your Interests.
							</p>
						</div>
					</div>
					<div className="flex w-full items-center justify-center">
						<div className="w-max overflow-hidden rounded-[10px] md:w-full">
							<Image
								// className="overflow-hidden !rounded-[10px]"
								src={connectWithCommunityImg}
								alt="depicting community"
								priority
							/>
						</div>
					</div>
				</div>
				<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-start gap-8 px-4 py-16 2xs:px-8 xs:py-24 md:gap-16 lg:px-16">
					<div className="flex flex-col items-center justify-center gap-6">
						<h4 className="text-2xl font-black !leading-[100%] text-black xs:text-3xl lg:text-4xl">Perfect Matches for Everyone</h4>
						<p className="text-base !leading-[100%] text-black-tertiary xs:text-lg lg:text-xl">
							View recommended profiles of flatmates and chat with your matches online!
						</p>
					</div>
					<div className="grid grid-cols-1 gap-10 2xs:grid-cols-2">
						<div className="flex flex-col items-center justify-start rounded-2xl bg-[#C2E8FF] px-4 pb-28 pt-20 2xs:px-16">
							<Image src={personalizedRecommendationImg} width={400} height={427} alt="black man smiling" priority />
							<div className="flex flex-col items-center justify-center gap-8">
								<h3 className="text-center text-xl font-black !leading-[100%] text-black xs:text-2xl lg:text-3xl">
									Personalized Recommendation
								</h3>
								<p className="text-center text-sm text-black-tertiary xs:text-base lg:text-lg">
									Discover potential flatmates who perfectly align with your lifestyle, interests, and preferences through our
									advanced flatmate recommendation system.
								</p>
							</div>
						</div>
						<div className="flex flex-col items-center justify-start rounded-2xl bg-[#BDC7F5] px-4 pb-28 pt-20 2xs:px-16">
							<Image src={instantMessagingImg} width={400} height={427} alt="black man smiling" priority />
							<div className="flex flex-col items-center justify-center gap-8">
								<h3 className="text-center text-xl font-black !leading-[100%] text-black xs:text-2xl lg:text-3xl">
									<span>Instant</span>
									<br />
									<span>Messaging</span>
								</h3>
								<p className="text-center text-sm text-black-tertiary xs:text-base lg:text-lg">
									Enjoy real-time communication and quick exchanges with potential flatmates through our convenient instant
									messaging features.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="relative flex w-full flex-row items-center justify-between py-16">
					<Image className="absolute left-0 top-0 z-0 h-full w-full" src={newsletterBG} alt="Newsletter background" priority />
					<div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-4 text-center 2xs:px-8 md:text-left lg:px-16">
						<h3 className="text-xl font-black text-white xs:text-2xl lg:text-3xl">Subscribe to Our Newsletter</h3>
						<p className="w-full max-w-[600px] text-center text-sm text-white sm:text-base">
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
								<span className="leading-[100%]">submit</span>
							</button>
						</div>
					</div>
				</div>
			</section>
			<section></section>
		</main>
	);
}
