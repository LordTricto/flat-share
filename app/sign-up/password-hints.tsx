"use client";

import {PasswordRuleKey, PasswordRules, isAllRulesPassed, isRulePassed} from "./sign-up.constant";

import React from "react";

interface PasswordHintsProps {
	password: string;
	className?: string;
	show?: boolean;
}

function PasswordHints({password, className = "", show = true}: PasswordHintsProps): JSX.Element {
	return (
		<>
			{!isAllRulesPassed(password) && show && (
				<div className={className}>
					<ul>
						{Object.keys(PasswordRules).map((key) => {
							const ruleKey: PasswordRuleKey = key as PasswordRuleKey;
							const passed = isRulePassed(password, ruleKey);
							return (
								<li className="pb-2 flex space-x-1 items-center" key={`password-hint-${key}`}>
									<span className={"flex w-2 h-2 mx-1 rounded-full " + `${passed ? "bg-success" : "bg-black-quat"}`} />
									<span className={`${passed ? "text-success" : "text-black-secondary"}`}>{PasswordRules[ruleKey].text}</span>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</>
	);
}

export default PasswordHints;
