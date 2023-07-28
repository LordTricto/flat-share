"use client";

import AttachmentsCard from "@/components/dashboard/profile/cards/attachments";
import EditAttachments from "@/components/dashboard/profile/forms/edit-attachments";
import EditProfile from "@/components/dashboard/profile/forms/edit-profile";
import ProfileCard from "@/components/dashboard/profile/cards/profile";
import {useState} from "react";

function Profile() {
	const [isEditingProfile, setIsEditingProfile] = useState(false);
	const [isEditingAttachments, setIsEditingAttachments] = useState(false);

	return (
		<>
			<div className="flex h-full w-full flex-col gap-8 px-5 pb-8 pt-6">
				{isEditingProfile ? (
					<EditProfile
						toggle={() => {
							console.log("whats happening");
							setIsEditingProfile(false);
						}}
					/>
				) : (
					<ProfileCard handleEditProfile={() => setIsEditingProfile(true)} />
				)}
				{isEditingAttachments ? (
					<EditAttachments toggle={() => setIsEditingAttachments(false)} />
				) : (
					<AttachmentsCard handleEditAttachments={() => setIsEditingAttachments(true)} />
				)}
			</div>
		</>
	);
}

export default Profile;
