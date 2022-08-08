import React from "react";
import "./skill.css";

const Skill = props => {
    const { skill, isEditable, onRemove } = props;

    const handleRemove = () => {
        if (onRemove) {
            onRemove();
        }
    };

    return (
        <div className='tech-item' key={skill}>
            <span>{skill} </span>
            {isEditable && (
                <span className='cross-button' onClick={handleRemove}>
                    X
                </span>
            )}
        </div>
    );
};

export default React.memo(Skill);
