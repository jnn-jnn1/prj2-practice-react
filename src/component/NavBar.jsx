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
      <Spacer />
      <Box
        onClick={() => navigate("/signup")}
        cursor={"pointer"}
        _hover={{ bgColor: "gray.200" }}
      >
        회원가입
      </Box>
      <Box
        onClick={() => navigate("/member/list")}
        cursor={"pointer"}
        _hover={{ bgColor: "gray.200" }}
      >
        회원목록
      </Box>
      <Box
        onClick={() => navigate("/login")}
        cursor={"pointer"}
        _hover={{ bgColor: "gray.200" }}
      >
        로그인
      </Box>
      {account.isLoggedIn() && (
        <Box>
          <FontAwesomeIcon icon={faUser} /> {account.nickName}
        </Box>
      )}
    </Flex>
  );
}
