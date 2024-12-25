import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
                <div className="logo font-bold text-2xl">
                    <span className='text-yellow-300'>&lt;</span>
                    Pass<span className='text-yellow-300'>Op</span>
                    <span className='text-yellow-300'>/&gt;</span>
                </div>
                {/* <ul>
                    <li className='flex gap-4'>
                        <a className='hove:font-bold' href='#'>Home</a>
                        <a href='#'>About</a>
                        <a href='#'>Contact</a>


                    </li>

                </ul> */}
                <button className='text-white ring right-1 bg-slate-400 rounded-full p-1 flex justify-between items-center'>
                    <img className='p-1 w-8' src="/icons/github.svg" alt="" />
                    {/* Github */}
                </button>
            </div>
        </nav >
    )
}

export default Navbar