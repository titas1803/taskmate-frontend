import { Form } from "react-bootstrap";
import { useTaskCtx } from "../hooks/hooks";
import { useRef } from "react";

export const AddTask = () => {
  const { dispatch } = useTaskCtx();
  const nameRef = useRef(null);
  const detailRef = useRef(null);

  const addTask = (e) => {
    e.preventDefault();
    if (nameRef.current && detailRef.current) {
      const task = {
        id: Math.floor(Math.random() * 1000) + 1,
        name: nameRef.current.value,
        details: detailRef.current.value,
        time: new Date().toLocaleString(),
        status: "PENDING",
      };
      dispatch({ type: "ADD", payload: { task: task } });
    }
    e.target.reset();
  };

  return (
    <section className="w-75 w-md-50 w-xl-100 mx-auto border border-primary rounded p-3 my-5">
      <Form onSubmit={addTask}>
        <Form.Group controlId="taskName" className="mb-2">
          <Form.Label>Task name</Form.Label>
          <Form.Control
            type="text"
            name="taskName"
            placeholder="Add task"
            autoComplete="off"
            required
            ref={nameRef}
          />
        </Form.Group>
        <Form.Group controlId="taskDetails" className="mb-2">
          <Form.Label>Task Details</Form.Label>
          <Form.Control
            type="text"
            name="taskDetails"
            required
            placeholder="Task details"
            ref={detailRef}
          />
        </Form.Group>
        <hr />
        <Form.Control
          type="submit"
          value={"Submit"}
          className="btn btn-primary"
        />
      </Form>
    </section>
  );
};
