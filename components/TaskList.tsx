import { gql, useQuery } from "@apollo/client";
import { Checkbox, List, ListItem } from "@chakra-ui/react";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

export const AllTasksQuery = gql`
  query {
    tasks {
      id
      title
      done
    }
  }
`;

interface taskProp {
  id: Key | null | undefined;
  title:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  done: boolean | undefined;
}

const TaskList: React.FC = () => {
  const { data, loading, error } = useQuery(AllTasksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <List>
      {data.tasks.map((task: taskProp) => (
        <ListItem key={task.id}>
          <Checkbox colorScheme="teal" isChecked={task.done}>
            {task.title}
          </Checkbox>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
