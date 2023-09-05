import clsx from "clsx";
import React from "react";

import TabItem from "./TabItem";

import styles from "./Tabs.module.css";

export interface Tab {
	label: string;
	value: string | number;
	disabled?: boolean;
}

interface TabsProps {
	activeTab: Tab["value"];
	tabs: Tab[];
	variant?: "default" | "subtabs";
	onTabClick: (tab: Tab) => void;
	className?: string;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, tabs, variant = "default", onTabClick, className }) => {
	return (
		<div className={clsx(styles.wrapper, styles[variant], className)}>
			<ul className={styles.tabs}>
				{tabs.map(tab => (
					<TabItem
						key={tab.label}
						tab={tab}
						onTabClick={onTabClick}
						className={clsx({ [styles.active]: activeTab === tab.value })}
					/>
				))}
			</ul>
		</div>
	);
};

export default Tabs;
