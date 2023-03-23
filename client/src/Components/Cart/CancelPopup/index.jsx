import { useDispatch } from "react-redux";

import "./styles.scss";
import { setCartStatus } from "../../../store/slices/cartSlice";
import { saveCart } from "../../../store/asyncThunks/cartThunk";
import FullScreenPopup from "../../FullScreenPopup";

const CancelPopup = ({ setIsCancelPopuplVisible }) => {
  const dispatch = useDispatch();

  const cancelCart = (e) => {
    e.preventDefault();
    dispatch(setCartStatus("cancelled"));
    dispatch(saveCart()).then(() => setIsCancelPopuplVisible(false));
  };

  return (
    <FullScreenPopup>
      <div className="cancelpopup">
        <p className="cancelpopup__text">
          Are you sure you want to cancel this list?
        </p>
        <div className="cancelpopup__buttons">
          <button
            className="cancelpopup__buttons--cancel"
            onClick={() => setIsCancelPopuplVisible(false)}
          >
            cancel
          </button>
          <button className="cancelpopup__buttons--yes" onClick={cancelCart}>
            Yes
          </button>
        </div>
      </div>
    </FullScreenPopup>
  );
};

export default CancelPopup;
