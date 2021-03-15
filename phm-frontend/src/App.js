import React from "react";
import Table from "./table/table"
import Footer from "./footer/footer"

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App = () => (
  <div className="App">
    <Table/>
    <Footer/>
  </div>
)

export default App
