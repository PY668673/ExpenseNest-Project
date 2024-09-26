import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ExpenseTracker from './pages/ExpenseTracker';
import AssetsTracker from './pages/AssetsTracker';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Dashboard/>} />
            <Route path="ExpenseTracker" element={<ExpenseTracker />} />
            <Route path="AssetsTracker" element={<AssetsTracker />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
