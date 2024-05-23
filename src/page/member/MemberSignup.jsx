import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  function handleSignup() {
    axios
      .post("/api/member/add", { email, password, nickName })
      .then(() => {
        toast({
          status: "success",
          position: "top",
          description: "회원가입 성공!",
        });
      })
      .catch(() =>
        toast({
          status: "error",
          description: "회원가입 실패!",
          position: "top",
        }),
      );
  }

  let isDisabled = false;

  let isPasswordCheck = password === passwordCheck;

  if (!isPasswordCheck) {
    isDisabled = true;
  }

  return (
    <Box>
      <Box>회원 가입</Box>
      <Box>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>비밀번호</FormLabel>
          <Input onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>비밀번호 확인</FormLabel>
          <Input onChange={(e) => setPasswordCheck(e.target.value)} />
          {isPasswordCheck || (
            <FormHelperText>비밀번호가 다릅니다</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>닉네임</FormLabel>
          <Input onChange={(e) => setNickName(e.target.value)} />
        </FormControl>
      </Box>
      <Box>
        <Button
          onClick={handleSignup}
          colorScheme={"blue"}
          isDisabled={isDisabled}
        >
          회원가입
        </Button>
      </Box>
    </Box>
  );
}
