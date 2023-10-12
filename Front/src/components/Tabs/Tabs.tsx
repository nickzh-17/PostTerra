import clsx from "clsx";
import React from "react";
import { Tab } from "types/tabs";

import TabItem from "./TabItem";

import styles from "./Tabs.module.css";

interface TabsProps {
	tabs: Tab[];
	activeTab: Tab["value"] | null;
	variant?: "default" | "subtabs";
	onTabClick: (tab: Tab) => void;
	className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, variant = "default", onTabClick, className }) => {
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
