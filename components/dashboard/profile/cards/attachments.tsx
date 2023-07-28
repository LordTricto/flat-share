"use client";

import * as Yup from "yup";

import Button from "@/components/general/button/button";
import Image from "next/image";
import ImageUpload from "@/components/dashboard/general/cards/image-upload/image-upload";
import apartmentFour from "@/public/images/dashboard/profile/apartment-4.png";
import apartmentOne from "@/public/images/dashboard/profile/apartment-1.png";
import apartmentThree from "@/public/images/dashboard/profile/apartment-3.png";
import apartmentTwo from "@/public/images/dashboard/profile/apartment-2.png";
import editIcon from "@/public/images/dashboard/general/edit.svg";
import {useState} from "react";

interface Props {
	handleEditAttachments: () => void;
}

function AttachmentsCard(props: Props) {
	const [selectedTestImages] = useState({
		image_1: apartmentOne,
		image_2: apartmentTwo,
		image_3: apartmentThree,
		image_4: apartmentFour,
		image_5: "",
		image_6: "",
	});

	return (
		<>
			<div className="flex h-full w-full">
				<div className="h-fit w-full pb-6">
					<div className="flex h-fit w-full flex-col gap-9 rounded-[10px] border bg-white px-5 py-6 2xs:px-6">
						<div className="flex flex-row items-start justify-between gap-4">
							<div className="flex flex-col gap-4">
								<h3 className="text-2xl font-semibold capitalize leading-[100%] text-black">Attachment</h3>
								<p className="text-left text-sm text-black-tertiary 2xs:text-base">No description.</p>
							</div>
							<div className="flex gap-3">
								<Button
									type="button"
									buttonType="secondary"
									color="white"
									size="sm"
									onClick={props.handleEditAttachments}
									borderSmall
								>
									<div className="flex items-center gap-2">
										<Image src={editIcon} alt="camera" width={16} height={16} tabIndex={-1} />
										<span className="hidden 2xs:inline">Edit Details</span>
										<span className="inline 2xs:hidden">Edit</span>
									</div>
								</Button>
							</div>
						</div>
						{/* <div className="flex w-full flex-row flex-wrap gap-4 lg:justify-start"> */}
						<div className="grid w-full grid-cols-[repeat(auto-fit,minmax(135px,1fr))] gap-4 md:grid-cols-[repeat(auto-fit,minmax(135px,135px))]">
							{selectedTestImages.image_1 && <ImageUpload isImageOnly image={selectedTestImages.image_1} />}
							{selectedTestImages.image_2 && <ImageUpload isImageOnly image={selectedTestImages.image_2} />}
							{selectedTestImages.image_3 && <ImageUpload isImageOnly image={selectedTestImages.image_3} />}
							{selectedTestImages.image_4 && <ImageUpload isImageOnly image={selectedTestImages.image_4} />}
							{selectedTestImages.image_5 && <ImageUpload isImageOnly image={selectedTestImages.image_5} />}
							{selectedTestImages.image_6 && <ImageUpload isImageOnly image={selectedTestImages.image_6} />}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AttachmentsCard;
