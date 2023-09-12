"use client";

import * as Yup from "yup";

import {Form, Formik, FormikProps} from "formik";
// import {useDispatch} from "react-redux";
import {useRef, useState} from "react";

import {AccountForm} from "@/hooks/dashboard/settings/settings.constants";
import Button from "@/components/general/button/button";
import FormInput from "@/components/general/inputs/form-input";
// import {IRootState} from "@/redux/rootReducer";
import PasswordHints from "@/app/sign-up/password-hints";
import ToggleSwitch from "@/components/general/toggle-switch";
import YupPassword from "yup-password";
import formikHasError from "@/helpers/formikHasError";

YupPassword(Yup);

function Notifications() {
	const [isMessaged, setIsMessaged] = useState(false);
	const [isProfileViewed, setIsProfileViewed] = useState(false);
	const [isInterestMatched, setIsInterestMatched] = useState(false);
	const [isMatchReceivedProfile, setIsMatchReceivedProfile] = useState(false);

	return (
		<>
			<div className="flex h-full w-full flex-col">
				<div className="flex w-full flex-col items-start justify-start gap-8">
					<div className="w-full divide-y md:max-w-3xl">
						<div className="pb-8">
							<h3 className="text-lg font-semibold capitalize leading-[100%] text-black-secondary">Online Status</h3>
							<div className="mt-6 flex w-full flex-col items-center justify-start gap-6">
								<div className="flex w-full items-center justify-between gap-6">
									<p className="select-none text-sm text-black-tertiary">Notify me when someone views my profile</p>
									<ToggleSwitch isActive={isProfileViewed} onToggle={(_value) => setIsProfileViewed(_value)} />
								</div>
								<div className="flex w-full items-center justify-between gap-6">
									<p className="select-none text-sm text-black-tertiary">Notify me when I receive a new match</p>
									<ToggleSwitch isActive={isMatchReceivedProfile} onToggle={(_value) => setIsMatchReceivedProfile(_value)} />
								</div>
								<div className="flex w-full items-center justify-between gap-6">
									<p className="select-none text-sm text-black-tertiary">Notify me when someone sends me a message.</p>
									<ToggleSwitch isActive={isMessaged} onToggle={(_value) => setIsMessaged(_value)} />
								</div>
								<div className="flex w-full items-center justify-between gap-6">
									<p className="select-none text-sm text-black-tertiary">Notify me about new users who match my interests</p>
									<ToggleSwitch isActive={isInterestMatched} onToggle={(_value) => setIsInterestMatched(_value)} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Notifications;
