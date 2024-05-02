import { SafeAreaView } from "react-native";
import { Questions } from "../components";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#295a6e] mt-9">
      <Questions />
    </SafeAreaView>
  );
};

export default HomeScreen;
