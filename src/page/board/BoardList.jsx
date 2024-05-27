import {
  Box,
  Button,
  Center,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    axios.get(`/api/board/list?${searchParams}`).then((res) => {
      setBoardList(res.data.boardList);
      setPageInfo(res.data.pageInfo);
    });
  }, [searchParams]);

  let pageNumbers = [];

  for (let i = pageInfo.leftPageNumber; i < pageInfo.rightPageNumber + 1; i++) {
    pageNumbers.push(i);
  }

  function handlePage(pageNumber) {
    searchParams.set("page", pageNumber);
    navigate(`/?page=${pageNumber}`);
  }

  return (
    <Box>
      <Box>게시물 목록</Box>
      {boardList.length === 0 && <Center>조회 결과가 없습니다</Center>}
      {boardList.length > 0 && (
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
      )}
      <Center>
        {pageInfo.prevPageNumber && (
          <>
            <Button onClick={() => navigate("/?page=1")}>맨앞</Button>
            <Button
              onClick={() => navigate(`/?page=${pageInfo.prevPageNumber}`)}
            >
              이전
            </Button>
          </>
        )}
        <Box>
          {pageNumbers.map((pageNumber) => (
            <Button
              colorScheme={
                pageNumber === pageInfo.currentPageNumber ? "blue" : "gray"
              }
              key={pageNumber}
              onClick={() => handlePage(pageNumber)}
            >
              {pageNumber}
            </Button>
          ))}
        </Box>
        {pageInfo.nextPageNumber && (
          <>
            <Button
              onClick={() => navigate(`/?page=${pageInfo.nextPageNumber}`)}
            >
              다음
            </Button>
            <Button
              onClick={() => navigate(`/?page=${pageInfo.lastPageNumber}`)}
            >
              맨끝
            </Button>
          </>
        )}
      </Center>
    </Box>
  );
}
