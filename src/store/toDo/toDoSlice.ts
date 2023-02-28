import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToDoItem } from "types";

export interface ToDoInitialState {
  toDoList: IToDoItem[];
}

const initialState: ToDoInitialState = {
  toDoList: [],
};

export const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    addNewToDoItem: (state, { payload }: PayloadAction<IToDoItem>) => {
      state.toDoList = [...state.toDoList, payload];
    },
    setToDoItemStatus: (state, { payload }: PayloadAction<number>) => {
      const todoItem = state.toDoList.find(item => item.id === payload) as IToDoItem;
      todoItem.status = !todoItem.status;
    },
  },
});

export const { addNewToDoItem, setToDoItemStatus } = toDoSlice.actions;
export const toDoReducer = toDoSlice.reducer;
