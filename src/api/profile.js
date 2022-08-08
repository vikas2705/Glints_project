import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

/**
 *get profile data for given userId
 * @param {*} userId
 * @returns the profile data for the userId provided
 */
export const getProfileData = async userId => {
    const url = `${BASE_URL}/api/getProfileData/${userId}`;
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * update profile data API
 * @param {*} profileData
 * @returns updates the profile data and returns success/failure status
 */
export const updateProfileData = async profileData => {
    const url = `${BASE_URL}/api/updateProfileData`;
    try {
        const response = await axios.put(url, profileData, {
            headers: {
                "x-access-token": localStorage.getItem("accessToken"),
            },
        });

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
