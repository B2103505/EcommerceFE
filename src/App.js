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
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './Service/UserService'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, resetUser } from './redux/slice/userSlice';

function App() {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const { storeData, decoded } = handleDecoded()
    if (decoded?.id && storeData) {
      handleGetDetailsUser(decoded?.id, storeData)
    }
  }, [])

  // const handleDecoded = () => {
  //   let storeData = localStorage.getItem('access_token')
  //   let decoded = {}

  //   if (storeData && isJsonString(storeData)) {
  //     storeData = JSON.parse(storeData)
  //     decoded = jwtDecode(storeData)
  //   }
  //   return { decoded, storeData }
  // }

  const handleDecoded = () => {
    const token = localStorage.getItem('access_token');
    if (token && isJsonString(token)) {
      const parsedToken = JSON.parse(token);
      try {
        const decoded = jwtDecode(parsedToken);
        return { decoded, storeData: parsedToken };
      } catch (err) {
        console.error('Invalid token:', err);
        return { decoded: null, storeData: null };
      }
    }
    return { decoded: null, storeData: null };
  };


  // UserService.axiosJWT.interceptors.request.use(async (config) => {
  //   const currTime = new Date()
  //   const { decoded } = handleDecoded()
  //   if (decoded?.exp < currTime.getTime() / 1000) {
  //     const data = await UserService.refreshToken()
  //     config.headers['authorization'] = `Bearer ${data?.access_token}`
  //   }
  //   return config;
  // }, function (error) {
  //   return Promise.reject(error)
  // })

  const handleLogout = async () => {
    // setLoading(true)
    await UserService.LogoutUser()
    localStorage.removeItem('access_token');
    dispatch(resetUser())
    // setLoading(false)
  }

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currTime = new Date();
      const { decoded, storeData } = handleDecoded();

      if (decoded && decoded.exp < currTime.getTime() / 1000) {
        try {
          const data = await UserService.refreshToken();
          if (data?.access_token) {
            localStorage.setItem('access_token', JSON.stringify(data.access_token));
            config.headers['authorization'] = `Bearer ${data.access_token}`;
          }
        } catch (err) {
          console.error('Refresh token failed:', err);
          handleLogout()
        }
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );


  const handleGetDetailsUser = async (id, token) => {
    if (!id || !token) return;
    const respn = await UserService.getDetailUser(id, token)
    dispatch(updateUser({ ...respn?.data, access_token: token }))
  }

  // const fetchApi = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_KEY}/plant/getAllPlant`)
  //   return res.data
  // }

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // if (query.data) console.log('query', query.data)

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const isCheckAuth = !route.isPrivate || user.isPermis
            const Layout = route.isShowHeader ? DefaultComponent : React.Fragment;
            if (!isCheckAuth) return null;
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
