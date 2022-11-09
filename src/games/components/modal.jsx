const Modal = ({ text, time, onModalClosed }) => {
    return (<>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close" onClick={onModalClosed}>&times;</span>
                <div className="modal-items">
                    <p>{text}</p>
                    <p>Time : {time}</p>
                </div>
            </div>

        </div>
    </>)
}
export default Modal;