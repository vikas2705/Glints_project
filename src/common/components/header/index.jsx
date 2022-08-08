import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className='bg-dark p-4'>
            <div className='container  d-flex justify-content-between'>
                <Link
                    className='display-6 text-info py-1 remove-underline'
                    to='/'
                >
                    GLINTS
                </Link>

                <i className='bi bi-person-circle text-info fs-40'></i>
            </div>
        </div>
    );
};

export default Header;
