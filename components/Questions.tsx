import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import MyContext from "../contexts";
import HTML from "react-native-render-html";
import { Foundation } from "@expo/vector-icons";

const Questions = () => {
  const { state } = useContext(MyContext);
  const { width } = useWindowDimensions();
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [modifiedQuestion, setModifiedQuestion] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { question, incorrect_answers, correct_answer } =
    state.questions && state.questions[state.index]
      ? state.questions[index]
      : { question: "", incorrect_answers: [], correct_answer: "" };

  useEffect(() => {
    let tempAnswers = [...incorrect_answers];
    const tempIndex = Math.floor(Math.random() * 4);
    if (tempIndex === 3) {
      tempAnswers.push(correct_answer);
    } else {
      tempAnswers.push(tempAnswers[tempIndex]);
      tempAnswers[tempIndex] = correct_answer;
    }
    setAnswers(tempAnswers);

    const sentence = question.split(" ");
    sentence.splice(1, 0, "_______");
    setModifiedQuestion(sentence.join(" "));
  }, [question]);

  const handleAnswerSelection = (answer: string, index: number) => {
    setSelectedAnswer(answer);
    setSelectedIndex(index);
    const sentence = modifiedQuestion.split(" ");
    sentence[1] = `<span>${answer}</span>`;
    setModifiedQuestion(sentence.join(" "));
  };

  const CheckAnswer = () => {
    setIsCheck(true);
    if (correct_answer === selectedAnswer) setIsCorrect(true);
    else setIsCorrect(false);
  };

  const renderAnswerOptions = (start: number, end: number) => (
    <TouchableOpacity className="flex flex-row flex-wrap justify-center items-center">
      {answers.slice(start, end).map((answer, index) => (
        <Text
          key={`${start}-${index}`}
          className={`${
            selectedIndex === start + index
              ? "bg-gray-400 text-gray-400"
              : "bg-gray-200 text-gray-900"
          } py-3 px-5 mx-3 mb-4 rounded-full font-semibold`}
          onPress={() => handleAnswerSelection(answer, start + index)}
        >
          {answer}
        </Text>
      ))}
    </TouchableOpacity>
  );

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > state.questions.length - 1) {
        return 0;
      } else {
        return index;
      }
    });
    setSelectedAnswer("");
    setSelectedIndex(null);
    setIsCheck(false);
  };

  const tagsStyle = {
    span: {
      textDecorationLine: "underline" as "underline",
      fontWeight: "500" as "500",
    },
    body: { color: "#fff", lineHeight: 22, fontWeight: "200" as any },
  };

  const tagsStyles = {
    span: {
      color: `${selectedAnswer && !isCheck ? "#222" : "#fff"}`,
      backgroundColor: `${
        selectedAnswer && !isCheck
          ? "#fff"
          : isCheck && isCorrect
          ? "rgb(74 222 128)"
          : "rgb(248 113 113)"
      }`,
      padding: 10,
      marginHorizontal: 10,
      marginBottom: 10,
      borderRadius: 10,
    },
    body: { color: "#fff", lineHeight: 22, fontWeight: "400" as "400" },
  };

  const buttonStyle = `py-[20] px-[100] mx-3 mb-4 rounded-full font-semibold uppercase shadow-2xl`;

  if (state.loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-50 font-semibold text-lg leading-10 tracking-tight">
          Loading...
        </Text>
      </View>
    );
  }

  if (!state.loading && state.questions.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-50 font-semibold text-lg leading-10 tracking-tight">
          No questions found!!
        </Text>
      </View>
    );
  }

  return (
    <>
      <View className="absolute top-9 left-0 right-0">
        <View className="flex flex-col justify-center items-center">
          <Text className="font-medium text-md leading-9 tracking-normal pt-8 text-gray-50">
            Fill in the missing word
          </Text>
          <View className="py-1 pb-3 text-gray-50 px-9">
            <HTML
              tagsStyles={tagsStyle}
              source={{ html: modifiedQuestion }}
              contentWidth={width}
            />
          </View>
          <View className="py-3 text-gray-50 px-9 mt-8">
            <HTML
              tagsStyles={tagsStyles}
              source={{ html: modifiedQuestion }}
              contentWidth={width}
            />
          </View>
          <View className="mt-5">
            {renderAnswerOptions(0, 2)}
            {renderAnswerOptions(2, 4)}
          </View>
        </View>
      </View>
      <View
        className={`absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center h-40 ${
          selectedAnswer && isCheck
            ? `${
                isCorrect ? "bg-[#29e3d7]" : "bg-red-400"
              } rounded-tl-2xl rounded-tr-2xl`
            : ""
        }`}
      >
        {isCheck && (
          <View className="py-1 flex flex-row px-[75] justify-between items-center w-full">
            <Text className="text-white font-bold leading-10 tracking-tight">
              {isCorrect ? "Great Job!" : `Answer: ${correct_answer}`}
            </Text>
            <Foundation name="flag" size={24} color="white" />
          </View>
        )}
        <TouchableOpacity>
          <Text
            onPress={
              isCheck
                ? nextQuestion
                : selectedAnswer
                ? CheckAnswer
                : nextQuestion
            }
            className={`${buttonStyle} ${
              isCheck
                ? `bg-white ${isCorrect ? "text-[#29e3d7]" : "text-red-400"}`
                : `text-white ${
                    selectedAnswer ? "bg-[#29e3d7]" : "bg-[#86afbf]"
                  }`
            }`}
          >
            {isCheck
              ? "Continue"
              : selectedAnswer
              ? "Check Answer"
              : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Questions;
