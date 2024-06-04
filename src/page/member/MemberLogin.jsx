import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const account = useContext(LoginContext);
  const [code, setCode] = useState("");

  const kakaoId = import.meta.env.VITE_KAKAO_ID;
  const kakaoUri = import.meta.env.VITE_KAKAO_URL;

  function handleLogin() {
    axios
      .post("/api/member/login", { email, password })
      .then((res) => {
        toast({
          status: "success",
          description: "로그인 성공",
          position: "top",
        });
        account.login(res.data.token);
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          description: "로그인 실패",
          position: "top",
        });
        account.logout();
      })
      .finally(() => {
        setPassword("");
        setEmail("");
      });
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
        <a
          href={
            "https://kauth.kakao.com/oauth/authorize?client_id=" +
            kakaoId +
            "&redirect_uri=" +
            kakaoUri +
            "&response_type=code"
          }
        >
          카카오톡 로그인
        </a>
      </Box>
    </Box>
  );
}
