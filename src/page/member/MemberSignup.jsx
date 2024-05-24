import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Todo : 이메일 양식 확인

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  const [isCheckedNickName, setIsCheckedNickName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function handleSignup() {
    setIsLoading(true);
    axios
      .post("/api/member/add", { email, password, nickName })
      .then(() => {
        toast({
          status: "success",
          position: "top",
          description: "회원가입 성공!",
        });
        navigate("/");
      })
      .catch(() =>
        toast({
          status: "error",
          description: "회원가입 실패!",
          position: "top",
        }),
      )
      .finally(() => setIsLoading(false));
  }

  function handleCheckEmail() {
    axios
      .get(`/api/member/check?email=${email}`)
      .then(() => {
        toast({
          status: "info",
          description: "이미 존재하는 이메일입니다",
          position: "top",
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "success",
            description: "사용 가능한 이메일입니다",
            position: "top",
          });
          setIsCheckedEmail(true);
        }
      });
  }

  function handleCheckNickName() {
    axios
      .get(`/api/member/check?nickName=${nickName}`)
      .then(() => {
        toast({
          status: "info",
          description: "이미 존재하는 닉네임입니다",
          position: "top",
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "success",
            description: "사용 가능한 닉네임입니다",
            position: "top",
          });
          setIsCheckedNickName(true);
        }
      });
  }

  let isDisabled = false;

  if (
    !(
      email.trim().length > 0 &&
      password.trim().length > 0 &&
      nickName.trim().length > 0
    )
  ) {
    isDisabled = true;
  }

  let isPasswordCheck = password === passwordCheck;

  if (!isPasswordCheck) {
    isDisabled = true;
  }
  if (!isCheckedEmail) {
    isDisabled = true;
  }
  if (!isCheckedNickName) {
    isDisabled = true;
  }

  if (!isValidEmail) {
    isDisabled = true;
  }

  return (
    <Box>
      <Box>회원 가입</Box>
      <Box>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <InputGroup>
            <Input
              type={"email"}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsCheckedEmail(false);
                setIsValidEmail(!e.target.validity.typeMismatch);
              }}
            />
            <InputRightElement onClick={handleCheckEmail} w={"75px"} mr={1}>
              <Button size={"sm"}>중복확인</Button>
            </InputRightElement>
          </InputGroup>
          {isCheckedEmail || (
            <FormHelperText>이메일 중복확인을 해주세요</FormHelperText>
          )}
          {isValidEmail || (
            <FormHelperText>올바른 이메일 형식으로 작성해주세요</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>비밀번호</FormLabel>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>비밀번호 확인</FormLabel>
          <Input
            onChange={(e) => setPasswordCheck(e.target.value)}
            type={"password"}
          />
          {isPasswordCheck || (
            <FormHelperText>비밀번호가 다릅니다</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>닉네임</FormLabel>
          <InputGroup>
            <Input onChange={(e) => setNickName(e.target.value)} />
            <InputRightElement onClick={handleCheckNickName} w={"75px"} mr={1}>
              <Button size={"sm"}>중복확인</Button>
            </InputRightElement>
          </InputGroup>
          {isCheckedNickName || (
            <FormHelperText>닉네임 중복확인을 해주세요</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box>
        <Button
          onClick={handleSignup}
          colorScheme={"blue"}
          isDisabled={isDisabled}
          isLoading={isLoading}
        >
          회원가입
        </Button>
      </Box>
    </Box>
  );
}
