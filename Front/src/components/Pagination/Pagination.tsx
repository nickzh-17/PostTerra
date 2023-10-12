import clsx from "clsx";
import Button from "components/UI/Button/Button";
import Typography from "components/UI/Typography/Typography";
import React from "react";
import { PostsResponse } from "types/api-types/response";
import styles from "./Pagination.module.css";

interface PaginationProps {
	totalRecords: PostsResponse["count"];
	postsPerPage: number;
	currentPage: number;
	onChangePage: (newPage: number) => void;
}

const generatePagination = (page: number, totalRecords: number, recordsPerPage: number) => {
	const totalPages = Math.ceil(totalRecords / recordsPerPage);

	if (totalPages < 7) {
		return Array.from(Array(totalPages), (_, i) => i + 1);
	}

	if (page < 5) {
		return [1, 2, 3, 4, 5, "...", totalPages];
	}

	if (page > totalPages - 4) {
		return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
	}

	return [1, "...", page - 1, page, page + 1, "...", totalPages];
};

export const Pagination: React.FC<PaginationProps> = ({ totalRecords, postsPerPage, currentPage, onChangePage }) => {
	const pagination = generatePagination(currentPage, totalRecords, postsPerPage);

	return (
		<div className={styles.wrapper}>
			{pagination.map((item, index) => (
				<React.Fragment key={index}>
					{typeof item === "number" ? (
						<Button
							className={clsx(styles.number, { [styles.active]: item === currentPage })}
							onClick={() => {
								console.log(`NePage: ${item}, ${typeof item}`);
								onChangePage(item);
							}}
						>
							<Typography variant="p">{item}</Typography>
						</Button>
					) : (
						<span className={styles.skipPages}>{item}</span>
					)}
				</React.Fragment>
			))}
		</div>
	);
};
