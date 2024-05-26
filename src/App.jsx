import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./page/Home.jsx";
import { MemberSignup } from "./page/member/MemberSignup.jsx";
import { MemberList } from "./page/member/MemberList.jsx";
import { MemberLogin } from "./page/member/MemberLogin.jsx";
import axios from "axios";
import * as PropTypes from "prop-types";
import LoginProvider from "./component/LoginProvider.jsx";
import { BoardList } from "./page/board/BoardList.jsx";
import { BoardWrite } from "./page/board/BoardWrite.jsx";
import { BoardView } from "./page/board/BoardView.jsx";
import { BoardEdit } from "./page/board/BoardEdit.jsx";
import { MemberView } from "./page/member/MemberView.jsx";
import { MemberEdit } from "./page/member/MemberEdit.jsx";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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
        element: <BoardList />,
      },
      {
        path: "/signup",
        element: <MemberSignup />,
      },
      {
        path: "/member/list",
        element: <MemberList />,
      },
      { path: "/member/:id", element: <MemberView /> },
      {
        path: "/login",
        element: <MemberLogin />,
      },
      { path: "write", element: <BoardWrite /> },
      { path: "/board/:id", element: <BoardView /> },
      { path: "/board/edit/:id", element: <BoardEdit /> },
      { path: "/member/edit/:id", element: <MemberEdit /> },
    ],
  },
]);

LoginProvider.propTypes = { children: PropTypes.node };

function App(props) {
  return (
    <LoginProvider>
      <ChakraProvider>
        <RouterProvider router={router}></RouterProvider>
      </ChakraProvider>
    </LoginProvider>
  );
}

export default App;
