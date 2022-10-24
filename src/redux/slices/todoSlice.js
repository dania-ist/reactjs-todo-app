import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
  const localTodoList = localStorage.getItem("todoList");
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  localStorage.setItem("todoList", []);
  return [];
};

const initialState = {
  filterStatus: "all",
  todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = localStorage.getItem("todoList");
      console.log("action.payload", action.payload);
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        localStorage.setItem(
          "todoList",
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    updateTodo: (state, action) => {
      const todoList = localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
          }
        });
        localStorage.setItem("todoList", JSON.stringify(todoListArr));
        state.todoList = [...todoListArr];
      }
    },
    deleteTodo: (state, action) => {
      const todoList = localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        const newArray = todoListArr.filter(
          (todo) => todo.id !== action.payload
        );
        console.log(newArray);
        localStorage.setItem("todoList", JSON.stringify(newArray));
        state.todoList = newArray;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, updateFilterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
