import { createContext, useReducer, useContext } from "react";

const initialState = {
  message: "",
  type: "success",
  visible: false,
};

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        visible: true,
      };
    case "HIDE_NOTIFICATION":
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [state, dispatch] = useReducer(NotificationReducer, initialState);

  return (
    <NotificationContext.Provider value={[state, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};


export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext;
