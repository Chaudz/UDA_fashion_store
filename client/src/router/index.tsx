import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, LoginPage } from "../pages/client";
import { screenUrl } from "../constants/screenUrls";
import LayoutContainer from "../components/common/LayoutContainer";
import RegisterPage from "../pages/client/RegisterPage";
import SalePage from "../pages/client/SalePage";
import ProductList from "../components/client/ProductList";

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
