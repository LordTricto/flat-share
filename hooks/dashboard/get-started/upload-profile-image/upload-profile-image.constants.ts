import UserProfile from "@/models/userProfile";

export type UploadProfileImageForm = {
	profile_photo: string;
};
export interface UploadProfileImageFormResponse {
	success: string;
	message: string;
	user: UserProfile;
}
