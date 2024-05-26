import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberEdit() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [oldNickName, setOldNickName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isCheckedNickName, setIsCheckedNickName] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const account = useContext(LoginContext);

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        const member1 = res.data;
        setMember({ ...member1, password: "" });
        setOldNickName(member1.nickName);
      })
      .catch(() => {
        toast({
          status: "warning",
          description: "회원 정보 조회 중 문제가 발생하였습니다.",
          position: "top",
        });
        navigate("/");
      });
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  let isDisableNickNameCheckButton = false;

  let isDisableSaveButton = false;

  if (member.nickName === oldNickName) {
    isDisableNickNameCheckButton = true;
  }
  if (member.nickName.trim().length === 0) {
    isDisableNickNameCheckButton = true;
  }

  if (isCheckedNickName) {
    isDisableSaveButton = true;
  }

  if (passwordCheck !== member.password) {
    isDisableSaveButton = true;
  }

  if (member.nickName.trim().length === 0) {
    isDisableSaveButton = true;
  }

  function handleUpdate() {
    axios
      .put("/api/member/edit", { ...member, oldPassword })
      .then((res) => {
        toast({
          position: "top",
          status: "success",
          description: "수정 성공!",
        });
        navigate(`/member/${id}`);
        account.login(res.data.token);
      })
      .catch(() => {
        toast({
          status: "error",
          description: "수정 실패!",
          position: "top",
        });
      })
      .finally(() => onClose());
  }

  function handleCheckNickName() {
    axios
      .get(`/api/member/check?nickName=${member.nickName}`)
      .then(() => {
        toast({
          status: "info",
          description: "이미 존재하는 닉네임입니다",
          position: "top",
        });
      })
      .catch(() =>
        toast({
          status: "success",
          description: "사용가능한 닉네임입니다",
          position: "top",
        }),
      );
  }

  return (
    <Box>
      <Box>회원 정보 수정</Box>
      <Box>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input readOnly value={member.email} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>비밀번호</FormLabel>
          <Input
            onChange={(e) => setMember({ ...member, password: e.target.value })}
            placeholder={"암호를 변경하려면 입력하세요"}
          />
          <FormHelperText>
            입력하지 않으면 기존 암호를 변경하지 않습니다
          </FormHelperText>
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>비밀번호 확인</FormLabel>
          <Input onChange={(e) => setPasswordCheck(e.target.value)} />
          {member.password === passwordCheck || (
            <FormHelperText>암호가 일치하지 않습니다</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>닉네임</FormLabel>
          <InputGroup>
            <Input
              onChange={(e) => {
                const newNickName = e.target.value.trim();
                setMember({ ...member, nickName: newNickName });
                setIsCheckedNickName(newNickName === oldNickName);
              }}
              value={member.nickName}
            />
            <InputRightElement mr={1} w={"75px"}>
              <Button
                size={"sm"}
                onClick={handleCheckNickName}
                isDisabled={isDisableNickNameCheckButton}
              >
                중복확인
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>
      <Box>
        <Button
          colorScheme={"blue"}
          isDisabled={isDisableSaveButton}
          onClick={onOpen}
        >
          저장
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>비밀번호 확인</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>암호</FormLabel>
              <Input onChange={(e) => setOldPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={handleUpdate}>확인</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
