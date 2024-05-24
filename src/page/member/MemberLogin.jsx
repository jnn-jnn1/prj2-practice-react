import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  function handleLogin() {
    axios
      .post("/api/member/login", { email, password })
      .then((res) => {
        toast({
          status: "success",
          description: "로그인 성공",
          position: "top",
        });
        localStorage.setItem("token", res.data.token);
        // 나중에 "/"로 경로 변경
        navigate("/member/list");
      })
      .catch(() =>
        toast({
          status: "error",
          description: "로그인 실패",
          position: "top",
        }),
      )
      .finally();
  }

  return (
    <Box>
      <Box>로그인</Box>
      <Box>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>비밀번호</FormLabel>
          <Input
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
      </Box>
      <Box>
        <Button colorScheme={"blue"} onClick={handleLogin}>
          로그인
        </Button>
      </Box>
    </Box>
  );
}
