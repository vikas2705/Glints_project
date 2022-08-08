import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    getSampleProfileData,
    updateDummyProfileData,
} from "../../api/sampleProfile";
import Loader from "../../common/components/loader";
import Toaster from "../../common/components/toaster";
import BasicDetails from "./components/basic-details";
import JobExperiences from "./components/job-experiences";
import "./profile.css";

const Profile = () => {
    const [profileData, setProfileData] = useState({});
    const [toastMessage, setToastMessage] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);

    let toastRef = useRef(null);

    useEffect(() => {
        getProfileData();
    }, []);

    const getProfileData = async () => {
        setLoading(true);
        const data = await getSampleProfileData();
        setProfileData(data);
        setLoading(false);
    };

    const showToast = useCallback(toastMessage => {
        setToastMessage(toastMessage);
        setToastVisible(true);
        if (toastRef && toastRef.current) {
            clearInterval(toastRef.current);
        }

        toastRef.current = setTimeout(() => {
            setToastMessage("");
            setToastVisible(false);
        }, 5000);
    }, []);

    const saveProfileData = useCallback(
        async data => {
            setLoading(true);
            const result = await updateDummyProfileData(data);
            const { status, message } = result;
            if (status === 200) {
                getProfileData();
            } else {
                setLoading(false);
            }
            showToast(message);
        },
        [showToast]
    );

    return (
        <div>
            {isLoading && <Loader />}
            {!isLoading && (
                <div className='container profile-main my-5'>
                    <div className='p-5'>
                        <BasicDetails
                            profileData={profileData}
                            saveProfileData={saveProfileData}
                        />
                        <hr />
                        <JobExperiences
                            profileData={profileData}
                            saveProfileData={saveProfileData}
                        />
                    </div>
                </div>
            )}
            <Toaster toastMessage={toastMessage} toastVisible={toastVisible} />
        </div>
    );
};

export default Profile;
