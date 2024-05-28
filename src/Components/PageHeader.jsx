import React from 'react'

const PageHeader = ({ title, path }) => {
    return (
        // home comming 
        <div className='py-4 mt-3 bg-[#FAFAFA] rounded flex items-center justify-center'>
            <div>
                <h2 className='text-2xl text-green font-medium mb-1 text-center'>{title}</h2>
                <p className='text-sm text-center'> <a className='underline' href="/">Home</a> \ {path}</p>
            </div>
        </div>
    )
}

export default PageHeader