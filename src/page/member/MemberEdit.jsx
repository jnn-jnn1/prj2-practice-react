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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function MemberEdit() {
  const [member, setMember] = useState(null);
  const { id } = useParams();
  const [oldNickName, setOldNickName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isCheckedNickName, setIsCheckedNickName] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => {
        const member1 = res.data;
        setMember({ ...member1, password: "" });
        setOldNickName(member1.nickName);
      })
      .catch(() => toast({ description: "문제발생!" }));
    navigate("/");
  }, []);

  let isDisableNickNameCheckButton = false;

  if (member.nickName === oldNickName) {
    isDisableNickNameCheckButton = true;
  }

  if (member.nickName.trim().length === 0) {
    isDisableNickNameCheckButton = true;
  }

  let isDisableSaveButton = false;

  if (isCheckedNickName) {
    isDisableSaveButton = true;
  }

  if (passwordCheck !== member.password) {
    isDisableSaveButton = true;
  }

  if (member.nickName.trim().length === 0) {
    isDisableSaveButton = true;
  }

  function handleUpdate() {}

  function handleCheckNickName() {}

  if (member.password)
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
              onChange={(e) =>
                setMember({ ...member, password: e.target.value })
              }
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
            <InputGroup mr={1} w={"75px"}>
              <Input
                defaultValue={member.nickName}
                onChange={(e) => {
                  const newNickName = e.target.value.trim();
                  setMember({ ...member, nickName: newNickName });
                  setIsCheckedNickName(newNickName === oldNickName);
                }}
              />
              <InputRightElement
                size={"sm"}
                onClick={handleCheckNickName}
                isDiabled={isDisableNickNameCheckButton}
              >
                중복확인
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
        <Box>
          <Button
            colorScheme={"blue"}
            isDisable={isDisableSaveButton}
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
