import React, { useState } from "react";

import Typography from "components/UI/Typography/Typography";

import TabsWithSubtabs from "components/TabsWithSubtabs/TabsWithSubtabs";
import { subtabs, tabs } from "data/tabs";
import { Tab } from "types/post";
import styles from "./Main.module.css";

const Main: React.FC = () => {
	const [activeTab, setActiveTab] = useState(tabs[0].value);
	const [activeSubtab, setActiveSubtab] = useState(subtabs[0].value);

	const handleChangeTab = (tab: Tab) => setActiveTab(tab.value);
	const handleChangeSubtab = (tab: Tab) => setActiveSubtab(tab.value);

	return (
		<>
			<Typography color="second" className={styles.title} variant="h1">
				Посты
			</Typography>

			<TabsWithSubtabs
				className={styles.mainPageTabs}
				tabs={tabs}
				activeTab={activeTab}
				onTabClick={handleChangeTab}
				subtabs={subtabs}
				activeSubtab={activeSubtab}
				onSubtabClick={handleChangeSubtab}
			/>

			<div className={styles.posts}></div>
		</>
	);
};

export default Main;
