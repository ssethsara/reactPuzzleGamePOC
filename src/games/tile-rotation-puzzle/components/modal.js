const Modal = ({text,time,onModalClosed}) => {


    
    return (<>
        <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close" onClick={onModalClosed}>&times;</span>
                <p>{text}</p>
                <p>Time : {time}</p>
            </div>

        </div>
    </>)
}

export default Modal;