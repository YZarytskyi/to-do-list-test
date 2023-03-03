import React, { FC, MouseEventHandler, useState } from 'react';
import { IToDoItem } from 'types';
import Modal from 'components/Modal/Modal';

interface ToDoItemProps {
  setToDoItemStatus: (id: number) => void;
  item: IToDoItem;
}

const ToDoItem: FC<ToDoItemProps> = ({ setToDoItemStatus, item }) => {
  const { id, title, description, status } = item;

  const [showModal, setShowModal] = useState(false);

  const onChangeStatus = () => {
    setToDoItemStatus(id);
  };

  const onClickModalOpen: MouseEventHandler<HTMLTableRowElement> = e => {
    if ((e.target as HTMLElement).tagName === 'INPUT') {
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
          <input type="checkbox" checked={status} onChange={onChangeStatus} />
        </td>
      </tr>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          onChangeStatus={onChangeStatus}
          title={title}
          description={description}
          status={status}
        />
      )}
    </>
  );
};

export default React.memo(ToDoItem);
