"use client";

import MultiRangeSlider, {ChangeResult} from "multi-range-slider-react";
import {educationOptions, genderOptions, locationOptions, religionOptions} from "@/hooks/dashboard/settings/settings.constants";

import Accordion from "@/components/general/accordion/accordion";
import Button from "@/components/general/button/button";
import Checkbox from "@/components/general/checkbox/checkbox";
import {FilterOptions} from "@/hooks/dashboard/filter/filter.constants";
import Image from "next/image";
import Input from "@/components/general/inputs/input";
import SearchDropdown from "@/components/general/dropdown/search-dropdown";
import UpgradeAccountCard from "../../general/cards/upgrade-account/upgrade-account";
import cancel from "@/public/images/icons/cancel.svg";
import filterFunnel from "@/public/images/dashboard/general/filter-funnel.svg";
import {truncateNumber} from "@/utils/formatNumber";
import useDimension from "@/helpers/useDimension";
import {useState} from "react";

interface Props {
	isActive: boolean;
	toggle: () => void;
}

function FilterBar(props: Props) {
	const {width} = useDimension();

	const [filterOpened, setFilterOpened] = useState(FilterOptions.BUDGET);
	const [locationSearchTerm, setLocationSearchTerm] = useState("");
	const [educationSearchTerm, setEducationSearchTerm] = useState("");

	const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
	const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
	const [selectedReligions, setSelectedReligions] = useState<string[]>([]);
	const [selectedEducations, setSelectedEducations] = useState<string[]>([]);
	const [budgetMinValue, setBudgetMinValue] = useState(0);
	const [budgetMaxValue, setBudgetMaxValue] = useState(5000000);
	const [ageMinValue, setAgeMinValue] = useState(18);
	const [ageMaxValue, setAgeMaxValue] = useState(50);

	const [tempSelectedLocations, setTempSelectedLocations] = useState<string[]>([]);
	const [tempSelectedGenders, setTempSelectedGenders] = useState<string[]>([]);
	const [tempSelectedReligions, setTempSelectedReligions] = useState<string[]>([]);
	const [tempSelectedEducations, setTempSelectedEducations] = useState<string[]>([]);
	const [tempBudgetMinValue, setTempBudgetMinValue] = useState(0);
	const [tempBudgetMaxValue, setTempBudgetMaxValue] = useState(5000000);
	const [tempAgeMinValue, setTempAgeMinValue] = useState(18);
	const [tempAgeMaxValue, setTempAgeMaxValue] = useState(50);

	const handleInput = (e: ChangeResult) => {
		setTempBudgetMinValue(e.minValue);
		setTempBudgetMaxValue(e.maxValue);
	};

	const handleAgeInput = (e: ChangeResult) => {
		setTempAgeMinValue(e.minValue);
		setTempAgeMaxValue(e.maxValue);
	};

	const handleCancelLocation = (_tempSelectedLocation: string) => {
		setTempSelectedLocations((prev) => prev.filter((prev) => prev !== _tempSelectedLocation));
	};
	const handleCancelEducation = (_tempSelectedEducation: string) => {
		setTempSelectedEducations((prev) => prev.filter((prev) => prev !== _tempSelectedEducation));
	};

	const handleSetFilter = () => {
		setSelectedLocations(tempSelectedLocations);
		setSelectedGenders(tempSelectedGenders);
		setSelectedReligions(tempSelectedReligions);
		setSelectedEducations(tempSelectedEducations);
		setBudgetMinValue(tempBudgetMinValue);
		setBudgetMaxValue(tempBudgetMaxValue);
		setAgeMinValue(tempAgeMinValue);
		setAgeMaxValue(tempAgeMaxValue);
	};

	const handleResetFilter = () => {
		setTempSelectedLocations([]);
		setTempSelectedGenders([]);
		setTempSelectedReligions([]);
		setTempSelectedEducations([]);
		setTempBudgetMinValue(0);
		setTempBudgetMaxValue(5000000);
		setTempAgeMinValue(18);
		setTempAgeMaxValue(50);

		setSelectedLocations([]);
		setSelectedGenders([]);
		setSelectedReligions([]);
		setSelectedEducations([]);
		setBudgetMinValue(0);
		setBudgetMaxValue(5000000);
		setAgeMinValue(18);
		setAgeMaxValue(50);
		setFilterOpened(FilterOptions.NONE);
	};

	return (
		<>
			<div
				// className={
				// 	"fixed right-0 z-20 h-full min-w-[280px] overflow-y-auto duration-150 lg:relative lg:-translate-x-0 lg:transition-none " +
				// 	`${width < 1024 ? (props.isActive ? " -translate-x-0" : "translate-x-full") : ""} `
				// }
				className={
					`z-40 h-full min-w-[280px] max-w-[280px] transition-all lg:-translate-x-0 lg:transition-none ` +
					`absolute right-0 flex transform flex-col items-center justify-between  ` +
					// `${showNav ? " translate-x-0" : "-translate-x-full"} `
					`${width < 1024 ? (props.isActive ? " -translate-x-0" : "translate-x-full") : ""} `
				}
			>
				<div className="flex h-full w-full flex-col border-l border-grey-quat bg-white pt-6">
					<div className="flex flex-col gap-4 border-b px-5 pb-6">
						<div className="flex w-full items-center justify-between">
							<h4 className="text-lg font-semibold leading-[100%] text-black">Filter</h4>
							{width < 1024 && (
								<div className="cursor-pointer" onClick={props.toggle}>
									<Image width={12} height={12} src={cancel} alt="cancel icon" priority />
								</div>
							)}
						</div>
						<div className="flex items-center justify-start gap-2">
							<Image width={16} height={16} src={filterFunnel} alt="filter funnel" priority />
							<span className="text-sm font-medium text-black-secondary">
								{budgetMinValue === 0 &&
								budgetMaxValue === 5000000 &&
								ageMinValue === 18 &&
								ageMaxValue === 50 &&
								selectedLocations.length < 1 &&
								selectedGenders.length < 1 &&
								selectedReligions.length < 1 &&
								selectedEducations.length < 1
									? "Default"
									: `${
											(budgetMinValue !== 0 || budgetMaxValue !== 5000000 ? 1 : 0) +
											(ageMinValue !== 18 || ageMaxValue !== 50 ? 1 : 0) +
											(selectedLocations.length > 0 ? 1 : 0) +
											(selectedGenders.length > 0 ? 1 : 0) +
											(selectedReligions.length > 0 ? 1 : 0) +
											(selectedEducations.length > 0 ? 1 : 0)
									  } Selected`}
							</span>
						</div>
					</div>
					<div className="flex-grow overflow-y-auto px-5">
						<div className="flex w-full flex-col justify-start gap-6 pt-6">
							<Accordion
								header="Budget"
								subText={
									filterOpened !== FilterOptions.BUDGET
										? (tempBudgetMinValue !== 0 || tempBudgetMaxValue !== 5000000 ? 1 : 0)
											? `₦${truncateNumber(tempBudgetMinValue)} - ₦${truncateNumber(tempBudgetMaxValue)}`
											: undefined
										: undefined
								}
								isOpen={filterOpened === FilterOptions.BUDGET}
								onToggle={() =>
									setFilterOpened((_opened) => (_opened === FilterOptions.BUDGET ? FilterOptions.NONE : FilterOptions.BUDGET))
								}
							>
								<div className="flex w-full flex-col items-center">
									<div className="flex w-full items-center justify-between">
										<span className={`text-xs ${tempBudgetMinValue === 0 ? "text-black-tertiary" : "text-black-secondary"}`}>
											₦{truncateNumber(tempBudgetMinValue)}
										</span>
										<span
											className={`text-xs ${tempBudgetMaxValue === 5000000 ? "text-black-tertiary" : "text-black-secondary"}`}
										>
											₦{truncateNumber(tempBudgetMaxValue)}
										</span>
									</div>
									<div className="-mb-2.5 flex w-full items-center px-1">
										<MultiRangeSlider
											style={{
												border: "none",
												boxShadow: "none",
												padding: "15px 10px",
											}}
											label={false}
											ruler={false}
											barLeftColor="#E9E9E9"
											barInnerColor="#465BF1"
											barRightColor="#E9E9E9"
											thumbLeftColor="#465BF1"
											thumbRightColor="#465BF1"
											min={0}
											max={5000000}
											step={10000}
											minValue={tempBudgetMinValue}
											maxValue={tempBudgetMaxValue}
											onInput={(e) => {
												handleInput(e);
											}}
										/>
									</div>
								</div>
							</Accordion>
							<Accordion
								header="Location"
								subText={
									filterOpened !== FilterOptions.LOCATION
										? tempSelectedLocations.length > 0
											? tempSelectedLocations.join(", ")
											: undefined
										: undefined
								}
								isOpen={filterOpened === FilterOptions.LOCATION}
								onToggle={() =>
									setFilterOpened((_opened) => (_opened === FilterOptions.LOCATION ? FilterOptions.NONE : FilterOptions.LOCATION))
								}
							>
								<div className=" flex w-full flex-col items-center gap-3">
									<SearchDropdown
										value={locationSearchTerm}
										inputPlaceholder="Search Location"
										onChange={(_value) => setLocationSearchTerm(_value)}
										onSelect={(value: string | undefined) => {
											if (value) setTempSelectedLocations((prev) => [...prev, value]);
										}}
										options={locationOptions.filter(
											(_loc) => !tempSelectedLocations.some((_location) => _location === _loc.text)
										)}
										size="md"
									/>

									{tempSelectedLocations.length > 0 && (
										<div className="flex w-full flex-wrap gap-2">
											{tempSelectedLocations.map((_tempSelectedLocation, index) => (
												<div className="flex w-max items-center justify-between gap-2 rounded-md border p-2" key={index}>
													<p className="text-xs text-black-tertiary">{_tempSelectedLocation}</p>
													<div onClick={() => handleCancelLocation(_tempSelectedLocation)}>
														<Image width={10} height={10} src={cancel} alt="cancel icon" priority />
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							</Accordion>
							{/* <Accordion
						header="State"
						subText={
							filterOpened !== FilterOptions.STATE
								? tempSelectedLocations.length > 0
									? tempSelectedLocations.join(", ")
									: undefined
								: undefined
						}
						isOpen={filterOpened === FilterOptions.STATE}
						onToggle={() => setFilterOpened((_opened) => (_opened === FilterOptions.STATE ? FilterOptions.NONE : FilterOptions.STATE))}
					>
						<div className=" flex w-full flex-col items-center gap-3">
							<SearchDropdown
								value={locationSearchTerm}
								inputPlaceholder="Search State"
								onChange={(_value) => setLocationSearchTerm(_value)}
								onSelect={(value: string | undefined) => {
									if (value) setTempSelectedLocations((prev) => [...prev, value]);
								}}
								options={locationOptions.filter((_loc) => !tempSelectedLocations.some((_location) => _location === _loc.text))}
								size="md"
							/>

							{tempSelectedLocations.length > 0 && (
								<div className="flex w-full flex-wrap gap-2">
									{tempSelectedLocations.map((_tempSelectedLocation, index) => (
										<div className="flex w-max items-center justify-between gap-2 rounded-md border p-2" key={index}>
											<p className="text-xs text-black-tertiary">{_tempSelectedLocation}</p>
											<div onClick={() => handleCancelLocation(_tempSelectedLocation)}>
												<Image width={10} height={10} src={cancel} alt="cancel icon" priority />
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</Accordion> */}
							<Accordion
								header="Age"
								subText={
									filterOpened !== FilterOptions.AGE
										? (tempAgeMinValue !== 18 || tempAgeMaxValue !== 50 ? 1 : 0)
											? `${truncateNumber(tempAgeMinValue)} - ${truncateNumber(tempAgeMaxValue)}`
											: undefined
										: undefined
								}
								isOpen={filterOpened === FilterOptions.AGE}
								onToggle={() =>
									setFilterOpened((_opened) => (_opened === FilterOptions.AGE ? FilterOptions.NONE : FilterOptions.AGE))
								}
							>
								<div className="flex w-full flex-col items-center">
									<div className="flex w-full items-center justify-between">
										<span className={`text-xs ${tempAgeMinValue === 18 ? "text-black-tertiary" : "text-black-secondary"}`}>
											{tempAgeMinValue}
										</span>
										<span className={`text-xs ${tempAgeMaxValue === 50 ? "text-black-tertiary" : "text-black-secondary"}`}>
											{tempAgeMaxValue}
										</span>
									</div>
									<div className="-mb-2.5 flex w-full items-center px-1">
										<MultiRangeSlider
											style={{
												border: "none",
												boxShadow: "none",
												padding: "15px 10px",
											}}
											label={false}
											ruler={false}
											barLeftColor="#E9E9E9"
											barInnerColor="#465BF1"
											barRightColor="#E9E9E9"
											thumbLeftColor="#465BF1"
											thumbRightColor="#465BF1"
											min={18}
											max={50}
											step={1}
											minValue={tempAgeMinValue}
											maxValue={tempAgeMaxValue}
											onInput={(e) => {
												handleAgeInput(e);
											}}
										/>
									</div>
								</div>
							</Accordion>
							<Accordion
								header="Education"
								subText={
									filterOpened !== FilterOptions.EDUCATION
										? tempSelectedEducations.length > 0
											? tempSelectedEducations.join(", ")
											: undefined
										: undefined
								}
								isOpen={filterOpened === FilterOptions.EDUCATION}
								onToggle={() =>
									setFilterOpened((_opened) => (_opened === FilterOptions.EDUCATION ? FilterOptions.NONE : FilterOptions.EDUCATION))
								}
							>
								<div className=" flex w-full flex-col items-center gap-3">
									<SearchDropdown
										value={educationSearchTerm}
										inputPlaceholder="Search Education"
										onChange={(_value) => setEducationSearchTerm(_value)}
										onSelect={(value: string | undefined) => {
											if (value)
												setTempSelectedEducations((prev) => [
													...prev,
													educationOptions.find((_edu) => _edu.value === value)?.text || "",
												]);
										}}
										options={educationOptions.filter(
											(_education) =>
												!tempSelectedEducations.some((_tempSelectedEducation) => _tempSelectedEducation === _education.text)
										)}
										size="md"
									/>

									{tempSelectedEducations.length > 0 && (
										<div className="flex w-full flex-wrap gap-2">
											{tempSelectedEducations.map((_tempSelectedEducation, index) => (
												<div className="flex w-max items-center justify-between gap-2 rounded-md border p-2" key={index}>
													<p className="text-xs text-black-tertiary">{_tempSelectedEducation}</p>
													<div onClick={() => handleCancelEducation(_tempSelectedEducation)}>
														<Image width={10} height={10} src={cancel} alt="cancel icon" priority />
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							</Accordion>
							<Accordion
								header="Gender"
								subText={
									filterOpened !== FilterOptions.GENDER
										? tempSelectedGenders.length > 0
											? tempSelectedGenders.join(", ")
											: undefined
										: undefined
								}
								isOpen={filterOpened === FilterOptions.GENDER}
								onToggle={() =>
									setFilterOpened((_opened) => (_opened === FilterOptions.GENDER ? FilterOptions.NONE : FilterOptions.GENDER))
								}
							>
								<div className="flex w-full flex-col gap-3">
									{genderOptions.map((_gender, index) => (
										<Checkbox
											id={_gender.value}
											key={index}
											checked={tempSelectedGenders.some((_tempSelectedGenders) => _tempSelectedGenders === _gender.text)}
											onClick={() =>
												setTempSelectedGenders((prev) =>
													prev.some((_tempSelectedGenders) => _tempSelectedGenders === _gender.text)
														? prev.filter((_tempSelectedGenders) => _tempSelectedGenders !== _gender.text)
														: [...prev, _gender.text]
												)
											}
											text={_gender.text}
											size="sm"
										/>
									))}
								</div>
							</Accordion>
							<Accordion
								header="Religion"
								subText={
									filterOpened !== FilterOptions.RELIGION
										? tempSelectedReligions.length > 0
											? tempSelectedReligions.join(", ")
											: undefined
										: undefined
								}
								isOpen={filterOpened === FilterOptions.RELIGION}
								onToggle={() =>
									setFilterOpened((_opened) => (_opened === FilterOptions.RELIGION ? FilterOptions.NONE : FilterOptions.RELIGION))
								}
							>
								<div className="flex w-full flex-col gap-3">
									{religionOptions.map((_religion, index) => (
										<Checkbox
											id={_religion.value}
											key={index}
											checked={tempSelectedReligions.some((_tempSelectedReligion) => _tempSelectedReligion === _religion.text)}
											onClick={() =>
												setTempSelectedReligions((prev) =>
													prev.some((_tempSelectedReligion) => _tempSelectedReligion === _religion.text)
														? prev.filter((_tempSelectedReligion) => _tempSelectedReligion !== _religion.text)
														: [...prev, _religion.text]
												)
											}
											text={_religion.text}
											size="sm"
										/>
									))}
								</div>
							</Accordion>
							<div className="flex w-full flex-col gap-4 pt-5">
								<Button type="button" buttonType="secondary" color="grey" size="md" borderFull fullWidth onClick={handleResetFilter}>
									<span>Clear Filters</span>
								</Button>
								<Button
									type="button"
									buttonType="primary"
									color="blue"
									size="md"
									borderFull
									fullWidth
									onClick={() => {
										handleSetFilter();
										setFilterOpened(FilterOptions.NONE);
										// setIsSet(true)
									}}
									isDisabled={
										tempBudgetMinValue === 0 &&
										tempBudgetMaxValue === 5000000 &&
										tempAgeMinValue === 18 &&
										tempAgeMaxValue === 50 &&
										tempSelectedLocations.length < 1 &&
										tempSelectedGenders.length < 1 &&
										tempSelectedReligions.length < 1 &&
										tempSelectedEducations.length < 1
									}
								>
									<span>Apply Filter</span>
								</Button>
							</div>
							<div className="w-full py-6">
								<UpgradeAccountCard />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default FilterBar;
