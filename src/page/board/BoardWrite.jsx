import {
  Box,
  Button,
  FormControl,
  FormHelperText,
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
  const [fileList, setFileList] = useState([]);

  function handleSave() {
    setIsLoading(true);
    axios
      .postForm("/api/board/write", { title, content, fileList })
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

  let disableSaveButton = false;
  if (title.trim().length === 0) {
    disableSaveButton = true;
  }

  if (content.trim().length === 0) {
    disableSaveButton = true;
  }

  let fileNameList = [];

  for (let i = 0; i < fileList.length; i++) {
    fileNameList.push(<li key={i}>{fileList[i].name}</li>);
  }

  return (
    <Box>
      <Box>새 글 작성</Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input onChange={(e) => setTitle(e.target.value)} />
          {disableSaveButton && (
            <FormHelperText>제목을 입력해주세요</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>내용</FormLabel>
          <Textarea onChange={(e) => setContent(e.target.value)} />
          {disableSaveButton && (
            <FormHelperText>내용을 입력해주세요</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>파일</FormLabel>
          <Input
            type={"file"}
            multiple
            accept={"image/*"}
            onChange={(e) => setFileList(e.target.files)}
          />
        </FormControl>
      </Box>
      <Box>
        <ul>{fileNameList}</ul>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input value={account.nickName} readOnly />
        </FormControl>
      </Box>
      <Box>
        <Button
          colorScheme={"blue"}
          onClick={handleSave}
          isLoading={isLoading}
          isDisabled={disableSaveButton}
        >
          저장
        </Button>
      </Box>
    </Box>
  );
}
