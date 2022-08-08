import React from "react";
import spinner from "../../../assets/spinnerwheel.gif";

const Loader = () => {
    return (
        <div className='d-flex justify-content-center min-vh-90 align-items-center'>
            <img src={spinner} alt='page loading in progress' />
        </div>
    );
};
export default Loader;
