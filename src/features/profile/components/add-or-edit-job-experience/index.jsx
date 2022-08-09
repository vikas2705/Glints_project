import React, { useState } from "react";
import _ from "lodash";
import { Modal } from "react-bootstrap";
import {
    doesSkillExist,
    validateJobData,
} from "../../../../utils/jobExperienceHelper";
import Skill from "../../../../common/components/skill";
import {
    getSkillExistsErrorMessage,
    PRESENT,
} from "../../../../constants/messages";

const AddOrEditJobExperience = props => {
    const { job, showModal, closeModal, onSaveData, createNewMode } = props;
    const [currentJobDetail, setCurrentJobDetail] = useState({ ...job } || {});
    const [newSkill, setNewSkill] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isCurrentJob, setCurrentJob] = useState(false);

    // if job detail is empty and not adding a new job, return null
    if (_.isEmpty(currentJobDetail) && !createNewMode) {
        return null;
    }

    const {
        jobId = "",
        jobRole = "",
        organisation = "",
        startDate = "",
        endDate = "",
        jobDescription = "",
        skills = [],
    } = currentJobDetail;

    const handleKeyPress = e => {
        // add a new skill if Enter is pressed
        if (e.key === "Enter") {
            const newSkills = [...skills];

            // check if skill is already added
            if (doesSkillExist(newSkill, skills)) {
                setErrorMessage(getSkillExistsErrorMessage(newSkill));
            } else {
                newSkills.push(newSkill);
                const updatedJobDetails = { ...currentJobDetail };
                updatedJobDetails.skills = newSkills;
                setCurrentJobDetail(updatedJobDetails);
                setNewSkill("");
            }
            e.preventDefault();
        }
    };

    const handleSubmitForm = e => {
        const jobData = { ...currentJobDetail };

        // check if dates are valid and start date is lesser than end date
        const dateValidErrorMessage = validateJobData(currentJobDetail);
        if (dateValidErrorMessage) {
            setErrorMessage(dateValidErrorMessage);
        } else {
            if (createNewMode) {
                // add jobId if new item is created
                jobData.jobId = Math.random() * 10000 + 1;
                onSaveData(jobData);
            } else {
                onSaveData(jobId, jobData);
            }
            closeModal();
        }
        e.preventDefault();
    };

    const handleEditJobExerience = e => {
        const updatedJobDetails = { ...currentJobDetail };
        const value = encodeURI(e.target.value);

        if (e.target.name === "jobRole") {
            updatedJobDetails.jobRole = value;
        } else if (e.target.name === "organisation") {
            updatedJobDetails.organisation = value;
        } else if (e.target.name === "startDate") {
            updatedJobDetails.startDate = e.target.value;
        } else if (e.target.name === "endDate") {
            updatedJobDetails.endDate = e.target.value;
        } else if (e.target.name === "jobDescription") {
            updatedJobDetails.jobDescription = value;
        }
        setErrorMessage("");
        setCurrentJobDetail(updatedJobDetails);
    };

    const handleSelectCurrentJob = () => {
        setCurrentJob(!isCurrentJob);

        const updatedJobDetails = { ...currentJobDetail };
        if (isCurrentJob) {
            updatedJobDetails.endDate = "";
        } else {
            updatedJobDetails.endDate = PRESENT;
        }

        setErrorMessage("");
        setCurrentJobDetail(updatedJobDetails);
    };

    return (
        <Modal
            show={showModal}
            onHide={closeModal}
            backdrop='static'
            keyboard={false}
            centered
            size='lg'
        >
            <Modal.Header>
                <Modal.Title>
                    {createNewMode
                        ? "Add job experience"
                        : "Edit job experience"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmitForm}>
                    <div className='row input-group'>
                        <input
                            type='text'
                            name='jobRole'
                            className='form-control m-1'
                            value={jobRole}
                            placeholder='Enter Job Role'
                            required
                            onChange={handleEditJobExerience}
                        />
                    </div>
                    <div className='row input-group'>
                        <input
                            type='text'
                            name='organisation'
                            value={organisation}
                            required
                            className='form-control m-1'
                            placeholder='Name of organisation'
                            onChange={handleEditJobExerience}
                        />
                    </div>
                    <div className='row input-group'>
                        <input
                            type='date'
                            name='startDate'
                            value={startDate}
                            required
                            className='form-control m-1'
                            placeholder='Job start Date'
                            onChange={handleEditJobExerience}
                        />
                        {!isCurrentJob && (
                            <input
                                type='date'
                                name='endDate'
                                value={endDate}
                                required
                                className='form-control m-1'
                                placeholder='Job end date'
                                onChange={handleEditJobExerience}
                            />
                        )}
                    </div>
                    <div className='row input-group my-2 d-flex'>
                        <label>
                            Currently working here:{" "}
                            <input
                                type='checkbox'
                                value={isCurrentJob}
                                onChange={handleSelectCurrentJob}
                            />
                        </label>
                    </div>
                    <div className='row input-group'>
                        <textarea
                            name='jobDescription'
                            className='form-control m-1'
                            placeholder='Enter description of your job and projects in brief'
                            onChange={handleEditJobExerience}
                            value={jobDescription}
                            required
                        />
                    </div>
                    <div className='row input-group'>
                        <input
                            type='text'
                            name='skill'
                            value={newSkill}
                            className='form-control m-1'
                            placeholder='Add skills'
                            onChange={e => {
                                const value = e.target.value;
                                setErrorMessage("");
                                setNewSkill(value);
                            }}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <div className='row input-group'>
                        <div className='d-flex p-1 flex-wrap'>
                            {skills.map(skill => {
                                return (
                                    <Skill
                                        skill={skill}
                                        key={skill}
                                        isEditable
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {errorMessage && (
                        <div className='text-danger d-flex justify-content-center'>
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <hr />
                    <div className='input-group m-1'>
                        <button
                            className='btn btn-secondary form-control m-1'
                            onClick={closeModal}
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

export default React.memo(AddOrEditJobExperience);
