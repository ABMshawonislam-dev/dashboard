import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Error from "./components/Error";
import Home from "./components/Home";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import AllProduct from "./components/AllProduct";
import AllVariant from "./components/AllVariant";
import Registration from "./components/Registration";
import OtpPage from "./components/OtpPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import CategoryStatus from "./components/CategoryStatus";
import SubCategoryStatus from "./components/SubCategoryStatus";
import CategoryApprove from "./components/CategoryApprove";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>
        <Route path="/otp/:email" element={<OtpPage />}></Route>
        <Route path="/" element={<Home />}>
          <Route path="/addproduct" element={<AddProduct />}></Route>
          <Route path="/allproduct" element={<AllProduct />}></Route>
          <Route path="/allvariant" element={<AllVariant />}></Route>
          <Route path="/categorystatus" element={<CategoryStatus />}></Route>
          <Route
            path="/subcategorystatus"
            element={<SubCategoryStatus />}
          ></Route>
          <Route path="/categoryapprove" element={<CategoryApprove />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
