"use client";

import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";

import AccountDropdown from "@/components/dashboard/layout/account-dropdown";
import Button from "@/components/general/button/button";
import Cancel from "@/components/jsx-icons/cancel";
import HamburgerOpen from "@/components/jsx-icons/hamburger-open";
import {IRootState} from "@/redux/rootReducer";
import Image from "next/image";
import Link from "next/link";
import LoadingScreen from "@/components/dashboard/general/loading-screen";
import MenuItem from "@/components/dashboard/layout/menuItem";
import Notification from "@/components/jsx-icons/notification";
import Overlay from "@/components/dashboard/layout/overlay";
import SearchBar from "@/components/general/search-bar";
import ToggleSwitch from "@/components/general/toggle-switch";
import darkModeInActive from "@/public/images/dashboard/sections/dark-mode/dark-mode-inactive.png";
import exploreActive from "@/public/images/dashboard/sections/explore/explore-active.png";
import exploreInActive from "@/public/images/dashboard/sections/explore/explore-inactive.png";
import localFont from "next/font/local";
import logoIcon from "@/public/images/logo.svg";
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
import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";
import { HostSignals } from "@/redux/init/slice/initSlice.types";

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
	src: "../Inter-VariableFont_slnt,wght.ttf",
	display: "swap",
});

export default function DashboardLayout({children}: {children: React.ReactNode}) {
	// const {initPing} = usePing();
	const {isFetching, refetch} = useInit();
	const {width} = useDimension();
	const pathname = usePathname();
	
	const isHost = useSelector((state: IRootState) => state.init.user?.isHost);
	const isGuest = useSelector((state: IRootState) => state.init.user?.isGuest);
	const hostSignal = useSelector((state: IRootState) => state.init.hostSignal);
	const isLoggedIn = useSelector((state: IRootState) => state.init.isLoggedIn);

	const [showNav, setShowNav] = useState<boolean>(false);
	const [isMounted, setIsMounted] = useState<boolean>(false);

	const showOnlyOverview = isGuest || (isHost && (hostSignal === HostSignals.NO_PROPERTY|| hostSignal === HostSignals.UNPAID_PROPERTY_ADS_FEE))

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
										`${!showOnlyOverview ? "border-grey-secondary" : "border-transparent"}`
									}
								>
									<h5 className="select-none text-xs font-medium uppercase text-black-quat">Menu</h5>
									{showOnlyOverview ? (
										<MenuItem
											onClick={handleOpenNav}
											path={"/dashboard/get-started"}
											optionalPath="/dashboard/create-ad"
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
												includesPath
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

								{!showOnlyOverview && (
									<div className="flex w-full flex-col justify-start gap-3 border-b border-grey-secondary pb-12 pt-10">
										<h5 className="select-none text-xs font-medium uppercase text-black-quat">support</h5>
										<div className="flex flex-col justify-start gap-1">
											<MenuItem
												onClick={handleOpenNav}
												path={"/dashboard/settings"}
												iconActive={settingsActive}
												iconInActive={settingsInActive}
												text="Settings"
											/>
											{/* <MenuItem
														onClick={handleOpenNav}
														path="/dashboard/explore"
														iconActive={helpActive}
														iconInActive={helpInActive}
														text="Help"
														isPreRelease
													/> */}
										</div>
									</div>
								)}
								<div className={showOnlyOverview ? "absolute bottom-0 left-0 w-full px-6" : "w-full"}>
									<Button
										ripple="dark"
										color="transparent"
										type="button"
										buttonType="primary"
										data-type="section"
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
											{!showOnlyOverview && (
												<div className="relative hidden w-full lg:block" tabIndex={-1}>
													<SearchBar
														value=""
														placeholder="Search location, people..."
														onChange={() => console.log("first")}
													/>
												</div>
											)}
										</div>

										<div className="flex w-fit flex-row items-center justify-center gap-6 " tabIndex={-1}>
											<div className="relative hidden cursor-pointer items-center justify-center lg:flex" tabIndex={0}>
												<div className="flex items-center justify-center">
													<Notification />
												</div>
											</div>

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
