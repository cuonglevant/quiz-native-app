import { LOADING, QUESTIONS } from "../contexts/actionTypes";

export type NavigationProps = {
  Home: undefined;
};

export type ChildrenProps = {
  children: React.ReactNode;
};

export type QuestionsProps = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
};

export interface InitialProps {
  loading: boolean;
  questions: QuestionsProps[];
  correct: number;
  index: number;
}

export type AppAction =
  | { type: typeof LOADING; payload: boolean }
  | { type: typeof QUESTIONS; payload: Array<QuestionsProps> };
