//payload is an object that contains all the variables that we need to perform the action (one of the types of our despatch func)
//it helps us to get an access to our state variables inside of an Index component which wouldn't be accesible in our Todo comp. otherwise

import React, { useState, useReducer, useRef, useEffect } from "react";
import Modal from "./Modal";
import { reducer } from "./reducer";

const getLocalStorage = () => {
  const list = localStorage.getItem("list");
  if (list) return JSON.parse(list);
  return [];
};

const Index = () => {
  const [item, setItem] = useState("");
  const inputRef = useRef();

  const defVal = {
    isEditing: false,
    showModal: false,
    list: getLocalStorage(),
    currentId: "",
    modalMessage: "hello",
  };
  const [state, dispatch] = useReducer(reducer, defVal);

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const focus = () => {
    inputRef.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    focus();

    if (item) {
      const newItem = { id: new Date().getTime().toString(), item };
      dispatch({ type: "LIST_ADD", payload: { newItem } });
      setItem("");
    } else dispatch({ type: "NO_ITEM", payload: {} });
  };

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const handleEditing = (e) => {
    e.preventDefault();
    dispatch({ type: "LIST_UPDATE", payload: { item, setItem } });
  };

  useEffect(() => {
    focus();
    localStorage.setItem("list", JSON.stringify(state.list));
  });

  return (
    <>
      <section className="grocery-container">
        <h3>Grocery list</h3>
        <form className="grocery-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            value={item}
            name="groceries"
            type="text"
            autocomplete="off"
            placeholder="e.g. tofu"
            onChange={handleChange}
          />
          {state.isEditing ? (
            <button type="submit" onClick={handleEditing}>
              Edit
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </form>
        <ul className="grocery-list">
          {state.list.map((item) => (
            <li key={item.id} className="grocery-list-item">
              <p>{item.item}</p>
              <div>
                <button
                  className="btn-edit"
                  onClick={() => {
                    setItem(item.item);
                    focus();
                    dispatch({ type: "EDIT_ITEM", payload: item.id });
                  }}
                >
                  <i className="far fa-edit"></i>
                </button>
                <button
                  className="btn-delete"
                  onClick={() => {
                    dispatch({ type: "DELETE_ITEM", payload: item.id });
                    focus();
                  }}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
        {state.list.length === 0 || (
          <button onClick={() => dispatch({ type: "ERASE_ITEMS" })}>
            Erase everything
          </button>
        )}
        {state.showModal && (
        <Modal modalMessage={state.modalMessage} closeModal={closeModal} />
      )}
      </section>
      
    </>
  );
};

export default Index;
