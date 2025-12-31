"use client";

import {IRootState} from "@/redux/rootReducer";
import PricingCard from "@/components/dashboard/pricing/pricing-card";
import {useSelector} from "react-redux";

function Pricing() {
	const user = useSelector((state: IRootState) => state.init.user);
	const plan = useSelector((state: IRootState) => state.init.userStatistics?.plan);

	return (
		<div className="flex h-full w-full items-center justify-center gap-6 bg-white px-10 py-10">
			<div className="flex h-full w-max items-center justify-between gap-6 self-end bg-white px-10 py-10">
				<PricingCard
					name="Starter"
					email={user?.email || ""}
					send={plan?.starter_plan_active_send_request}
					receive={plan?.starter_plan_active_receive_request}
					price={plan?.starter_plan_price}
					priceRaw={plan?.starter_plan_price_raw}
					isCurrentPlan={plan?.active_plan === "starter"}
				/>

				<PricingCard
					name="Platinum"
					email={user?.email || ""}
					send={plan?.platinum_plan_active_send_request}
					receive={plan?.platinum_plan_active_receive_request}
					price={plan?.platinum_plan_price}
					priceRaw={plan?.platinum_plan_price_raw}
					isCurrentPlan={plan?.active_plan === "platinum"}
				/>

				<PricingCard
					name="Gold"
					email={user?.email || ""}
					send={plan?.gold_plan_active_send_request}
					receive={plan?.gold_plan_active_receive_request}
					price={plan?.gold_plan_price}
					priceRaw={plan?.gold_plan_price_raw}
					isCurrentPlan={plan?.active_plan === "gold"}
				/>
			</div>
		</div>
	);
}

export default Pricing;
