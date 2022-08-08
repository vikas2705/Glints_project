import React, { useCallback, useState } from "react";
import clsx from "clsx";
import _ from "lodash";
import "./basicDetails.css";
import EditBasicDetails from "../edit-basic-details";
import useCheckMobileScreen from "../../../../hooks/useCheckMobileScreen.hook";

const BasicDetails = props => {
    const { profileData = {}, saveProfileData } = props;
    const [showEditModal, setShowEditModal] = useState(false);
    const isMobile = useCheckMobileScreen();

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    // function called to save profile data with updated basic details
    const onSaveData = useCallback(
        updatedBasicDetailsData => {
            const updatedProfileData = { ...profileData };
            updatedProfileData.basicDetails = updatedBasicDetailsData;
            saveProfileData(updatedProfileData);
        },
        [saveProfileData, profileData]
    );

    // return null if profileData is empty or basicDetails is empty
    if (_.isEmpty(profileData) || _.isEmpty(profileData.basicDetails)) {
        return null;
    }

    const { basicDetails = {} } = profileData;
    const {
        profileImageUrl,
        name,
        age,
        location,
        profileSummary,
        profileDescription,
    } = basicDetails;

    return (
        <>
            <div className='basic-detail'>
                <div
                    className={`row ${
                        !profileImageUrl ? "align-items-center" : ""
                    }`}
                >
                    <div className='col-sm-2'>
                        {profileImageUrl && (
                            <img
                                src={profileImageUrl}
                                alt='profile of the user'
                                className='profile-img'
                            />
                        )}
                        {!profileImageUrl && (
                            <i className='bi bi-person-circle fs-180'></i>
                        )}
                    </div>
                    <div
                        className={clsx("col-sm-7 offset-sm-1", {
                            "mt-5": isMobile,
                        })}
                    >
                        <h2
                            className={clsx("mb-3 text-cyan", {
                                "d-flex justify-content-center": isMobile,
                            })}
                        >
                            <div
                                className={clsx({
                                    "d-flex justify-space--between": isMobile,
                                })}
                            >
                                {name}

                                {isMobile && (
                                    <span
                                        onClick={() => {
                                            setShowEditModal(true);
                                        }}
                                    >
                                        <i className='bi bi-pencil icon'></i>
                                    </span>
                                )}
                            </div>
                        </h2>
                        <h4
                            className={clsx({
                                "d-flex justify-content-center": isMobile,
                            })}
                        >
                            {age} {age && location && <span>, </span>}{" "}
                            {location}
                        </h4>
                        <h5
                            className={clsx({
                                "text-justify": isMobile,
                            })}
                        >
                            {profileSummary}
                        </h5>
                    </div>
                    {!isMobile && (
                        <div
                            className='col-sm-2 d-flex justify-content-end'
                            onClick={() => {
                                setShowEditModal(true);
                            }}
                            title='Edit Basic Details'
                        >
                            <i className='bi bi-pencil icon'></i>
                        </div>
                    )}
                </div>
                <div
                    className={clsx("mt-4", {
                        "text-justify": isMobile,
                    })}
                >
                    <span>{profileDescription}</span>
                </div>
            </div>
            {showEditModal && (
                <EditBasicDetails
                    basicDetails={basicDetails}
                    onSaveData={onSaveData}
                    closeEditModal={closeEditModal}
                    showEditModal={showEditModal}
                />
            )}
        </>
    );
};

export default React.memo(BasicDetails);
