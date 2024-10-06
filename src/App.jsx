import React from "react";
import { Theme } from '@radix-ui/themes';
import {useSelector} from 'react-redux';


import Map from "./components/Map/Map.jsx";
import Navbar from "./components/Navbar/Navbar.jsx"

import "./index.css";
import '@radix-ui/themes/styles.css';

export default function App() {
  const theme = useSelector(state => state.themeReducer.value);

  return (
    <div className="App">
      <Theme className={theme} accentColor="gray" grayColor="mauve" panelBackground="solid" radius="large">
        <Map/>
        <Navbar/>
      </Theme>
    </div>
  );
}
