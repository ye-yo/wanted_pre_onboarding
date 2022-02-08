import { useState } from "react";
import styled from "styled-components";

const ButtonOpenModal = styled.button`
    background-color: ${props => props.theme.colorMain};
    color: white;
    padding: 20px;
    border-radius: 40px;
`
const ModalContainer = styled.div`
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.48);
    z-index: 101;
`
const ModalBlock = styled.div`
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 400px;
    min-height: 120px;
    max-width: 80%;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
`

const ButtonCloseModal = styled.button`
    background-color: transparent;
    width: 32px;
    height: 32px;
    margin-bottom: 10px;
`
const ModalContent = styled.div`
`
function Modal() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <ButtonOpenModal onClick={() => setOpen(true)}>Open Modal</ButtonOpenModal>
            {open &&
                <ModalContainer onClick={e => setOpen(false)}>
                    <ModalBlock onClick={e => e.stopPropagation()}>
                        <ButtonCloseModal onClick={() => setOpen(false)}>X</ButtonCloseModal>
                        <ModalContent>HELLO CODESTATES!</ModalContent>
                    </ModalBlock>
                </ModalContainer>
            }
        </div>
    );
}

export default Modal;
