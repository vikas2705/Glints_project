import moment from "moment";
import {
    DATE_ERROR_MESSAGE,
    START_DATE_ERROR_MESSAGE,
    END_DATE_ERROR_MESSAGE,
    PRESENT,
} from "../constants/messages";

/**
 *
 * @param {*} currentJobId
 * @param {*} jobExperiences
 * @returns the index of job experience in the experience arr based on jobId
 */
export const findJobExperienceIndex = (
    currentJobId = "",
    jobExperiences = []
) => {
    let index = -1;

    jobExperiences.forEach((jobExperience, ind) => {
        const { jobId } = jobExperience;
        if (currentJobId === jobId) {
            index = ind;
        }
    });

    return index;
};

/**
 * @desc sorts job experiences with most recent experience first
 * @param {*} arr
 */
export const sortByStartDate = (arr = []) => {
    const sorter = (a, b) => {
        return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
    };
    arr.sort(sorter);
};

/**
 *
 * @param {*} newSkill
 * @param {*} skill
 * @desc checks if new skill added is already present in the list
 */
export const doesSkillExist = (newSkill = "", skill = "") => {
    let exists = false;

    skill.forEach(skill => {
        if (skill.trim().toLowerCase() === newSkill.trim().toLowerCase()) {
            exists = true;
        }
    });

    return exists;
};

/**
 *
 * @param {*} currentJobDetail
 * @returns true if the start dates and end dates are valid else false
 */
export const validateJobData = (currentJobDetail = {}) => {
    const { startDate, endDate } = currentJobDetail;
    if (endDate !== PRESENT && moment(endDate) <= moment(startDate)) {
        return DATE_ERROR_MESSAGE;
    } else if (endDate !== PRESENT && moment(endDate) >= moment(new Date())) {
        return END_DATE_ERROR_MESSAGE;
    } else if (moment(startDate) >= moment(new Date())) {
        return START_DATE_ERROR_MESSAGE;
    }

    return "";
};

export const sanitizeHTML = str => {
    return str.replace(/[^\w. ]/gi, function (c) {
        return "&#" + c.charCodeAt(0) + ";";
    });
};
