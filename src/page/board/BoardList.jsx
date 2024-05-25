import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    axios.get("/api/board/list").then((res) => {
      setBoardList(res.data);
    });
  }, []);

  return (
    <Box>
      <Box>게시물 목록</Box>
      <Table>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>작성자</Th>
            <Th>작성일자</Th>
          </Tr>
        </Thead>
        <Tbody>
          {boardList.map((member) => (
            <Tr key={member.id}>
              <Td>{member.id}</Td>
              <Td>{member.writer}</Td>
              <Td>{member.dateAndTime}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
