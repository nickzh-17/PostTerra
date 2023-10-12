const getWithNull = (num: number): string => {
	return num < 10 ? String(`0${num}`) : String(num);
};

export const getParsedDate = (dateStr: string): string => {
	const dateObj = new Date(dateStr);

	const day = getWithNull(dateObj.getDate());

	// const month = dateObj.getMonth() + 1;

	const month = dateObj.toLocaleString("default", { month: "long" });

	const year = dateObj.getFullYear();

	return `${day} ${month} ${year}`;
};
