import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
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

export function MemberView() {
  const [member, setMember] = useState(null);
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const account = useContext(LoginContext);

  useEffect(() => {
    axios
      .get(`/api/member/${id}`)
      .then((res) => setMember(res.data))
      .catch(() => {
        toast({
          status: "error",
          description: "권한이 없습니다",
          position: "top",
        });
        navigate(-1);
      });
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  function handleDelete() {
    setIsLoading(true);

    axios
      .delete(`/api/member/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { id, password },
      })
      .then(() => {
        toast({
          status: "success",
          description: "회원 삭제 성공!",
          position: "top",
        });
        navigate("/");
        account.logout();
      })
      .catch(() => {
        toast({
          status: "error",
          description: "회원 삭제 실패!",
          position: "top",
        });
        navigate(-1);
      })
      .finally(() => onClose());
  }

  return (
    <Box>
      <Box>{member.id}번 회원 정보 보기</Box>
      <Box>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input value={member.email} isReadOnly />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>닉네임</FormLabel>
          <Input value={member.nickName} isReadOnly />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>가입일시</FormLabel>
          <Input value={member.signupDateAndTime} isReadOnly />
        </FormControl>
      </Box>
      {account.hasAccess(member.id) && (
        <Box>
          <Button
            colorScheme={"blue"}
            onClick={() => navigate(`/member/edit/${id}`)}
          >
            수정
          </Button>
          <Button colorScheme={"red"} onClick={onOpen}>
            삭제
          </Button>
        </Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>탈퇴 확인</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>암호</FormLabel>
              <Input onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button
              colorScheme={"red"}
              onClick={handleDelete}
              isLoading={isLoading}
            >
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
