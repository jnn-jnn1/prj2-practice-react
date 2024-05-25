import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { LoginContext } from "../../component/LoginProvider.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const account = useContext(LoginContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function handleSave() {
    setIsLoading(true);
    axios
      .post("/api/board/write", { title, content })
      .then(() => {
        toast({
          status: "success",
          position: "top",
          description: "게시물 등록 성공!",
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          position: "top",
          description: "게시물 등록 실패!",
        });
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Box>
      <Box>새 글 작성</Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>내용</FormLabel>
          <Textarea onChange={(e) => setContent(e.target.value)} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input value={account.nickName} readOnly />
        </FormControl>
      </Box>
      <Box>
        <Button colorScheme={"blue"} onClick={handleSave}>
          저장
        </Button>
      </Box>
    </Box>
  );
}
