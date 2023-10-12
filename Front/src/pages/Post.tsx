import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import PostDetail from "components/PostDetail/PostDetail";
import MainLayout from "layouts/main/MainLayout";

const Post = () => {
	return <MainLayout header={<Header />} main={<PostDetail />} footer={<Footer />} />;
};

export default Post;
