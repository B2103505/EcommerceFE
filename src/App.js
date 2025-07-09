import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import OrderPage from './pages/OrderPage/OrderPage';
import ProductPage from './pages/ProductPage/ProductPage';
import HomePage from './pages/HomePage/HomePage';
import { routes } from './routes/index';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// ✅ Thêm import cho Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  // useEffect(() => {
  //   fetchApi()
  // }, [])

  const fetchApi = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_KEY}/plant/getAllPlant`)
    return res.data
  }

  const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  if (query.data) console.log('query', query.data)

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : React.Fragment;
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}

        </Routes>
      </Router>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div >
  )
}

export default App;
