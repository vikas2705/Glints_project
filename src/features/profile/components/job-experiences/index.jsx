import React, { useCallback, useState } from "react";
import _ from "lodash";
import "./jobExperiences.css";
import Job from "../job";
import {
    findJobExperienceIndex,
    sortByStartDate,
} from "../../../../utils/jobExperienceHelper";
import AddOrEditJobExperience from "../add-or-edit-job-experience";

const JobExperiences = props => {
    const { profileData = {}, saveProfileData } = props;
    const [showNewJobModal, setShowNewJobModal] = useState(false);

    const { jobExperiences = [] } = profileData;
    const closeNewJobModal = () => {
        setShowNewJobModal(false);
    };

    // function to trigger save job experiences
    const handleSaveData = useCallback(
        updatedJobExperiences => {
            const updatedProfileData = { ...profileData };

            // sort jobs by start date before saving
            sortByStartDate(updatedJobExperiences);
            updatedProfileData.jobExperiences = updatedJobExperiences;
            saveProfileData(updatedProfileData);
        },
        [profileData, saveProfileData]
    );

    // find the job in the jobExperience array and delete it
    const handleDeleteJobExperience = useCallback(
        jobId => {
            const index = findJobExperienceIndex(jobId, jobExperiences);
            const updatedJobExpriences = [...jobExperiences];
            updatedJobExpriences.splice(index, 1);
            handleSaveData(updatedJobExpriences);
        },
        [handleSaveData, jobExperiences]
    );

    // find the job in the jobExperience array and edit it
    const handleEditJobExperience = useCallback(
        (jobId, updatedJobDetail) => {
            const index = findJobExperienceIndex(jobId, jobExperiences);
            const updatedJobExpriences = [...jobExperiences];
            updatedJobExpriences[index] = { ...updatedJobDetail };
            handleSaveData(updatedJobExpriences);
        },
        [handleSaveData, jobExperiences]
    );

    // add a new job Experience
    const handleAddNewExperience = useCallback(
        jobDetail => {
            const updatedJobExpriences = [...jobExperiences];
            updatedJobExpriences.push(jobDetail);
            handleSaveData(updatedJobExpriences);
        },
        [handleSaveData, jobExperiences]
    );

    return (
        <>
            <div className='job-experience py-3'>
                <div
                    className='add-work text-primary'
                    onClick={() => {
                        setShowNewJobModal(true);
                    }}
                >
                    <i className='bi bi-plus-circle-fill text-primary pr-3'></i>{" "}
                    Add Work Experience
                </div>

                <div className='projects'>
                    {jobExperiences.map(job => {
                        const { jobId } = job;
                        return (
                            <Job
                                jobDetail={job}
                                key={jobId}
                                onConfirmDeleteJob={handleDeleteJobExperience}
                                onEditJobExperience={handleEditJobExperience}
                            />
                        );
                    })}
                </div>
            </div>
            {showNewJobModal && (
                <AddOrEditJobExperience
                    createNewMode
                    closeModal={closeNewJobModal}
                    showModal={showNewJobModal}
                    onSaveData={handleAddNewExperience}
                />
            )}
        </>
    );
};

export default React.memo(JobExperiences);
