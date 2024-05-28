import React from 'react'

const Blogs = ({ result }) => {
    return (
        <>
            <div>
                <h3 className='text-lg font-bold mb-2'>{result.length} Blogs</h3>
            </div>
            <section className="card-container">{result}</section>
        </>
    );
};

export default Blogs;