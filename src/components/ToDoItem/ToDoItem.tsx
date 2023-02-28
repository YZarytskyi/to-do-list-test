import { FC, MouseEventHandler, useRef, useState } from "react";
import { IToDoItem } from "types";
import Modal from "components/Modal/Modal";
import { useAppDispatch } from "store/redux-hooks";
import { setToDoItemStatus } from "store/toDo/toDoSlice";

interface ToDoItemProps {
  item: IToDoItem;
}

const ToDoItem: FC<ToDoItemProps> = ({ item }) => {
  const { id, title, description, status } = item;

  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeStatus = () => {
    dispatch(setToDoItemStatus(id));
  };

  const onClickModalOpen: MouseEventHandler<HTMLTableRowElement> = (e) => {
    if (e.target === inputRef?.current) {
      return;
    }
    setShowModal(true);
  };

  const sliceText = (str: string) => {
    return str.length > 20 ? `${str.slice(0, 20)}...` : str;
  };

  return (
    <>
      <tr onClick={onClickModalOpen}>
        <td>{id}</td>
        <td>{sliceText(title)}</td>
        <td>{sliceText(description)}</td>
        <td>
          <input
            type="checkbox"
            checked={status}
            onChange={onChangeStatus}
            ref={inputRef}
          />
        </td>
      </tr>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onChangeStatus={onChangeStatus}
        title={title}
        description={description}
        status={status}
      />
    </>
  );
};

export default ToDoItem;
