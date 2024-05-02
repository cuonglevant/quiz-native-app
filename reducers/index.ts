import { LOADING, QUESTIONS } from "../contexts/actionTypes";
import { InitialProps, AppAction } from "../utils/interface";

//All reducers functionalities
export const ContextReducers = (state: InitialProps, action: AppAction) => {
  if (action.type === LOADING) return { ...state, loading: action.payload };
  if (action.type === QUESTIONS) return { ...state, questions: action.payload };
  return { ...state };
};
