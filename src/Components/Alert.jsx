/* eslint-disable react/prop-types */
const Alert = ({type,text,}) => {
    return (
        <div className='absolute top-10 left-0 right-0 flex justify-center items-center'>
            <div className={`${type==='danger' ? 'bg-red-500' : 'bg-blue-500'} p-2 text-indigo-100 leading-none lg:rounded-full rounded flex lg:inline-flex items-center`} role='alert'>
                <p className={`${type === 'danger' ? 'bg-red-500' : 'bg-slate-100'} flex rounded-full uppercase px-2 py-1 text-black font-semibold mr-3 text-xs`}>{type === 'danger' ? 'Failed' : 'success' }</p>
                <p className='mr-2 text-left' >{text}</p>
            </div>
        </div>
        
    )
}

export default Alert