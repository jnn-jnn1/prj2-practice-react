import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, isClose, onClose } = useDisclosure();

  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => setBoard(res.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  function handleEdit() {
    axios
      .post("/api/board/edit", board)
      .then(() => {
        toast({
          status: "success",
          description: "게시물 수정 성공!",
          position: "top",
        });
        navigate(`/board/${board.id}`);
      })
      .catch(() => {
        toast({
          status: "error",
          description: "게시물 수정 실패!",
          position: "top",
        });
      });
  }

  return (
    <Box>
      <Box>게시물 수정</Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input
            defaultValue={board.title}
            onChange={(e) => setBoard({ ...board, title: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>내용</FormLabel>
          <Textarea
            defaultValue={board.content}
            onChange={(e) => setBoard({ ...board, content: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input defaultValue={board.writer} readOnly />
        </FormControl>
      </Box>
      <Box>
        <Button colorScheme={"blue"} onClick={handleEdit}>
          저장
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}></Modal>
    </Box>
  );
}
