export const cutText = (str: string, maxLength: number, endStr: string): string => {
	if (str.length > maxLength - endStr.length) {
		return str.slice(0, maxLength - endStr.length).concat(endStr);
	}
	return str;
};
