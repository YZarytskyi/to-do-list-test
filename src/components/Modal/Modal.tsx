import { FC, Dispatch, SetStateAction, MouseEvent, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalToDoProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onChangeStatus: () => void;
  title: string;
  description: string;
  status: boolean;
}

const ModalToDo: FC<ModalToDoProps> = ({
  setShowModal,
  onChangeStatus,
  title,
  description,
  status,
}) => {
  useEffect(() => {
    window.addEventListener("keydown", onPressEsc);

    return () => {
      window.removeEventListener("keydown", onPressEsc);
    };
  }, []);
  
  function onPressEsc(e: KeyboardEvent) {
    if (e.code === "Escape") {
      setShowModal(false);
    }
  }

  function onClickCloseModal(
    e: MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  }

  return createPortal(
    <div onClick={onClickCloseModal} className="modal__backdrop">
      <div className="modal">
        <h1 className="modal__title">{title}</h1>
        <p className="modal__description">Description:</p>
        <p>{description}</p>
        <p>
          Status:{" "}
          <input type="checkbox" checked={status} onChange={onChangeStatus} />
        </p>
        <button type="button" onClick={onClickCloseModal}>
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ModalToDo;
