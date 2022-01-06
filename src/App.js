import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quotation1 from "./pages/Quotation1";
import PurchaseOrder from "./pages/PurchaseOrder";
import PurchaseOrder2 from "./pages/PurchaseOrder2";
import NavbarComponent from "./components/Navbar";

function App() {
  return (
    <div>
      <NavbarComponent />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Quotation1 />} />
        <Route path="/purchase/order/:id" element={<PurchaseOrder />} />
        {/* <Route path="/my/purchase/order/:id" element={<PurchaseOrder2 />} /> */}
      </Routes>
    </div>
  );
}

export default App;
