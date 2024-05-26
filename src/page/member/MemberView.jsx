import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function MemberView() {
  const [member, setMember] = useState(null);
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/member/${id}`).then((res) => setMember(res.data));
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios.delete(`/api/${id}`).then().catch();
  }

  return (
    <Box>
      <Box>{member.id}번 회원 정보 보기</Box>
      <Box>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input value={member.email} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>닉네임</FormLabel>
          <Input value={member.nickName} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>가입일시</FormLabel>
          <Input value={member.signupDateAndTime} />
        </FormControl>
      </Box>
      <Box>
        <Button
          colorShceme={"blue"}
          onClick={() => navigate(`/memeber/edit/${id}`)}
        >
          수정
        </Button>
        <Button colorShceme={"red"} onClick={handleDelete}>
          삭제
        </Button>
      </Box>
    </Box>
  );
}
