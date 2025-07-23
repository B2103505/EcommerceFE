import CategoryPage from "../pages/CategoryPage/CategoryPage";
import DetailProductPage from "../pages/DetailProductPage/DetailProductPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import HomePage from "../pages/HomePage/HomePage";
import NotfoundPage from "../pages/NotfoundPage/NotfoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProfileUserPage from "../pages/ProfileUserPage/ProfileUserPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import AdminPage from '../pages/AdminPage/AdminPage'
import CartPage from "../pages/CartPage/CartPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/product',
        page: ProductPage,
        isShowHeader: true
    },
    {
        path: '/cate/:id',
        page: CategoryPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/forgot-password',
        page: ForgotPasswordPage,
        isShowHeader: false
    },
    {
        path: '/detail-product/:id',
        page: DetailProductPage,
        isShowHeader: true
    },
    {
        path: '/profile-user',
        page: ProfileUserPage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: true,
        isPrivate: true
    },
    {
        path: '/cart',
        page: CartPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotfoundPage,
        isShowHeader: false
    }
]