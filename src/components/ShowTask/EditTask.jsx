import { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Pen } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { useTaskCtx } from "../hooks/hooks";

export const EditTask = ({ task }) => {
  const [show, setShow] = useState(false);
  const editNameRef = useRef(null);
  const editDetailsRef = useRef(null);
  const editStatusRef = useRef(null);

  const { dispatch } = useTaskCtx();

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const updateTask = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      name: editNameRef.current.value,
      details: editDetailsRef.current.value,
      status: editStatusRef.current.value,
    };
    dispatch({ type: "EDIT", payload: { task: updatedTask } });
    handleClose();
  };

  return (
    <>
      <Button variant="outline-dark me-2" title="Edit" onClick={handleShow}>
        <Pen />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update task details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateTask}>
            <Form.Group controlId="editTaskName" className="mb-2">
              <Form.Label>Edit Task name</Form.Label>
              <Form.Control
                type="text"
                name="editTaskName"
                placeholder="Add task"
                autoComplete="off"
                defaultValue={task.name}
                required
                ref={editNameRef}
              />
            </Form.Group>
            <Form.Group controlId="editTaskDetails" className="mb-2">
              <Form.Label>Edit Task Details</Form.Label>
              <Form.Control
                type="text"
                name="editTaskDetails"
                required
                placeholder="Task details"
                ref={editDetailsRef}
                defaultValue={task.details}
              />
            </Form.Group>
            <Form.Select
              aria-label="Select Status"
              defaultValue={task.status}
              ref={editStatusRef}
            >
              <option value="PENDING">PENDING</option>
              <option value="COMPLETED">COMPLETED</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={updateTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

EditTask.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};
