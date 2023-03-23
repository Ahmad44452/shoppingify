import "./styles.scss";
import FullScreenPopup from "../../FullScreenPopup";

const CompletePopup = ({ setIsCompletePopupVisible, completeCart }) => {
  return (
    <FullScreenPopup>
      <div className="completepopup">
        <p className="completepopup__text">
          You didn't buy all products in list. Are you sure that you want to
          complete this list?
        </p>
        <div className="completepopup__buttons">
          <button
            className="completepopup__buttons--cancel"
            onClick={() => setIsCompletePopupVisible(false)}
          >
            cancel
          </button>
          <button
            className="completepopup__buttons--yes"
            onClick={(e) => {
              e.preventDefault();
              completeCart();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </FullScreenPopup>
  );
};

export default CompletePopup;
