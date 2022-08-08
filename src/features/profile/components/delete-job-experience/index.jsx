import React from "react";
import _ from "lodash";
import { Modal } from "react-bootstrap";

const DeleteJobExperience = props => {
    const { job, showDeleteModal, closeDeleteModal, onConfirmDeleteJob } =
        props;

    if (_.isEmpty(job)) {
        return null;
    }
    const { jobId = "", jobRole = "", organisation = "" } = job;

    return (
        <Modal
            show={showDeleteModal}
            onHide={closeDeleteModal}
            backdrop='static'
            keyboard={false}
            centered
        >
            <Modal.Header>
                <Modal.Title>Delete job experience?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete the job experience of {jobRole}{" "}
                at {organisation}?
                <hr />
                <div className='input-group m-1'>
                    <button
                        className='btn btn-secondary form-control m-1'
                        onClick={closeDeleteModal}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='btn btn-primary form-control m-1'
                        onClick={() => {
                            onConfirmDeleteJob(jobId);
                        }}
                    >
                        Yes
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default React.memo(DeleteJobExperience);
