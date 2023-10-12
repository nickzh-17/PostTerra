import { Loader } from "components/Loader/Loader";
import { Popup } from "components/Popup/Popup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "store";
import { closePopup } from "store/app/app.reducer";
import { getSlice } from "store/app/app.selector";
import { getPostSlice } from "store/posts/post.selector";
import { getUserSlice } from "store/user/user.selectors";

import styles from "./OverlayContainer.module.css";

export const OverlayContainer = () => {
	const { isUserLoading, isUserFetched } = useSelector(getUserSlice);
	const { isPostLoading, isPostsLoading } = useSelector(getPostSlice);
	const { log } = useSelector(getSlice);
	const { log: logUser } = useSelector(getUserSlice);

	const dispatch = useDispatch<AppDispatch>();

	return (
		<div className={styles.container}>
			{/* {(isPostLoading || isPostsLoading || isUserLoading) && <Loader isTransparent={isUserFetched} />} */}
			{false && <Loader isTransparent={isUserFetched} />}
			{logUser.type && (
				<Popup
					onClick={() => dispatch(closePopup())}
					eventType={logUser.event}
					logType={logUser.type}
					message={logUser.message}
				/>
			)}
		</div>
	);
};
