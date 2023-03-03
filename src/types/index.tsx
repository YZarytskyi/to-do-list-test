export interface IToDoItemPayload {
  title: string;
  description: string;
  status: boolean;
}

export interface IToDoItem extends IToDoItemPayload{
  id: number;
}
