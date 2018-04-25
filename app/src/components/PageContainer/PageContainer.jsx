import React, { Component } from "react";
import "./PageContainer.css";

import Header from "../Header/Header";
import ContentContainer from "../ContentContainer/ContentContainer";
import Footer from "../Footer/Footer";

class PageContainer extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <ContentContainer />
        <Footer />
      </div>
    );
  }
}

export default PageContainer;
