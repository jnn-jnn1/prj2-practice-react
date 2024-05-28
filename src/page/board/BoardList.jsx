import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pageInfo, setPageInfo] = useState({});
  const [searchType, setSearchType] = useState("all");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios.get(`/api/board/list?${searchParams}`).then((res) => {
      setBoardList(res.data.boardList);
      setPageInfo(res.data.pageInfo);
    });

    setKeyword("");
    setSearchType("all");

    const typeParam = searchParams.get("type");
    const keywordParam = searchParams.get("keyword");

    if (typeParam) {
      setSearchType(typeParam);
    }

    if (keywordParam) {
      setKeyword(keywordParam);
    }
  }, [searchParams]);

  let pageNumbers = [];

  for (let i = pageInfo.leftPageNumber; i < pageInfo.rightPageNumber + 1; i++) {
    pageNumbers.push(i);
  }

  function handlePage(pageNumber) {
    searchParams.set("page", pageNumber);
    navigate(`/?${searchParams}`);
  }

  function handleSearchClick() {
    navigate(`/?type=${searchType}&keyword=${keyword}`);
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
                <Td>
                  {board.title}
                  <Badge m={1}>
                    {board.numberOfImages > 0 && (
                      <Flex>
                        <FontAwesomeIcon icon={faImage} />
                        <Text>{board.numberOfImages}</Text>
                      </Flex>
                    )}
                  </Badge>
                </Td>
                <Td>{board.writer}</Td>
                <Td>{board.dateAndTime}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <Center>
        <Flex>
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value={"all"}>제목, 내용, 작성자</option>
            <option value={"text"}>제목, 내용</option>
            <option value={"nickName"}>작성자</option>
          </Select>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={"검색어"}
          />
          <Button onClick={handleSearchClick}>조회</Button>
        </Flex>
      </Center>
      <Center>
        {pageInfo.prevPageNumber && (
          <>
            <Button onClick={() => handlePage(1)}>맨앞</Button>
            <Button onClick={() => handlePage(pageInfo.prevPageNumber)}>
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
            <Button onClick={() => handlePage(pageInfo.nextPageNumber)}>
              다음
            </Button>
            <Button onClick={() => handlePage(pageInfo.lastPageNumber)}>
              맨끝
            </Button>
          </>
        )}
      </Center>
    </Box>
  );
}
