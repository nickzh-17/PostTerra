import { CreatePage as CreatePageContent } from "components/CreatePage/CreatePage";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import MainLayout from "layouts/main/MainLayout";
import React from "react";

export const CreatePage: React.FC = () => {
	return <MainLayout header={<Header />} main={<CreatePageContent />} footer={<Footer />} />;
};
