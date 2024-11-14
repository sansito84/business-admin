import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductForm from './components/ProductForm';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
// import StockList from './components/StockList';
import ProductListDelete from './components/ProductListDelete';
import { ToastContainer } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Header onSearch={setSearchQuery}/>
        <Routes>
          <Route path="/" element={<ProductList searchQuery={searchQuery} />} />
          <Route path="/delete" element={<ProductListDelete searchQuery={searchQuery} />}/>
          <Route path="/producto/:id/edit" element={<ProductDetail />} />
          <Route path="/crear" element={<ProductForm />} />
          {/* <Route path="/stock" element={<StockList />} />  */}
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
