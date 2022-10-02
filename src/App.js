import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

function App() {
  const [todos, setTodos] = useState([]);
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState(1);
  const usersCollectionRef = collection(db, "todos");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log(data.docs);
      setTodos(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    };

    getUsers();
  }, []);

  const createTodo = async () => {
    console.log("in");
    await addDoc(usersCollectionRef, {
      desc: desc,
      priority: priority,
      done: false,
    });
  };

  const updateTodo = async (id, done) => {
    console.log("in", id);
    if (done === false) {
      const todoDoc = doc(db, "todos", id);
      await updateDoc(todoDoc, { done: true });
    }
  };

  return (
    <div className="App">
      <Form>
        <Form.Group className="mb-3 p-3" controlId="formTodoDesc">
          <Form.Label>Todo Description</Form.Label>
          <Form.Control
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            type="text"
            placeholder="Enter Todo Description"
          />
          <Form.Text className="text-muted">
            Write here what is left for you to do.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 p-3" controlId="formTodoPriority">
          <Form.Label>Priority</Form.Label>
          <Form.Control
            type="number"
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
            }}
            placeholder="From 1 to 10"
            min={1}
            max={10}
          />
        </Form.Group>
        <Button variant="info" onClick={createTodo}>
          Submit
        </Button>
      </Form>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Description</th>
            <th>Priority</th>
            <th>Done</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr>
                <td>{todo.desc}</td>
                <td>{todo.priority}</td>
                <td>Done: {todo.done === true ? "YES" : "NO"}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      updateTodo(todo.id, todo.done);
                    }}
                  >
                    Done
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
