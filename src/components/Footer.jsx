import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full'>

            <div className="logo font-bold text-2xl">
                <span className='text-yellow-300'>&lt;</span>
                Pass<span className='text-yellow-300'>Op</span>
                <span className='text-yellow-300'>/&gt;</span>
            </div>

            <div>
                Created with &#x2665;&#xfe0f; by Manas
            </div>

        </div>
    )
}

export default Footer