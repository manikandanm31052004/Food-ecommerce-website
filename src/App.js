import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './components/Search';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route path="/" element={<Search />} />

        {/* Product Details Page */}
        <Route path="/product/:id" element={<ProductDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
