import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Checkbox,
  Flex,
  List,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Task } from "@prisma/client";
import TaskDeleteButton from "./TaskDeleteButton";
import getDatetime from "../features/getDatetime";

export const AllTasksQuery = gql`
  query {
    tasks {
      id
      title
      done
      createdAt
      updatedAt
    }
  }
`;

const UpdateTaskMutation = gql`
  mutation UpdateTask($id: Int!, $title: String!, $done: Boolean!) {
    updateTask(id: $id, title: $title, done: $done) {
      id
    }
  }
`;

const TaskList: React.FC = () => {
  const { data, loading, error } = useQuery(AllTasksQuery);
  const [updateTask, mutation] = useMutation(UpdateTaskMutation, {
    refetchQueries: [AllTasksQuery],
  });

  const handleCheckboxClick = (task: Task) => {
    updateTask({
      variables: {
        id: task.id,
        title: task.title,
        done: !task.done,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (mutation.error) return <p>Error: {mutation.error.message}</p>;

  const tasks = [...data.tasks].sort((a: Task, b: Task) => b.id - a.id);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Todoの内容</Th>
            <Th>作成日時</Th>
            <Th>最終更新日時</Th>
            <Th>削除ボタン</Th>
          </Tr>
        </Thead>
        {tasks.map((task: Task) => (
          <Tbody key={task.id}>
            <Tr>
              <Td>
                <Checkbox
                  colorScheme="teal"
                  isChecked={task?.done}
                  onChange={() => handleCheckboxClick(task)}
                >
                  {task.title}
                </Checkbox>
              </Td>

              <Td>{getDatetime(task.createdAt)}</Td>
              <Td>{getDatetime(task.updatedAt)}</Td>
              <Td>
                <TaskDeleteButton taskId={task.id} />
              </Td>
            </Tr>
          </Tbody>
        ))}
      </Table>
    </TableContainer>
  );
};

export default TaskList;
