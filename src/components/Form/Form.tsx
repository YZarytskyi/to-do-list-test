import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/redux-hooks";
import { addNewToDoItem } from "store/toDo/toDoSlice";

const ERROR_MESSAGE = "This field is empty";
const TITLE_NAME = "title";
const DESCRIPTION_NAME = "description";

const Form = () => {
  const dispatch = useAppDispatch();
  const toDoList = useAppSelector((state) => state.toDo.toDoList);

  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState(false);

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    if (target.name === TITLE_NAME) {
      setTitle(target.value);
      target.value && setTitleError(false);
      return;
    }
    setDescription(target.value);
    target.value && setDescriptionError(false);
  };

  const validate = () => {
    if (!title) {
      setTitleError(true);
    }
    if (!description) {
      setDescriptionError(true);
    }
  };

  const onSubmitCreateNewToDo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!title || !description) {
      validate();
      return;
    }

    const newToDo = {
      id: toDoList.length + 1,
      title,
      description,
      status: false,
    };

    dispatch(addNewToDoItem(newToDo));
    setDescription("");
    setTitle("");
  };

  return (
    <form onSubmit={onSubmitCreateNewToDo}>
      <div>
        <label>
          Title:
          <input
            type="text"
            name={TITLE_NAME}
            placeholder="Enter title"
            value={title}
            onChange={onChangeHandler}
            className={titleError ? "input__error" : ""}
          />
        </label>
        {titleError && <p className="text__error">{ERROR_MESSAGE}</p>}
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            name={DESCRIPTION_NAME}
            placeholder="Enter description"
            value={description}
            onChange={onChangeHandler}
            className={descriptionError ? "input__error" : ""}
          />
        </label>
        {descriptionError && <p className="text__error">{ERROR_MESSAGE}</p>}
      </div>
      <button type="submit" className="form__submitBtn">
        Create
      </button>
    </form>
  );
};

export default Form;
