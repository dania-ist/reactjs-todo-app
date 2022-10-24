import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { format } from "date-fns";

import styles from "../styles/modules/todoItem.module.scss";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../redux/slices/todoSlice";
import toast from "react-hot-toast";
import TodoModal from "./TodoModal";
import CheckedButton from "./CheckedButton";

const TodoItem = ({ todo }) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo Deleted Successfully");
  };
  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };
  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? "incomplete" : "complete" })
    );
  };
  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
          <CheckedButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={`${styles.todoText} ${
                todo.status === "complete" && styles["todoText--completed"]
              }`}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.time), "p, MM/dd/yyyy")}
            </p>
          </div>
        </div>

        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </>
  );
};

export default TodoItem;
