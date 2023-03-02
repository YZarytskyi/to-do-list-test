import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useRef,
  useState,
} from 'react';
import { IToDoItemPayload } from 'types';

const ERROR_MESSAGE = 'This field is empty';
const TITLE_NAME = 'title';
const DESCRIPTION_NAME = 'description';

interface FormProps {
  addNewToDoItem: (payload: IToDoItemPayload) => void;
}

const Form: FC<FormProps> = ({ addNewToDoItem }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const validate = (title: string, description: string) => {
    !title && setTitleError(true);
    !description && setDescriptionError(true);
  };

  const onSubmitCreateNewToDo: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const title = titleRef.current?.value as string;
    const description = descriptionRef.current?.value as string;

    if (!title || !description) {
      validate(title, description);
      return;
    }

    const newToDo = {
      title,
      description,
      status: false,
    };

    addNewToDoItem(newToDo);
    (e.target as HTMLFormElement).reset();
  };

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.name === TITLE_NAME) {
      titleError && setTitleError(false);
      return;
    }
    descriptionError && setDescriptionError(false);
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
            className={titleError ? 'input__error' : ''}
            onChange={onChangeHandler}
            ref={titleRef}
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
            className={descriptionError ? 'input__error' : ''}
            onChange={onChangeHandler}
            ref={descriptionRef}
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

export default React.memo(Form);
