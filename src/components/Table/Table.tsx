import { FC } from 'react';
import { IToDoItem } from 'types';
import ToDoItem from '../ToDoItem/ToDoItem';

interface TableProps {
  setToDoItemStatus: (id: number) => void;
  toDoList: IToDoItem[];
}

const Table: FC<TableProps> = ({ setToDoItemStatus, toDoList }) => {
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
        {toDoList.map(item => (
          <ToDoItem
            key={item.id}
            item={item}
            setToDoItemStatus={setToDoItemStatus}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
