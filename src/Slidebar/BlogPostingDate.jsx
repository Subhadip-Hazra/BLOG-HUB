import React from "react";
import InputField from "../Components/InputField";

const BlogPostingData = ({ handleChange }) => {
    return (
        <div>
            <h2 className="text-lg font-medium mb-2">Date of posting</h2>
            <div>
                <label className="sidebar-label-container">
                    <input onChange={handleChange} type="radio" value="" name="test" />
                    <span className="checkmark"></span>All time
                </label>
                <InputField
                    handleChange={handleChange}
                    value='Last 24 hours'
                    title="Last 24 hours"
                    name="test"
                />
                <InputField
                    handleChange={handleChange}
                    value='Last 7 days'
                    title="Last 7 days"
                    name="test"
                />
                <InputField
                    handleChange={handleChange}
                    value='Last 30 days'
                    title="Last 30 days"
                    name="test"
                />
            </div>
        </div>
    );
};

export default BlogPostingData;
