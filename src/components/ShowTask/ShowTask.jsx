import { useMemo, useState } from "react";
import { Button, Col, Container, Row, Tabs, Tab } from "react-bootstrap";
import {
  ArrowCounterclockwise,
  Check2Square,
  Trash,
} from "react-bootstrap-icons";
import { useTaskCtx } from "../hooks/hooks";
import { EditTask } from "./EditTask";

export const ShowTask = () => {
  const { state: availableTasks, dispatch } = useTaskCtx();
  const [tabKey, setTabKey] = useState("pending");

  const { completedTasks, pendingTasks } = useMemo(() => {
    let completedTasks = [];
    let pendingTasks = [];

    for (let task of availableTasks) {
      if (task.status === "COMPLETED") {
        completedTasks.push(task);
      } else {
        pendingTasks.push(task);
      }
    }
    return { completedTasks, pendingTasks };
  }, [availableTasks]);

  const markCompleted = (id) => {
    dispatch({ type: "DONE", payload: { id } });
    setTabKey("completed");
  };
  const markPending = (id) => {
    dispatch({ type: "PENDING", payload: { id } });
    setTabKey("pending");
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE", payload: { id } });
  };

  const deleteAllTask = () => {
    dispatch({ type: "DELETEALL" });
  };

  return (
    <section className="show-task border border-light border-2 shadow-lg p-3 mb-5 bg-body rounded">
      <div className="d-flex justify-content-between show-tasks-header">
        <div className="d-flex align-center">
          <h3 className="todo">Todo</h3>
          <p className="todo-count fs-4 px-2 ms-2 mb-0 border border-dark rounded">
            {availableTasks.length}
          </p>
        </div>
        <div>
          <Button variant="primary" onClick={deleteAllTask}>
            Clear All
          </Button>
        </div>
      </div>
      <hr />
      <Container className="tasks-section">
        <Tabs
          activeKey={tabKey}
          id="uncontrolled-tab-example"
          className="mb-3"
          onSelect={(k) => setTabKey(k)}
        >
          <Tab eventKey="pending" title="Pending">
            <Row className="justify-content-between">
              {pendingTasks.length === 0 && <p>No task pending</p>}
              {pendingTasks.map((task) => (
                <Col
                  className="task border border-secondary rounded m-3 mx-auto p-2"
                  lg={3}
                  xl={5}
                  key={task.id}
                >
                  <div className="task-header d-flex justify-content-between ">
                    <h3>
                      <i>{task.name}</i>
                    </h3>
                    <div className="task-actions">
                      <Button
                        variant="outline-dark me-2"
                        title="Mark as done"
                        onClick={() => markCompleted(task.id)}
                      >
                        <Check2Square />
                      </Button>
                      <EditTask task={task} />
                      <Button
                        variant="outline-danger"
                        title="Delete"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                  <hr />
                  <div className="task-details">
                    <p className="task-create-time">{task.time}</p>
                    <p>{task.details}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Tab>
          <Tab eventKey="completed" title="Completed">
            <Row className="justify-content-start">
              {completedTasks.length === 0 && <p>No task completed</p>}
              {completedTasks.map((task) => (
                <Col
                  className="task border border-secondary rounded m-3 mx-auto p-2"
                  lg={3}
                  xl={5}
                  key={task.id}
                >
                  <div className="task-header d-flex justify-content-between ">
                    <h3>
                      <i>{task.name}</i>
                    </h3>
                    <div className="task-actions">
                      <Button
                        variant="outline-dark me-2"
                        title="Mark as pending"
                        onClick={() => markPending(task.id)}
                      >
                        <ArrowCounterclockwise fill="currentColor" />
                      </Button>
                      <Button
                        variant="outline-danger"
                        title="Delete"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </div>
                  <hr />
                  <div className="task-details">
                    <p className="task-create-time">{task.time}</p>
                    <p>{task.details}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Tab>
        </Tabs>
      </Container>
    </section>
  );
};
