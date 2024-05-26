import {
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberList() {
  const [memberList, setMemberList] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios
      .get("/api/member/list")
      .then((res) => {
        setMemberList(res.data);
      })
      .catch(() => {
        toast({
          status: "error",
          description: "관리자가 아닙니다",
          position: "top",
        });
        navigate("/");
      });
  }, []);

  if (memberList === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>이메일</Th>
            <Th>닉네임</Th>
            <Th>가입일시</Th>
          </Tr>
        </Thead>
        <Tbody>
          {memberList.map((member) => (
            <Tr
              key={member.id}
              onClick={() => navigate(`/member/${member.id}`)}
              _hover={{ bgColor: "gray.200" }}
              cursor={"pointer"}
            >
              <Td>{member.id}</Td>
              <Td>{member.email}</Td>
              <Td>{member.nickName}</Td>
              <Td>{member.signupDateAndTime}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
