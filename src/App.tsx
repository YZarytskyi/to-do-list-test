import { useCallback, useState } from 'react';
import Table from 'components/Table/Table';
import Form from 'components/Form/Form';
import { IToDoItem, IToDoItemPayload } from 'types';
import './App.css';

function App() {
  const [toDoList, setTodoList] = useState<IToDoItem[]>([]);
  const toDoListLength = toDoList.length;

  const addNewToDoItem = useCallback(
    (payload: IToDoItemPayload) => {
      const newToDo = {
        id: toDoListLength + 1,
        ...payload,
      };
      setTodoList(prev => [...prev, newToDo]);
    },
    [toDoListLength]
  );

  const setToDoItemStatus = useCallback((id: number) => {
    setTodoList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  }, []);

  return (
    <div className="App">
      <Form addNewToDoItem={addNewToDoItem} />
      <Table setToDoItemStatus={setToDoItemStatus} toDoList={toDoList} />
    </div>
  );
}

export default App;
