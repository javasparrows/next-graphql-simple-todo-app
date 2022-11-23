import { gql, useMutation } from "@apollo/client";
import { Button, FormControl, Input, Stack } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { AllTasksQuery } from "./TaskList";

const CreateTaskMutation = gql`
  mutation CreateTask($title: String!) {
    createTask(title: $title) {
      id
      title
      done
    }
  }
`;

const TaskAddForm: React.FC = () => {
  const [createTask, { error }] = useMutation(CreateTaskMutation, {
    refetchQueries: [AllTasksQuery],
  });

  const handleSubmit = (title: string, resetForm: () => void) => {
    if (!title) return;
    createTask({
      variables: {
        title: title,
      },
    });
    resetForm();
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Formik
      initialValues={{ title: "" }}
      onSubmit={(value, actions) =>
        handleSubmit(value.title, actions.resetForm)
      }
    >
      <Form>
        <Stack direction="row">
          <Field name="title">
            {({ field }: { field: object }) => (
              <FormControl>
                <Input
                  {...field}
                  id="title"
                  type="text"
                  placeholder="Add task"
                />
              </FormControl>
            )}
          </Field>
          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
};

export default TaskAddForm;
