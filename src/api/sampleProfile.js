import { DEFAULT_SUCCESS_MESSAGE } from "../constants/messages";
import { profileData } from "../json/sample-profile-vikas";

/**
 *
 * @returns hardcoded sample data for profile in json/sample-profile-vikas.js
 * GET method
 */
export const getSampleProfileData = () => {
    const result = new Promise((resolve, reject) => {
        setTimeout(() => {
            // if data doesn't exist in  localstorage,
            // 1. stringify and set the sample json in localstorage
            // 2. send the response with sample json
            if (!localStorage.getItem("profileData")) {
                const strProfileData = JSON.stringify(profileData);
                localStorage.setItem("profileData", strProfileData);
                resolve(profileData);
            } else {
                // if data exists in  localstorage,
                // 1. get the profile data from localstorage
                // 2. parse json and return it
                const data = JSON.parse(localStorage.getItem("profileData"));
                resolve(data);
            }
        }, 1000);
    })
        .then(data => {
            return data;
        })
        .catch(err => {
            return err.message;
        });

    return result;
};

/**
 * @desc updates the dummy profile data and returns success message and status
 * @param {*} data
 * PUT Method
 */
export const updateDummyProfileData = data => {
    const result = new Promise((resolve, reject) => {
        setTimeout(() => {
            localStorage.clear();
            const strProfileData = JSON.stringify(data);
            localStorage.setItem("profileData", strProfileData);
            resolve({ status: 200, message: DEFAULT_SUCCESS_MESSAGE });
        }, 1000);
    })
        .then(data => {
            return data;
        })
        .catch(err => {
            return err.message;
        });

    return result;
};
