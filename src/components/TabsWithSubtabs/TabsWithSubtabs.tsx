import clsx from "clsx";
import Tabs from "components/Tabs/Tabs";
import React from "react";
import { Tab } from "types/post";

import styles from "./TabsWithSubtabs.module.css";

interface TabsWithSubtabsProps {
	activeTab: Tab["value"];
	tabs: Tab[];

	activeSubtab: Tab["value"];
	subtabs: Tab[];

	onTabClick: (tab: Tab) => void;
	onSubtabClick: (tab: Tab) => void;

	className?: string;
}

const TabsWithSubtabs: React.FC<TabsWithSubtabsProps> = ({
	activeTab,
	tabs,
	activeSubtab,
	subtabs,
	onTabClick,
	onSubtabClick,
	className,
}) => {
	return (
		<div className={clsx(styles.tabsWithSubtabs, className)}>
			<Tabs
				className={clsx(styles.mainTabsWrapper)}
				tabs={tabs}
				activeTab={activeTab}
				onTabClick={onTabClick}
				variant="default"
			/>
			<Tabs
				className={clsx(styles.subtabsWrapper)}
				tabs={subtabs}
				activeTab={activeSubtab}
				onTabClick={onSubtabClick}
				variant="subtabs"
			/>
		</div>
	);
};

export default TabsWithSubtabs;
