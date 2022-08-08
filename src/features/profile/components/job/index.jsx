import React, { useState } from "react";
import "./job.css";
import clsx from "clsx";
import moment from "moment";
import DeleteJobExperience from "../delete-job-experience";
import AddOrEditJobExperience from "../add-or-edit-job-experience";
import Skill from "../../../../common/components/skill";
import { PRESENT } from "../../../../constants/messages";
import useCheckMobileScreen from "../../../../hooks/useCheckMobileScreen.hook";

const Job = props => {
    const { jobDetail = {}, onConfirmDeleteJob, onEditJobExperience } = props;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const isMobile = useCheckMobileScreen();

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    const {
        jobId = "",
        jobRole = "",
        organisation = "",
        startDate = "",
        endDate = "Present",
        jobDescription,
        skills = [],
    } = jobDetail;

    return (
        <>
            <div className='project' key={`${jobId}`}>
                <div
                    className={clsx({
                        "project-header": !isMobile,
                    })}
                >
                    <h4 className='project-role'>{jobRole}</h4>
                    <div className='row d-flex align-items-baseline'>
                        <h6 className='project-time col-sm-9'>
                            {moment(startDate).format("MMM Do YYYY")}
                            {" - "}
                            {endDate === PRESENT
                                ? PRESENT
                                : moment(endDate).format("MMM Do YYYY")}
                        </h6>
                        {!isMobile && (
                            <>
                                <div
                                    className='col-sm-1 d-flex justify-content-end'
                                    onClick={() => {
                                        setShowEditModal(true);
                                    }}
                                >
                                    <i className='bi bi-pencil icon'></i>
                                </div>
                                <div
                                    className='col-sm-1 offset-sm-1 d-flex justify-content-end'
                                    onClick={() => {
                                        setShowDeleteModal(true);
                                    }}
                                >
                                    <i className='bi bi-trash icon'></i>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <h5 className='organisation-name'>{organisation}</h5>
                <div className='project-desc my-3'>{jobDescription}</div>
                <div className='d-flex flex-wrap'>
                    {skills.map(skill => {
                        return <Skill skill={skill} key={skill} />;
                    })}
                </div>
                {isMobile && (
                    <div className='d-flex mt-3 justify-content-end'>
                        <div
                            onClick={() => {
                                setShowEditModal(true);
                            }}
                        >
                            <i className='bi bi-pencil icon'></i>
                        </div>
                        <div
                            onClick={() => {
                                setShowDeleteModal(true);
                            }}
                        >
                            <i className='bi bi-trash icon'></i>
                        </div>
                    </div>
                )}
            </div>

            {showDeleteModal && (
                <DeleteJobExperience
                    job={jobDetail}
                    showDeleteModal={showDeleteModal}
                    closeDeleteModal={closeDeleteModal}
                    onConfirmDeleteJob={onConfirmDeleteJob}
                />
            )}

            {showEditModal && (
                <AddOrEditJobExperience
                    job={jobDetail}
                    closeModal={closeEditModal}
                    showModal={showEditModal}
                    onSaveData={onEditJobExperience}
                />
            )}
        </>
    );
};

export default React.memo(Job);
