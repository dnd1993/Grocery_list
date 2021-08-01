export const reducer = (state, action) => {
  if (action.type === "LIST_ADD") {
    const newList = [...state.list, action.payload.newItem];
    return {
      ...state,
      showModal: true,
      modalMessage: "Item has been added",
      list: newList,
    };
  }
  if (action.type === "NO_ITEM") {
    return { ...state, showModal: true, modalMessage: "Please enter value" };
  }
  if (action.type === "CLOSE_MODAL") {
    return { ...state, showModal: false };
  }
  if (action.type === "EDIT_ITEM") {
    const currentId = action.payload;
    return { ...state, isEditing: true, currentId };
  }
  if (action.type === "LIST_UPDATE") {
    const currItemIndex = state.list.findIndex(
      (item) => item.id === state.currentId
    );
    state.list[currItemIndex].item = action.payload.item;
    action.payload.setItem("");
    return {
      ...state,
      showModal: true,
      modalMessage: "Item has been edited",
      isEditing: false,
    };
  }
  if (action.type === "DELETE_ITEM") {
    const newList = state.list.filter((item) => item.id !== action.payload);
    return {
      ...state,
      showModal: true,
      modalMessage: "Item has been deleted",
      list: newList,
    };
  }
  if (action.type === "ERASE_ITEMS") {
    const newList = [];
    return {
      ...state,
      showModal: true,
      modalMessage: "List is empty",
      list: newList,
    };
  }
  throw new Error("There is no such action type");
};
