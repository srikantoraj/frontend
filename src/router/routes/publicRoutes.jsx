/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import Protected from "../../components/common/Protected";
const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
import HomePage from '../../views/HomePage/HomePage';


const publicRoutes = [
  {
    path: "",
    element: (
      <Protected authentication={true}>
          <HomePage />
      </Protected>
      ),
  },
  {
    path: "/login",
    element: (
      <Protected authentication={false}>
          <Login />
      </Protected>
      ),
  },
  {
    path: "/register",
    element: (
      <Protected authentication={false}>
          <Register />
      </Protected>
      ),
  },
];

export default publicRoutes;
