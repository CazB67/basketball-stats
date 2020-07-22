import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {DataTable, TableHeader, TableWrapper} from "../components/Table";



function Display() {
    return (
      <>
     <Navbar/>
     <TableWrapper>
      <TableHeader/>
      <DataTable/>
     </TableWrapper>
     <DataTable/>
     <Footer/>
      </>
    );
  }

export default Display;