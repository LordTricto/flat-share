"use client";

import {useDispatch, useSelector} from "react-redux";

import {IRootState} from "@/redux/rootReducer";
import Toast from "../toast";
import {toastReset} from "@/redux/toast/slice/toast-slice";
import {useEffect} from "react";
import {usePathname} from "next/navigation";

function ToastContainer(): JSX.Element {
	// const router = useRouter();
	const pathname = usePathname();

	const dispatch = useDispatch();
	const toastItems = useSelector((state: IRootState) => state.toast.toastItems);

	useEffect(() => {
		dispatch(toastReset());
	}, [pathname, dispatch]);

	return (
		<>
			<div className="2xs:bottom-unset fixed bottom-2 z-50 flex h-max w-full flex-col items-center justify-end gap-4 px-2 2xs:right-10 2xs:top-10 2xs:w-max 2xs:flex-col-reverse 2xs:items-end 2xs:justify-start 2xs:px-0">
				{toastItems.map((_item, index) => (
					<Toast data={_item} key={index} index={index} />
				))}
			</div>
		</>
	);
}

export default ToastContainer;
