import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import OrderPage from './pages/OrderPage/OrderPage';
import ProductPage from './pages/ProductPage/ProductPage';
import HomePage from './pages/HomePage/HomePage';
import { routes } from './routes/index';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
function App() {

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
    </div >
  )
}

export default App;
