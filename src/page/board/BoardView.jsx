import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => setBoard(res.data))
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "error",
            description: "해당 게시물이 없습니다",
            position: "top",
          });
        }
      });
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  function handleDelete() {
    axios
      .delete("/api/board/delete")
      .then(() => {
        toast({
          status: "success",
          description: "게시물 삭제 성공!",
          position: "top",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          description: "게시물 삭제 실패!",
          position: "top",
        });
      });
  }

  return (
    <Box>
      <Box>{board.id}번 게시물</Box>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input value={board.title} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>내용</FormLabel>
        <Textarea value={board.content} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input value={board.writer} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>작성일자</FormLabel>
        <Input value={board.dateAndTime} readOnly />
      </FormControl>
      <Box>
        <Button
          colorScheme={"blue"}
          onClick={() => navigate(`/board/edit/${id}`)}
        >
          수정
        </Button>
        <Button colorScheme={"red"} onClick={handleDelete}>
          삭제
        </Button>
      </Box>
    </Box>
  );
}
