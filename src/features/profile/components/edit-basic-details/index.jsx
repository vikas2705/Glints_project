import React, { useState } from "react";
import _ from "lodash";
import { Modal } from "react-bootstrap";
import * as filestack from "filestack-js";
import "./editBasicDetails.css";

const client = filestack.init("AyAYt2XAJSmOSJsWHCYD6z");

const EditBasicDetails = props => {
    const {
        basicDetails = {},
        closeEditModal,
        onSaveData,
        showEditModal,
    } = props;

    const [initialBasicDetails, setInitialBasicDetails] = useState({
        ...basicDetails,
    });
    const {
        profileImageUrl,
        name,
        age,
        location,
        profileSummary,
        profileDescription,
    } = initialBasicDetails;

    const uploadNewImage = result => {
        const { filesUploaded = [] } = result;
        const imgUrl = filesUploaded[0]?.url || "";

        if (imgUrl) {
            handleUpdateImage(imgUrl);
        }
    };

    const handleUpdateImage = (url = "") => {
        const tempBasicDetails = { ...initialBasicDetails };
        tempBasicDetails.profileImageUrl = url;
        setInitialBasicDetails(tempBasicDetails);
    };

    const handleUpload = () => {
        const options = {
            maxFiles: 1,
            accept: ["image/png", "image/jpg", "image/jpeg", "image/gif"],
            uploadInBackground: false,
            onUploadDone: res => uploadNewImage(res),
        };

        client.picker(options).open();
    };

    const handleSubmitBasicDetails = e => {
        onSaveData(initialBasicDetails);
        closeEditModal();
        e.preventDefault();
    };

    const handleChangeBasicDetails = e => {
        const tempBasicDetails = { ...initialBasicDetails };
        const value = encodeURI(e.target.value);

        if (e.target.name === "name") {
            tempBasicDetails.name = value;
        } else if (e.target.name === "age") {
            tempBasicDetails.age = value;
        } else if (e.target.name === "location") {
            tempBasicDetails.location = value;
        } else if (e.target.name === "profileSummary") {
            tempBasicDetails.profileSummary = value;
        } else if (e.target.name === "profileDescription") {
            tempBasicDetails.profileDescription = value;
        }

        setInitialBasicDetails(tempBasicDetails);
    };

    return (
        <Modal
            show={showEditModal}
            onHide={closeEditModal}
            backdrop='static'
            keyboard={false}
            centered
            size='lg'
        >
            <Modal.Header>
                <Modal.Title>Edit Basic Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmitBasicDetails}>
                    <div className='row input-group align-items-center'>
                        <div
                            className={`${
                                profileImageUrl ? "col-sm-4" : "col-sm-2"
                            }`}
                        >
                            {profileImageUrl && (
                                <img
                                    src={profileImageUrl}
                                    alt='profile of the user'
                                    className='profile-img'
                                />
                            )}
                            {!profileImageUrl && (
                                <i className='bi bi-person-circle fs-120'></i>
                            )}
                        </div>

                        <div className='col-sm-6'>
                            {profileImageUrl && (
                                <div
                                    className='action-link'
                                    onClick={() => {
                                        handleUpdateImage();
                                    }}
                                >
                                    Remove Image
                                </div>
                            )}

                            <div className='action-link' onClick={handleUpload}>
                                Upload new Image
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='row input-group'>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            className='form-control m-1'
                            required
                            placeholder='Enter full name..'
                            onChange={handleChangeBasicDetails}
                        />
                    </div>

                    <div className='row input-group'>
                        <input
                            type='text'
                            name='age'
                            className='form-control m-1'
                            value={age}
                            placeholder='Enter age'
                            required
                            onChange={handleChangeBasicDetails}
                        />
                        <input
                            type='text'
                            name='location'
                            value={location}
                            required
                            className='form-control m-1'
                            placeholder='Country of Residence'
                            onChange={handleChangeBasicDetails}
                        />
                    </div>

                    <div className='row input-group'>
                        <textarea
                            name='profileSummary'
                            className='form-control m-1'
                            placeholder='Enter summary of profile, in upto 200 words'
                            onChange={handleChangeBasicDetails}
                            value={profileSummary}
                            required
                        />
                    </div>

                    <div className='row input-group'>
                        <textarea
                            name='profileDescription'
                            className='form-control m-1'
                            placeholder='Enter detailed profile description, upto 3000 words'
                            onChange={handleChangeBasicDetails}
                            rows={8}
                            value={profileDescription}
                            required
                        />
                    </div>
                    <hr />
                    <div className='input-group m-1'>
                        <button
                            className='btn btn-secondary form-control m-1'
                            onClick={closeEditModal}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='btn btn-primary form-control m-1'
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default React.memo(EditBasicDetails);
