"use client";

import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {UserActivationStatus, UserType} from "@/models/user.constant";

import AccountDropdown from "@/components/dashboard/layout/account-dropdown";
import Button from "@/components/general/button/button";
import Cancel from "@/components/jsx-icons/cancel";
import HamburgerOpen from "@/components/jsx-icons/hamburger-open";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
// import {Inter} from "next/font/google";
import Link from "next/link";
import LoadingScreen from "@/components/dashboard/general/loading-screen";
// import Logout from "@/components/jsx-icons/logout";
import MenuItem from "@/components/dashboard/layout/menuItem";
import Notification from "@/components/jsx-icons/notification";
import Overlay from "@/components/dashboard/layout/overlay";
// import HamburgerOpen from "@/components/jsx-icons/hamburger-open";
import SearchBar from "@/components/general/search-bar";
import ToggleSwitch from "@/components/general/toggle-switch";
// import darkModeActive from "@/public/images/dashboard/sections/dark-mode/dark-mode-active.png";
import darkModeInActive from "@/public/images/dashboard/sections/dark-mode/dark-mode-inactive.png";
import exploreActive from "@/public/images/dashboard/sections/explore/explore-active.png";
import exploreInActive from "@/public/images/dashboard/sections/explore/explore-inactive.png";
import helpActive from "@/public/images/dashboard/sections/help/help-active.png";
import helpInActive from "@/public/images/dashboard/sections/help/help-inactive.png";
import localFont from "next/font/local";
import logoIcon from "@/public/images/logo.svg";
// import logoutIcon from "@/public/images/icons/logout.svg";
import messagingActive from "@/public/images/dashboard/sections/messaging/messaging-active.png";
import messagingInActive from "@/public/images/dashboard/sections/messaging/messaging-inactive.png";
import overviewActive from "@/public/images/dashboard/sections/overview/overview-active.png";
import overviewInActive from "@/public/images/dashboard/sections/overview/overview-inactive.png";
import paymentsActive from "@/public/images/dashboard/sections/payments/payments-active.png";
import paymentsInActive from "@/public/images/dashboard/sections/payments/payments-inactive.png";
import profileActive from "@/public/images/dashboard/sections/profile/profile-active.png";
import profileInActive from "@/public/images/dashboard/sections/profile/profile-inactive.png";
import settingsActive from "@/public/images/dashboard/sections/settings/settings-active.png";
import settingsInActive from "@/public/images/dashboard/sections/settings/settings-inactive.png";
import useDimension from "@/helpers/useDimension";
import useInit from "@/hooks/dashboard/init/use-init";
// import useLogout from "@/hooks/dashboard/general/use-logout";
import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";

// import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// const Averia = Averia_Libre({weight: ["300", "400", "700"], subsets: ["latin"]});

// Font files can be colocated inside of `app`
const myFont = localFont({
	src: [
		{
			path: "../AvenirLTStd-Book.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../AvenirLTStd-Roman.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../AvenirLTStd-Black.otf",
			weight: "700",
			style: "normal",
		},
	],
	display: "swap",
});

const dashboardFont = localFont({
	src: "../../public/fonts/inter/Inter-VariableFont_slnt,wght.ttf",
	display: "swap",
});

// const inter = Inter({
// 	subsets: ["latin"],
// 	variable: "--font-inter",
// });

export default function DashboardLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	// const {initPing} = usePing();
	// const {mutate} = useLogout();
	const {isFetching, refetch} = useInit();
	const {width} = useDimension();
	const pathname = usePathname();
	const isAccountCreated = useSelector((state: IRootState) => state.init.isAccountCreated);
	const user = useSelector((state: IRootState) => state.init.user);
	const isLoggedIn = useSelector((state: IRootState) => state.init.isLoggedIn);

	const [showNav, setShowNav] = useState<boolean>(false);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	// const [isTabletViewDownwards] = useState<boolean>(!!(width < 1024));

	useLayoutEffect(() => {
		// initPing();
		if (isLoggedIn) refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn]);

	useEffect(() => {
		setShowNav(false);
		document.body.style.overflow = "auto";
	}, [pathname]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const handleOpenNav = useCallback(() => {
		if (width < 1025) {
			setShowNav(true);
			document.body.style.overflow = "hidden";
		}
	}, [width]);

	const handleCloseNav = useCallback(() => {
		if (width < 1025) {
			setShowNav(false);
			document.body.style.overflow = "auto";
		}
	}, [width]);
	return (
		<>
			{isFetching && <LoadingScreen />}
			{!isFetching && isMounted && (
				<div
					className={`${dashboardFont.className} ` + "font-in relative grid h-full w-full grid-cols-1 bg-white lg:grid-cols-[16rem,auto]"}
					id="dashboard"
					tabIndex={-1}
				>
					{/* <IdleModal /> */}
					{showNav && <Overlay onClick={handleCloseNav} />}
					<aside
						className={
							`-moz-h-fit-available -webkit-h-fit-available -ms-h-fit-available z-40 h-full w-4/5 max-w-sm border-r border-grey-quat transition-all xs:w-full lg:h-[unset] lg:max-w-none lg:-translate-x-0 lg:transition-none ` +
							`fixed flex transform flex-col items-center justify-between bg-white lg:relative lg:w-auto ` +
							`${showNav ? " translate-x-0" : "-translate-x-full"} `
						}
						tabIndex={-1}
					>
						<div className="absolute -right-12 top-10 hidden 4xs:-right-14 xs:-right-24" onClick={handleCloseNav}>
							<Cancel />
						</div>

						<div className="flex h-full max-h-screen w-full flex-col">
							<div className="h-20 xs:h-28">
								<div className="flex h-20 items-center justify-between px-6 xs:h-28 lg:justify-center">
									<Link className="lg:w-full" href={"/"} tabIndex={showNav ? 0 : -1}>
										<div className="flex cursor-pointer items-center justify-start">
											<Image priority src={logoIcon} width={27.29} height={31.5} alt="Flat Share logo" />
											<span
												className={
													`${myFont.className} ` + "ml-3 mt-1 flex items-center justify-center text-2xl font-semibold"
												}
											>
												FlatShare
											</span>
										</div>
									</Link>

									<div className="ml-4 cursor-pointer lg:hidden" onClick={handleCloseNav}>
										<Cancel />
									</div>
								</div>
							</div>

							<div className="flex-grow overflow-y-auto px-6 ">
								<div
									className={
										"flex w-full flex-col justify-start gap-3 border-b pb-12 pt-4 " +
										`${isAccountCreated ? "border-grey-secondary" : "border-transparent"}`
									}
								>
									<h5 className="select-none text-xs font-medium uppercase text-black-quat">menu</h5>
									{/* <div className="flex flex-col justify-start gap-1"></div> */}
									{!isAccountCreated ||
									(user?.account_status === UserActivationStatus.OFFLINE && user.user_type === UserType.HOST) ? (
										<MenuItem
											onClick={handleOpenNav}
											path={"/dashboard/get-started"}
											iconActive={overviewActive}
											iconInActive={overviewInActive}
											text="Get Started"
										/>
									) : (
										<>
											<MenuItem
												onClick={handleOpenNav}
												path={"/dashboard"}
												iconActive={overviewActive}
												iconInActive={overviewInActive}
												text="Overview"
											/>

											<MenuItem
												onClick={handleOpenNav}
												path="/dashboard/explore"
												iconActive={exploreActive}
												iconInActive={exploreInActive}
												text="Explore"
												isPreRelease
											/>

											<MenuItem
												onClick={handleOpenNav}
												path="/dashboard/profile"
												iconActive={profileActive}
												iconInActive={profileInActive}
												text="Profile"
											/>

											<MenuItem
												onClick={handleOpenNav}
												path="/dashboard/messaging"
												iconActive={messagingActive}
												iconInActive={messagingInActive}
												text="Messaging"
											/>

											<MenuItem
												onClick={handleOpenNav}
												path="/dashboard/payments"
												iconActive={paymentsActive}
												iconInActive={paymentsInActive}
												text="Payments"
											/>
										</>
									)}
								</div>

								{isAccountCreated && (
									<div className="flex w-full flex-col justify-start gap-3 border-b border-grey-secondary pb-12 pt-10">
										<h5 className="select-none text-xs font-medium uppercase text-black-quat">support</h5>
										<div className="flex flex-col justify-start gap-1">
											{isAccountCreated && (
												<>
													<MenuItem
														onClick={handleOpenNav}
														path={"/dashboard/settings"}
														iconActive={settingsActive}
														iconInActive={settingsInActive}
														text="Settings"
													/>

													<MenuItem
														onClick={handleOpenNav}
														path="/dashboard/explore"
														iconActive={helpActive}
														iconInActive={helpInActive}
														text="Help"
														isPreRelease
													/>
												</>
											)}

											{/* <Button
											ripple="dark"
											color="transparent"
											type="button"
											buttonType="primary"
											data-type="section"
											className="!px-3"
											noTabIndex
											fullWidth
										>
											<div className="flex w-full items-center justify-between">
												<div
													className="relative flex h-9 w-full items-center justify-start tracking-normal"
													data-type="section"
													tabIndex={-1}
												>
													<Image priority src={darkModeInActive} width={24} height={24} alt="icon" tabIndex={-1} />
													<span
														className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-medium"
														tabIndex={-1}
														data-type="section"
													>
														Dark mode
													</span>
												</div>
												<div className="w-max">
													<ToggleSwitch
														isActive={false}
														onToggle={() => {
															return;
														}}
													/>
												</div>
											</div>
										</Button> */}
										</div>
									</div>
								)}
								<div
									className={
										!isAccountCreated ||
										(user?.account_status === UserActivationStatus.OFFLINE && user.user_type === UserType.HOST)
											? "absolute bottom-0 left-0 w-full px-6"
											: "w-full"
									}
								>
									{/* <Button
										ripple="dark"
										color="grey"
										type="button"
										buttonType="secondary"
										data-type="section"
										className="mb-10 mt-12 px-3"
										onClick={() => mutate()}
										noTabIndex
										fullWidth
									>
										<div
											className="relative flex h-9 w-full items-center justify-center tracking-normal"
											data-type="section"
											tabIndex={-1}
										>
											<Logout />
											<span className="ml-2 text-sm font-medium" tabIndex={-1} data-type="section">
												Logout
											</span>
										</div>
									</Button> */}
									<Button
										ripple="dark"
										color="transparent"
										type="button"
										buttonType="primary"
										data-type="section"
										// className="!px-3"
										className="mb-10 mt-12 !px-0"
										noTabIndex
										fullWidth
									>
										<div className="flex w-full items-center justify-between">
											<div
												className="relative flex h-9 w-full items-center justify-start tracking-normal"
												data-type="section"
												tabIndex={-1}
											>
												<Image priority src={darkModeInActive} width={24} height={24} alt="icon" tabIndex={-1} />
												<span
													className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-medium"
													tabIndex={-1}
													data-type="section"
												>
													Dark mode
												</span>
											</div>
											<div className="w-max">
												<ToggleSwitch
													isActive={false}
													onToggle={() => {
														return;
													}}
												/>
											</div>
										</div>
									</Button>
								</div>
							</div>
						</div>
					</aside>
					<section className="w-full">
						<div className="flex h-full w-full flex-col items-start justify-start 4xs:h-full">
							<header className="flex w-full flex-row items-center justify-center border-b border-grey-quat bg-white" tabIndex={-1}>
								<div className="mx-auto flex h-20 w-full flex-row items-center justify-between px-4 xs:h-28 lg:px-8">
									<div className="flex w-full justify-between space-x-6 sm:space-x-12">
										<div className="flex w-full items-center justify-start">
											<div className="flex space-x-2 lg:hidden" tabIndex={-1}>
												<div className="cursor-pointer" onClick={handleOpenNav}>
													<HamburgerOpen />
												</div>
											</div>

											{/* <div className="relative hidden w-full lg:block" tabIndex={-1}>
												<SearchBar placeholder="Search location, people..." />
											</div> */}
											{isAccountCreated && (
												<div className="relative hidden w-full lg:block" tabIndex={-1}>
													<SearchBar placeholder="Search location, people..." />
												</div>
											)}
										</div>

										<div className="flex w-fit flex-row items-center justify-center gap-6 " tabIndex={-1}>
											{/* {!isTabletViewDownwards && (
												<> */}
											<div className="relative flex cursor-pointer items-center justify-center" tabIndex={0}>
												<div className="flex items-center justify-center">
													<Notification />
												</div>
											</div>
											{/* </>
											)} */}

											<div className="w-8 xs:w-[unset]">
												<AccountDropdown />
											</div>
										</div>
									</div>
								</div>
							</header>

							<main className="relative flex h-full w-full flex-shrink flex-grow basis-auto flex-col items-center justify-start bg-white-dash-bg">
								{children}
							</main>
						</div>
					</section>
				</div>
			)}
		</>
	);
}
