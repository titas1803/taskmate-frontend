import "./App.scss";
import { Header } from "./components/Header/Header";
import { ShowTask } from "./components/ShowTask/ShowTask";
import { AddTask } from "./components/AddTask/AddTask";
import { TaskMasterContest } from "./components/context/TaskMasterContestProvider";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <div className="mx-2">
      <Header />
      <TaskMasterContest>
        <Container className="justify-content-between">
          <Row>
            <Col xl={5}>
              <AddTask />
            </Col>
            <Col xl={7}>
              <ShowTask />
            </Col>
          </Row>
        </Container>
      </TaskMasterContest>
    </div>
  );
}

export default App;
