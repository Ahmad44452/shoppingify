import { useDispatch } from "react-redux";

import { setLoading } from "../store/slices/loadingSlice";

const useLoading = () => {
  const dispatch = useDispatch();

  const setGlobalLoading = (loadingState) => {
    dispatch(setLoading(loadingState))
  }

  return setGlobalLoading;
}

export default useLoading;