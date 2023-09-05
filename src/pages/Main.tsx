import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import MainLayout from "layouts/main/MainLayout";
// import Main from "components/Main/Main";

const Main = () => {
	return <MainLayout header={<Header />} main={<div>Main</div>} footer={<Footer />} />;
};

export default Main;
