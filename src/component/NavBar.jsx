import { Box, Flex, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NavBar() {
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  return (
    <Flex gap={3}>
      <Box
        onClick={() => navigate("/")}
        cursor={"pointer"}
        _hover={{ bgColor: "gray.200" }}
      >
        글 목록
      </Box>
      {account.isLoggedIn() && (
        <Box
          onClick={() => navigate("/write")}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
        >
          글쓰기
        </Box>
      )}
      <Spacer />
      {account.isLoggedIn() || (
        <Box
          onClick={() => navigate("/signup")}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
        >
          회원가입
        </Box>
      )}
      {account.isAdmin() && (
        <Box
          onClick={() => navigate("/member/list")}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
        >
          회원목록
        </Box>
      )}
      {account.isLoggedIn() || (
        <Box
          onClick={() => navigate("/login")}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
        >
          로그인
        </Box>
      )}
      {account.isLoggedIn() && (
        <Box
          onClick={() => account.logout()}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
        >
          로그아웃
        </Box>
      )}
      {account.isLoggedIn() && (
        <Box
          onClick={() => navigate(`/member/${account.id}`)}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
        >
          <FontAwesomeIcon icon={faUser} /> {account.nickName}
        </Box>
      )}
    </Flex>
  );
}
