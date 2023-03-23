import { createPortal } from "react-dom";
import "./styles.scss";

const FullScreenPopup = ({ children }) => {
  return createPortal(<div className="popup">{children}</div>, document.body);
};

export default FullScreenPopup;
