import React, { useState, useEffect } from "react";
import { StateProvider } from "../state/state";
import Layout from "./Layout";
import Header from "./misc/Header";
import LayoutSwitcher from "./LayoutSwitcher";
import "../styles/App.css";
import "../styles/layout-switcher.css";
import "../styles/gradients.css";
import "@material/react-material-icon/dist/material-icon.css";

function App() {
  const masterWidth = () => {
    let width = Math.round(window.innerWidth - (window.innerWidth / 100) * 4);
    return width > 1900 ? 1900 : width;
  };

  const margin = layout => {
    if (masterWidth() <= 640) return 4;
    else return 12;
  };

  const tilesLayoutParams = () => {
    const cardsWidth = masterWidth() / 3 - 2;
    const cardsHeightRange = [cardsWidth, cardsWidth];
    return {
      layout: "tiles",
      layoutWidth: masterWidth(),
      cardsWidth,
      cardsHeightRange,
      cardsMargin: margin()
    };
  };

  const listCardsWidth = () => {
    let width = masterWidth() - 2;
    return width > 1000 ? 1000 : width;
  };

  const listLayoutParams = () => {
    const cardsWidth = listCardsWidth();
    const cardsHeightRange = [cardsWidth / 3, cardsWidth / 3];
    return {
      layout: "list",
      layoutWidth: masterWidth(),
      cardsWidth,
      cardsHeightRange,
      cardsMargin: margin()
    };
  };

  const masonryLayoutParams = () => {
    const cardsWidth = masterWidth() / 4 - 2;
    const cardsHeightRange = [cardsWidth, cardsWidth * 2];
    return {
      layout: "masonry",
      layoutWidth: masterWidth(),
      cardsWidth,
      cardsHeightRange,
      cardsMargin: margin()
    };
  };

  const initialState = masonryLayoutParams();

  const reducer = (state, action) => {
    switch (action.type) {
      case "tiles":
        return tilesLayoutParams();
      case "list":
        return listLayoutParams();
      case "masonry":
        return masonryLayoutParams();
      default:
        return initialState;
    }
  };
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Header />
      <Layout />
      <LayoutSwitcher />
    </StateProvider>
  );
}

export default App;
