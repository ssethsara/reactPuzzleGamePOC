import TorchImage from "../../assets/images/torch.png";

const Modal = ({ text, time, onModalClosed }) => {
 return (
  <>
   <div id="myModal" className="modal">
    <div className="modal-content">
     <span className="close" onClick={onModalClosed}>
      &times;
     </span>
     <img className="torchImage" alt="torchImage" src={TorchImage}></img>
     <div className="modal-items">
      <p className="modal-title">{text}</p>
      <p className="modal-text">Time: {time}</p>
     </div>
    </div>
   </div>
  </>
 );
};
export default Modal;
