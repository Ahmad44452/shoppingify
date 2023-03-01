import "./styles.scss";
import { useSelector } from "react-redux";

const LoadingScreen = () => {
  const loadingStack = useSelector((state) => state.loadingSlice.loadingStack);

  return loadingStack.length !== 0 ? (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
    </div>
  ) : null;
};

export default LoadingScreen;
