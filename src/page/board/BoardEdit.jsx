import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [fileList, setFileList] = useState([]);
  const [removeFileList, setRemoveFileList] = useState([]);
  const [addFileList, setAddFileList] = useState([]);

  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => {
      setBoard(res.data);
      setFileList(res.data.files);
    });
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  function handleEdit() {
    axios
      .postForm("/api/board/edit", {
        id: board.id,
        title: board.title,
        content: board.content,
        removeFileList,
        addFileList,
      })
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
      })
      .finally(() => onClose());
  }

  let isDisable = false;

  if (board.title.trim().length === 0) {
    isDisable = true;
  }

  if (board.content.trim().length === 0) {
    isDisable = true;
  }

  const fileNameList = [];

  for (let addFile of addFileList) {
    let duplicate = false;

    for (let file of fileList) {
      if (file.name === addFile.name) {
        duplicate = true;
        break;
      }
    }
    fileNameList.push(
      <li>
        {addFile.name}
        {duplicate && <Badge colorScheme={"red"}>override</Badge>}
      </li>,
    );
  }

  function handleRemoveSwitchChange(name, checked) {
    if (checked) {
      setRemoveFileList([...removeFileList, name]);
    } else {
      setRemoveFileList(removeFileList.filter((item) => item !== name));
    }
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
        {fileList &&
          fileList.map((file) => (
            <Box key={file.src} border={"2px solid black"} m={3}>
              <Flex>
                <FontAwesomeIcon icon={faTrashCan} />
                <Switch
                  onChange={(e) =>
                    handleRemoveSwitchChange(file.name, e.target.checked)
                  }
                />
                <Text>{file.name}</Text>
              </Flex>
              <Image
                src={file.src}
                sx={
                  removeFileList.includes(file.name)
                    ? { filter: "blur(8px)" }
                    : {}
                }
              />
            </Box>
          ))}
      </Box>
      <Box>
        <FormControl>
          <FormLabel>파일</FormLabel>
          <Input
            type={"file"}
            multiple
            accept={"image/*"}
            onChange={(e) => setAddFileList(e.target.files)}
          />
        </FormControl>
      </Box>
      <Box>
        <ul>{fileNameList}</ul>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input defaultValue={board.writer} readOnly />
        </FormControl>
      </Box>
      <Box>
        <Button colorScheme={"blue"} onClick={onOpen} isDisabled={isDisable}>
          저장
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>저장하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button colorScheme={"blue"} onClick={handleEdit}>
              저장
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
