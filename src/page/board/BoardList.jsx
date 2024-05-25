import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
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
            <Th>제목</Th>
            <Th>작성자</Th>
            <Th>작성일자</Th>
          </Tr>
        </Thead>
        <Tbody>
          {boardList.map((board) => (
            <Tr
              key={board.id}
              _hover={{ bgColor: "gray.200" }}
              cursor={"pointer"}
              onClick={() => navigate(`/board/${board.id}`)}
            >
              <Td>{board.id}</Td>
              <Td>{board.title}</Td>
              <Td>{board.writer}</Td>
              <Td>{board.dateAndTime}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
