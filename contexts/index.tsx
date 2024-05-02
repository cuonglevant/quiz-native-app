import { createContext, useEffect, useReducer } from "react";
import {
  AppAction,
  ChildrenProps,
  InitialProps,
  QuestionsProps,
} from "../utils/interface";
import { LOADING, QUESTIONS } from "./actionTypes";
import { initialState } from "./state";
import { ContextReducers } from "../reducers";
import { serverUrl } from "../utils/routes";

// Create the context
const MyContext = createContext<{
  state: InitialProps;
  dispatch: React.Dispatch<AppAction>;
}>({ state: initialState, dispatch: () => null });

export const ContextProvider = ({ children }: ChildrenProps) => {
  const [state, dispatch] = useReducer(ContextReducers, initialState);

  const getFetchData = async (): Promise<void> => {
    dispatch({ type: LOADING, payload: true });
    try {
      let url = `${serverUrl}`;
      const response = await fetch(url);
      const resp = await response.json();
      if (resp && resp.results.length > 0)
        return dispatch({ type: QUESTIONS, payload: resp.results });
      else dispatch({ type: QUESTIONS, payload: [] as QuestionsProps[] });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: LOADING, payload: false });
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
