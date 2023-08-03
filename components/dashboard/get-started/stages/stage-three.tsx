"use client";

import * as Yup from "yup";

import {AccountPreferenceForm, locationOptions} from "@/hooks/dashboard/get-started/account-setup/get-started.constants";
import {Form, Formik, FormikProps} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";

import Button from "@/components/general/button/button";
import Dropdown from "@/components/general/dropdown/dropdown";
import {IRootState} from "@/redux/rootReducer";
import MoneyInput from "@/components/general/inputs/money-input";
import formikHasError from "@/helpers/formikHasError";
import locationIcon from "@/public/images/dashboard/general/location.svg";
import {moneyToNumber} from "@/helpers/useMoneyToNumber";
import {setAccountPreference} from "@/redux/get-started/get-started";
import useGetStarted from "@/hooks/dashboard/get-started/account-setup/use-get-started";

function StageThree() {
	const dispatch = useDispatch();
	const userData = useSelector((state: IRootState) => state.getStarted.userData);

	const formikRef = useRef<FormikProps<AccountPreferenceForm> | null>(null);

	const initialFormState: AccountPreferenceForm = {
		budget: userData.budget || 0,
		location_1: userData.location_1 || "",
		location_2: userData.location_2 || "",
	};

	const formValidation = Yup.object().shape({
		budget: Yup.string().required("Required"),
		location_1: Yup.string().required("Required"),
		location_2: Yup.string().required("Required"),
	});

	const handleGetStarted = useGetStarted();

	useEffect(() => {
		if (handleGetStarted.isSuccess) {
			formikRef.current?.resetForm();
		}
	}, [handleGetStarted.isSuccess]);

	return (
		<>
			<div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-8 md:w-[448px]">
				<div className="flex flex-col items-center justify-center gap-3">
					<div className="flex flex-col items-center justify-center gap-4">
						<span className="text-3xl leading-[100%]">⏳</span>
						<h3 className="text-2xl font-bold capitalize leading-[100%] text-black">Almost Done!</h3>
					</div>
					<p className="text-center text-base text-black-tertiary">Tell us what you are looking for.</p>
				</div>
				<Formik
					initialValues={initialFormState}
					innerRef={formikRef}
					validationSchema={formValidation}
					onSubmit={(values) => {
						dispatch(setAccountPreference(values));
						handleGetStarted.mutate({...userData, ...values});
						// dispatch(setToStageFour());
					}}
					enableReinitialize={true}
					validateOnChange
					validateOnMount
				>
					{(formik) => {
						return (
							<Form className="flex w-full flex-col items-start justify-start gap-8">
								<div className="flex w-full flex-col items-start justify-start gap-5">
									<MoneyInput
										label="Budget"
										name="budget"
										inputSize="md"
										value={String(formik.values.budget)}
										onChange={(_value) => formik.getFieldHelpers("budget").setValue(moneyToNumber(String(_value)))}
									/>
									<div className="flex w-full flex-col gap-4">
										<Dropdown
											label="Locations"
											value={`${formik.values.location_1}`}
											onSelect={(value: string | undefined) => formik.getFieldHelpers("location_1").setValue(value)}
											placeholder="Enter location..."
											options={locationOptions.filter((_loc) => _loc.value !== formik.values.location_2)}
											icon={locationIcon}
											size="md"
											noArrow
										/>
										<Dropdown
											value={`${formik.values.location_2}`}
											onSelect={(value: string | undefined) => formik.getFieldHelpers("location_2").setValue(value)}
											placeholder="Enter location..."
											options={locationOptions.filter((_loc) => _loc.value !== formik.values.location_1)}
											icon={locationIcon}
											size="md"
											noArrow
										/>
									</div>
								</div>
								<Button
									type="submit"
									buttonType="primary"
									color="blue"
									isDisabled={formikHasError(formik.errors)}
									isLoading={handleGetStarted.isLoading}
									borderFull
									fullWidth
								>
									<span>Continue</span>
								</Button>
							</Form>
						);
					}}
				</Formik>
			</div>
		</>
	);
}

export default StageThree;
