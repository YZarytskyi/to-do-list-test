import { useAppSelector } from "store/redux-hooks";
import ToDoItem from "../ToDoItem/ToDoItem";

const Table = () => {
  const toDoList = useAppSelector((state) => state.toDo.toDoList);
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>TITLE</th>
          <th>DESCRIPTION</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody>
        {toDoList.map((item) => (
          <ToDoItem key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
