import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./page/Home.jsx";
import { MemberSignup } from "./page/member/MemberSignup.jsx";
import { MemberList } from "./page/member/MemberList.jsx";
import { MemberLogin } from "./page/member/MemberLogin.jsx";
import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    return (config.headers.Authorization = `Bearer ${token}`);
  }
  return config;
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: null,
      },
      {
        path: "/signup",
        element: <MemberSignup />,
      },
      {
        path: "/member/list",
        element: <MemberList />,
      },
      {
        path: "/login",
        element: <MemberLogin />,
      },
    ],
  },
]);

function App(props) {
  return (
    <ChakraProvider>
      <RouterProvider router={router}></RouterProvider>
    </ChakraProvider>
  );
}

export default App;
