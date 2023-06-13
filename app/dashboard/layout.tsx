"use client";

import Image from "next/image";
import Link from "next/link";
import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";
import logoIcon from "@/public/images/logo.svg";
import Overlay from "@/components/dashboard/layout/overlay";
import MenuItem from "@/components/dashboard/layout/menuItem";
import {
	// useDispatch,
	useSelector,
} from "react-redux";
import {IRootState} from "@/redux/rootReducer";
import {UserActivationStatus} from "@/models/user.constant";
import {usePathname} from "next/navigation";
import useDimension from "@/helpers/useDimension";
import Cancel from "@/components/jsx-icons/cancel";
// import HamburgerOpen from "@/components/jsx-icons/hamburger-open";
import SearchBar from "@/components/general/search-bar";
import AccountDropdown from "@/components/dashboard/layout/account-dropdown";
import Notification from "@/components/jsx-icons/notification";
import Button from "@/components/general/button/button";
import ToggleSwitch from "@/components/general/toggle-switch";
import logoutIcon from "@/public/images/icons/logout.svg";
import Logout from "@/components/jsx-icons/logout";
import HamburgerOpen from "@/components/jsx-icons/hamburger-open";

export default function DashboardLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	// const dispatch = useDispatch();
	const {width} = useDimension();
	const pathname = usePathname();
	const accountStatus = useSelector((state: IRootState) => state.init.user?.account_status);

	const [showNav, setShowNav] = useState<boolean>(false);
	const [isAccountCreated, setIsAccountCreated] = useState<boolean>(false);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [isTabletViewDownwards] = useState<boolean>(!!(width < 1024));

	// useLayoutEffect(() => {
	// 	initPing();
	// }, [initPing]);

	useLayoutEffect(() => {
		if (!accountStatus) return;
		setIsAccountCreated(!!(accountStatus !== UserActivationStatus.UNCOMPLETED));
	}, [accountStatus]);

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
			{isMounted && (
				<div className="relative min-h-screen w-full bg-white 4xs:grid lg:grid-cols-[16rem,auto]" id="dashboard" tabIndex={-1}>
					{/* <IdleModal /> */}
					{showNav && <Overlay onClick={handleCloseNav} />}
					<aside
						className={
							`-moz-h-fit-available -webkit-h-fit-available -ms-h-fit-available z-40 w-full max-w-sm border-r border-grey-quat transition-all lg:max-w-none lg:-translate-x-0 lg:transition-none ` +
							`fixed flex transform flex-col items-center justify-between bg-white lg:relative lg:w-auto ` +
							`${showNav ? " translate-x-0" : "-translate-x-full"} `
						}
						tabIndex={-1}
					>
						<div className="absolute -right-12 top-10 hidden 4xs:-right-14 xs:-right-24" onClick={handleCloseNav}>
							<Cancel />
						</div>

						<div className="flex h-full max-h-screen w-full flex-col">
							<div className="h-28">
								<div className="flex h-28 items-center justify-between px-6 lg:justify-center">
									<Link className="lg:w-full" href={"/"} tabIndex={showNav ? 0 : -1}>
										<div className="flex cursor-pointer items-center justify-center">
											<Image priority src={logoIcon} width={27.29} height={31.5} alt="Flat Share logo" />
											<span className="ml-3 mt-1 flex items-center justify-center text-3xl font-semibold">FlatShare</span>
										</div>
									</Link>

									<div className="ml-4 cursor-pointer lg:hidden" onClick={handleCloseNav}>
										<Cancel />
									</div>
								</div>
							</div>

							<div className="flex-grow overflow-y-auto px-6">
								<div className="flex flex-col justify-start gap-3 border-b border-grey-backdrop pb-12 pt-4">
									<h5 className="text-sm uppercase text-black-quat">menu</h5>
									<div className="flex flex-col justify-start gap-1">
										<MenuItem onClick={handleOpenNav} path={"/"} icon={<Cancel />} text="Overview" />

										<MenuItem onClick={handleOpenNav} path="/explore" icon={<Cancel />} text="Explore" isPreRelease />

										<MenuItem onClick={handleOpenNav} path="/profile" icon={<Cancel />} text="Profile" />

										<MenuItem onClick={handleOpenNav} path="/messaging" icon={<Cancel />} text="Messaging" />

										<MenuItem onClick={handleOpenNav} path="/payments" icon={<Cancel />} text="Payments" />
									</div>
									{/* {!isAccountCreated ? (
										<>
											<div className="pb-1 pt-3">
												<MenuItem onClick={handleOpenNav} path={"/"} icon={<Cancel />} text="Overview" />
											</div>
										</>
									) : (
										<div className="py-3">
											<MenuItem onClick={handleOpenNav} path={"/"} icon={<Cancel />} text="Overview" />

											<MenuItem onClick={handleOpenNav} path="/explore" icon={<Cancel />} text="Explore" isPreRelease />

											<MenuItem onClick={handleOpenNav} path="/profile" icon={<Cancel />} text="Profile" />

											<MenuItem onClick={handleOpenNav} path="/messaging" icon={<Cancel />} text="Messaging" />

											<MenuItem onClick={handleOpenNav} path="/payments" icon={<Cancel />} text="Payments" />
										</div>
									)} */}
								</div>

								<div className="flex flex-col justify-start gap-3 border-b border-grey-backdrop pb-12 pt-10">
									<h5 className="text-sm uppercase text-black-quat">support</h5>
									<div className="flex flex-col justify-start gap-1">
										<MenuItem onClick={handleOpenNav} path={"/"} icon={<Cancel />} text="Settings" />

										<MenuItem onClick={handleOpenNav} path="/explore" icon={<Cancel />} text="Help" isPreRelease />

										<MenuItem onClick={handleOpenNav} path="/profile" icon={<Cancel />} text="Dark Mode" />

										<Button
											ripple="dark"
											color="transparent"
											type="button"
											buttonType="primary"
											data-type="section"
											className="px-3"
											noTabIndex
											fullWidth
										>
											<div className="flex w-full items-center justify-between">
												<div
													className="relative flex h-9 w-full items-center justify-start tracking-normal"
													data-type="section"
													tabIndex={-1}
												>
													<Cancel />
													<span
														className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-medium"
														tabIndex={-1}
														data-type="section"
													>
														Dark mode
													</span>
												</div>
												<ToggleSwitch
													isActive={false}
													onToggle={() => {
														return;
													}}
												/>
											</div>
										</Button>
									</div>
									{/* {!isAccountCreated ? (
										<>
											<div className="pb-1 pt-3">
												<MenuItem onClick={handleOpenNav} path={"/"} icon={<Cancel />} text="Overview" />
											</div>
										</>
									) : (
										<div className="py-3">
											<MenuItem onClick={handleOpenNav} path={"/"} icon={<Cancel />} text="Overview" />

											<MenuItem onClick={handleOpenNav} path="/explore" icon={<Cancel />} text="Explore" isPreRelease />

											<MenuItem onClick={handleOpenNav} path="/profile" icon={<Cancel />} text="Profile" />

											<MenuItem onClick={handleOpenNav} path="/messaging" icon={<Cancel />} text="Messaging" />

											<MenuItem onClick={handleOpenNav} path="/payments" icon={<Cancel />} text="Payments" />
										</div>
									)} */}
								</div>

								<Button
									ripple="dark"
									color="grey"
									type="button"
									buttonType="secondary"
									data-type="section"
									className="mb-10 mt-12 px-3"
									noTabIndex
									fullWidth
								>
									<div
										className="relative flex h-9 w-full items-center justify-center tracking-normal"
										data-type="section"
										tabIndex={-1}
									>
										<Logout />
										<span className="ml-2 font-medium" tabIndex={-1} data-type="section">
											Logout
										</span>
									</div>
								</Button>
							</div>
						</div>
					</aside>
					<section className="w-full">
						<div className="flex h-screen max-h-screen w-full flex-col items-start justify-start 4xs:h-full">
							<header className="flex w-full flex-row items-center justify-center border-b border-grey-quat" tabIndex={-1}>
								<div className="mx-auto flex h-28 w-full flex-row  items-center justify-between px-4 lg:px-8 ">
									<div className="flex w-full justify-between space-x-6 sm:space-x-12">
										<div className="flex w-full items-center justify-start">
											<div className="flex space-x-2 lg:hidden" tabIndex={-1}>
												<div className="cursor-pointer" onClick={handleOpenNav}>
													<HamburgerOpen />
												</div>
											</div>

											<div className="relative hidden w-full lg:block" tabIndex={-1}>
												<SearchBar placeholder="Search location, people..." />
											</div>
											{isAccountCreated && (
												<div className="relative w-full" tabIndex={-1}>
													<SearchBar placeholder="Search location, people..." />
												</div>
											)}
										</div>

										<div
											className="flex w-max flex-row items-center justify-center space-x-2 sm:space-x-3 lg:space-x-6 "
											tabIndex={-1}
										>
											{!isTabletViewDownwards && (
												<>
													<div
														className="relative hidden cursor-pointer items-center justify-center pl-4 pr-3 lg:flex"
														tabIndex={0}
													>
														<div className="flex items-center justify-center">
															<Notification />
														</div>
													</div>
												</>
											)}

											<div className="lg:inline">
												<AccountDropdown />
											</div>
										</div>
									</div>
								</div>
							</header>

							<main className="-moz-h-fit-available -webkit-h-fit-available  -ms-h-fit-available relative flex w-full flex-shrink flex-grow basis-auto flex-col items-center justify-start overflow-y-auto px-4 lg:px-8">
								{children}
							</main>
						</div>
					</section>
				</div>
			)}
		</>
	);
}
