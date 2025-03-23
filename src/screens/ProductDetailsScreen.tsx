import React, { useEffect } from "react";
import NavBarComponent from "../components/NavBarComponent";
import ProductDetailsComponent from "../components/ProductDetailsComponent";
import FooterComponent from "../components/FooterComponent";
import ChatBotComponent from "../components/ChatbotComponent";

const ProductDetailsScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <NavBarComponent />
      <ChatBotComponent />
      <div className="my-32"></div>
      <ProductDetailsComponent />
      <FooterComponent />
    </div>
  );
};

export default ProductDetailsScreen;
