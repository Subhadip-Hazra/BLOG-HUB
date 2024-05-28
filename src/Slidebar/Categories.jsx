import React from "react";
import InputField from "../Components/InputField";

const Topics = ({ handleChange }) => {
    return (
        <div>
            <h2 className="text-lg font-medium mb-2">Categories</h2>
            <div>
                <label className="sidebar-label-container">
                    <input onChange={handleChange} type="radio" value="" name="test" />
                    <span className="checkmark"></span>All
                </label>
                <InputField
                    handleChange={handleChange}
                    value="Programming"
                    title="Programming"
                    name="test"
                />
                <InputField
                    handleChange={handleChange}
                    value="Fashion"
                    title="Fashion"
                    name="test"
                />
                <InputField
                    handleChange={handleChange}
                    value="Technology"
                    title="Technology"
                    name="test"
                />
                <InputField
                    handleChange={handleChange}
                    value="Travel"
                    title="Travel"
                    name="test"
                />
                
                <InputField
                    handleChange={handleChange}
                    value="Photography"
                    title="Photography"
                    name="test"
                />
            </div>
        </div>
    );
};

export default Topics;
