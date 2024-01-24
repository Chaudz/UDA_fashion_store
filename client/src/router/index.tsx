import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage, HomePage } from "../pages/client";
import { HomePage as HomePageAdmin } from "../pages/admin";
import { screenUrl } from "../constants/screenUrls";
import LayoutContainer from "../components/common/LayoutContainer";
import RegisterPage from "../pages/client/RegisterPage";
import SalePage from "../pages/client/SalePage";
import DescriptionPage from "../pages/client/DescriptionPage";
import ProductList from "../components/client/ProductList";
import UserInfoPage from "../pages/client/UserInfoPage";
const routerconfig = [
  {
    url: screenUrl.HOME,
    component: HomePage,
    title: "Trang chủ",
    isHeader: true,
    isFooter: true,
  },
  {
    url: screenUrl.LOGIN,
    component: LoginPage,
    title: "Trang đăng nhập",
    isHeader: true,
    isFooter: true,
  },
  {
    url: screenUrl.COLLECTIONS,
    component: ProductList,
    title: "Jacket",
    isHeader: true,
    isFooter: true,
  },
  {
    url: `${screenUrl.COLLECTIONS}/:categoryName`,
    component: ProductList,
    title: "Jacket",
    isHeader: true,
    isFooter: true,
  },
  {
    url: screenUrl.REGISTER,
    component: RegisterPage,
    title: "Trang đăng ký",
    isHeader: true,
    isFooter: true,
  },
  {
    url: `/collections${screenUrl.SALE}`,
    component: SalePage,
    title: "Trang sale",
    isHeader: true,
    isFooter: true,
  },
  {
    url: screenUrl.INFO,
    component: UserInfoPage,
    title: "Thông tin của tôi",
    isHeader: true,
    isFooter: true,
  },
  {
    url: `${screenUrl.PRODUCT}/:productName`,
    component: DescriptionPage,
    title: "Trang sale",
    isHeader: true,
    isFooter: true,
  },

  {
    url: screenUrl.ADMIN,
    component: HomePageAdmin,
    title: "Trang chủ admin",
    isHeader: false,
    isFooter: false,
  },
];

const AppRouter = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route>
          {routerconfig.map((el, index) => {
            return (
              <Route
                key={index}
                path={el.url}
                element={
                  <LayoutContainer
                    title={el.title}
                    component={el.component}
                    isFooter={el.isFooter}
                    isHeader={el.isHeader}
                  />
                }
              />
            );
          })}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
