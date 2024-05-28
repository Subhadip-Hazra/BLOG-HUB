import React from 'react'
import Categories from './Categories'
import BlogPostingDate from './BlogPostingDate'

const Sidebar = ({ handleChange }) => {
    return (
        <div className='space-y-5'>
            <h1 className='text-lg font-bold mb-2'>Filters</h1>
            <Categories handleChange={handleChange}/>
            <BlogPostingDate handleChange={handleChange} />
        </div>
    )
}

export default Sidebar