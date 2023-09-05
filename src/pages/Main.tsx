import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import MainContent from "components/Main/Main";
import MainLayout from "layouts/main/MainLayout";

const Main = () => {
	return <MainLayout header={<Header />} main={<MainContent />} footer={<Footer />} />;
};

export default Main;
