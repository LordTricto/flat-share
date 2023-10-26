"use client";

import {SettingsSection, SettingsSections, SettingsSectionsText} from "@/hooks/dashboard/settings/settings.constants";

import Account from "@/components/dashboard/settings/sections/account";
import Interests from "@/components/dashboard/settings/sections/interests";
import Notifications from "@/components/dashboard/settings/sections/notifications";
import PersonalDetails from "@/components/dashboard/settings/sections/personal-details";
import Preference from "@/components/dashboard/settings/sections/preference";
import {useState} from "react";

function Settings() {
	const [activeSection, setActiveSection] = useState(SettingsSection.PERSONAL_DETAILS);

	return (
		<>
			<div className="flex h-full w-full">
				<div className="flex h-full w-full flex-col px-4 py-6 xs:px-5">
					<h4 className="text-lg font-semibold leading-[100%] text-black-secondary 3xs:text-xl">Settings</h4>
					<div className="mt-6 flex h-full w-full flex-col gap-8 rounded-[10px] bg-white px-4 pb-6 pt-6 2xs:px-6">
						<div className="flex items-center gap-8 overflow-scroll border-b">
							{SettingsSections.map((_activeSection, _index) => (
								<div
									key={_index}
									className={
										"h-full w-max cursor-pointer border-b-4 py-4 " +
										`${
											activeSection === _activeSection
												? "border-b-blue font-medium text-blue"
												: "border-b-transparent text-black-tertiary"
										}`
									}
									onClick={() => setActiveSection(_activeSection)}
								>
									<span className="whitespace-nowrap text-base capitalize leading-[100%]">
										{SettingsSectionsText[_activeSection]}
									</span>
								</div>
							))}
						</div>
						<div className="relative h-full w-full overflow-y-auto">
							<div className="absolute left-0 top-0 flex h-full w-full flex-col gap-8">
								<div className="h-fit w-full pb-6">
									{activeSection === SettingsSection.PERSONAL_DETAILS && (
										<PersonalDetails handleNext={() => setActiveSection(SettingsSection.PREFERENCE)} />
									)}
									{activeSection === SettingsSection.PREFERENCE && (
										<Preference handleNext={() => setActiveSection(SettingsSection.INTERESTS)} />
									)}
									{activeSection === SettingsSection.INTERESTS && (
										<Interests handleNext={() => setActiveSection(SettingsSection.ACCOUNT)} />
									)}
									{activeSection === SettingsSection.ACCOUNT && <Account />}
									{activeSection === SettingsSection.NOTIFICATIONS && <Notifications />}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Settings;
