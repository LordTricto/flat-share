interface PasswordRule {
	text: string;
	regex: RegExp;
}

export enum PasswordRuleKey {
	LOWERCASE = "lowercase",
	UPPERCASE = "uppercase",
	SPECIAL_CHAR = "special",
	NUMBER = "number",
	NO_SPACE = "space",
	MIN_LENGTH = "minimum",
}

export const PasswordRules: {[key in PasswordRuleKey]: PasswordRule} = {
	[PasswordRuleKey.LOWERCASE]: {text: "One lowercase letter", regex: new RegExp("[a-z]")},
	[PasswordRuleKey.UPPERCASE]: {text: "One uppercase letter", regex: new RegExp("[A-Z]")},
	[PasswordRuleKey.SPECIAL_CHAR]: {text: "One special character (dash or underscore)", regex: new RegExp(/^(?=.*[-_])[A-Za-z0-9_-]+$/)},
	[PasswordRuleKey.NUMBER]: {text: "One number", regex: new RegExp("[0-9]")},
	[PasswordRuleKey.NO_SPACE]: {text: "No Space", regex: new RegExp(/^\S*$/)},
	[PasswordRuleKey.MIN_LENGTH]: {text: "Minimum 8 characters", regex: new RegExp("[^\\s]{8,}")},
};

export function isRulePassed(password: string, key: PasswordRuleKey): boolean {
	return PasswordRules[key].regex.test(password);
}

export function isAllRulesPassed(password: string): boolean {
	return Object.keys(PasswordRules).every((key) => isRulePassed(password, key as PasswordRuleKey));
}
