import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import "./toaster.css";

const Toaster = props => {
    const { toastMessage = "", toastVisible = false } = props;

    return (
        toastMessage &&
        toastVisible && (
            <ToastContainer className='p-10 pos-top-end'>
                <Toast className='bg-success p-1'>
                    <Toast.Body className='d-flex justify-content-between'>
                        <h4 className='text-white fs-24'>{toastMessage}</h4>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        )
    );
};
export default React.memo(Toaster);
