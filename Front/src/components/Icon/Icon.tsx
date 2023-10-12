import React from "react";

import { ReactComponent as Account } from "./icons/account.svg";
import { ReactComponent as BookmarkUsed } from "./icons/bookmark-used.svg";
import { ReactComponent as CreateIcon } from "./icons/create.svg";
import { ReactComponent as Dislike } from "./icons/dislike.svg";
import { ReactComponent as Like } from "./icons/like.svg";
import { ReactComponent as More } from "./icons/more.svg";
import { ReactComponent as ThemeDark } from "./icons/theme-dark.svg";
import { ReactComponent as ThemeLight } from "./icons/theme-light.svg";

import styles from "./Icon.module.css";

const icons = {
	bookmarkUnused: BookmarkUsed,
	bookmarkUsed: BookmarkUsed,
	more: More,
	likeUnused: Like,
	likeUsed: Like,
	dislikeUnused: Dislike,
	dislikeUsed: Dislike,
	themeLight: ThemeLight,
	themeDark: ThemeDark,
	createIcon: CreateIcon,
	account: Account,
};

export type IconType = keyof typeof icons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
	type: IconType;
}

const Icon: React.FC<IconProps> = ({ type, ...props }) => {
	const Element = icons[type];
	return <Element className={styles[type]} {...props} />;
};

export default Icon;
