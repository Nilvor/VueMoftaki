import {createRouter, createWebHistory} from 'vue-router';

import SplashPage from "@/components/SplashPage";
import LoginPhone from "@/components/LoginPhone.vue";
import LoginOtp from "@/components/LoginOtp.vue";
import LoginUser from "@/components/LoginUser.vue";

import HomePage from "@/components/HomePage.vue";
import ProductSelect from "@/components/ProductSelect.vue";
import CategorySelect from "@/components/CategorySelect.vue";

import ShopBasket from "@/components/ShopBasket.vue";
import ShopInfo from "@/components/ShopInfo.vue";
import ShopAddress from "@/components/ShopAddress.vue";
import ShopMap from "@/components/ShopMap.vue";
import ShopPayment from "@/components/ShopPayment.vue";

import UserFavorites from "@/components/UserFavorites.vue";
import UserWallet from "@/components/UserWallet.vue";
import UserOrdersOk from "@/components/UserOrdersOk.vue";
import UserOrdersNo from "@/components/UserOrdersNo.vue";
import UserPayments from "@/components/UserPayments.vue";
import UserTicket from "@/components/UserTicket.vue";
import ProductsNew from "@/components/ProductsNew";
import ProductsDiscount from "@/components/ProductsDiscount";
import ProductsView from "@/components/ProductsView";
import UserTickets from "@/components/UserTickets";
import ProductsSort from "@/components/ProductsSort";
import SearchPage from "@/components/SearchPage";



const routes = [

    {path: "/", name: "SplashPage", component: SplashPage},
    {path: "/login_phone", name: "LoginPhone", component: LoginPhone},
    {path: "/login_otp/:phone/:otp", name: "LoginOtp", component: LoginOtp},
    {path: "/login_user/:phone", name: "LoginUser", component: LoginUser},

    {path: "/homepage", name: "HomePage", component: HomePage},
    {path: "/search_page/:search", name: "SearchPage", component: SearchPage},

    {path: "/products_new", name: "ProductsNew", component: ProductsNew},
    {path: "/products_discount", name: "ProductsDiscount", component: ProductsDiscount},
    {path: "/products_view", name: "ProductsView", component: ProductsView},
    {path: "/products_sort/:action/:catid", name: "ProductsSort", component: ProductsSort},

    {path: "/category_select/:catid", name: "CategorySelect", component: CategorySelect},
    {path: "/product_select/:proid", name: "ProductSelect", component: ProductSelect},

    {path: "/shop_basket", name: "ShopBasket", component: ShopBasket},
    {path: "/shop_info", name: "ShopInfo", component: ShopInfo},
    {path: "/shop_address", name: "ShopAddress", component: ShopAddress},
    {path: "/shop_map", name: "ShopMap", component: ShopMap},
    {path: "/shop_payment", name: "ShopPayment", component: ShopPayment},

    {path: "/user_favorites", name: "UserFavorites", component: UserFavorites},
    {path: "/user_wallet", name: "UserWallet", component: UserWallet},
    {path: "/user_orders_ok", name: "UserOrdersOk", component: UserOrdersOk},
    {path: "/user_orders_no", name: "UserOrdersNo", component: UserOrdersNo},
    {path: "/user_payments", name: "UserPayments", component: UserPayments},
    {path: "/user_ticket", name: "UserTicket", component: UserTicket},
    {path: "/user_tickets", name: "UserTickets", component: UserTickets},

];


const router = createRouter({
    history: createWebHistory(),
    routes
});



export default router;
