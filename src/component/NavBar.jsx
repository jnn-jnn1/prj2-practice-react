import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <Flex gap={3}>
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
    </Flex>
  );
}
