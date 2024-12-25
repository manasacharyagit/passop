import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setForm] = useState({ site: "", username: "", password: "", id: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const ref = useRef();
    const passref = useRef();

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/");
        let passwords = await req.json();
        setPasswordArray(passwords);
    };

    useEffect(() => {
        getPasswords();
    }, []);

    const copytext = (text) => {
        toast(`🦄 Copied to clipboard!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);
    };

    const showPassword = () => {
        if (ref.current.src.includes("/icons/eye.png")) {
            ref.current.src = "/icons/eyecross.png";
            passref.current.type = "text";
        } else {
            ref.current.src = "/icons/eye.png";
            passref.current.type = "password";
        }
    };

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            if (form.id) {
                await fetch("http://localhost:3000/", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: form.id })
                });
            }

            const newPassword = { ...form, id: form.id || uuidv4() };
            setPasswordArray([...passwordArray.filter(item => item.id !== form.id), newPassword]);

            await fetch("http://localhost:3000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPassword)
            });

            setForm({ site: "", username: "", password: "", id: "" });
        } else {
            toast("Password could not be saved. Maybe input is too short", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const deletePassword = async (id) => {
        let confirmDelete = confirm("Do you really want to delete your password?");
        if (confirmDelete) {
            setPasswordArray(passwordArray.filter((item) => item.id !== id));

            await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
        }
    };

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id);
        setForm({ ...passwordToEdit });
        setPasswordArray(passwordArray.filter((item) => item.id !== id));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            // transition={Bounce}
            />
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-slate-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className='p-4 md:px-0 md:mycontainer'>
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-yellow-300'>&lt;</span>
                    Pass<span className='text-yellow-300'>Op</span>
                    <span className='text-yellow-300'>/&gt;</span>
                </h1>
                <p className='text-blue-900 font-semibold text-lg text-center'>Your own password manager</p>
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input required name='site' value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-blue-500 w-full p-4 py-2' type="text" />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input required onChange={handleChange} name='username' value={form.username} placeholder='Enter Username' className='rounded-full border border-blue-500 w-full p-4 py-2' type="text" />
                        <div className="relative">
                            <input required onChange={handleChange} name='password' value={form.password} ref={passref} placeholder='Enter Password' className='rounded-full border border-blue-500 w-full p-4 py-2' type="password" />
                            <span className='absolute cursor-pointer right-[3px] top-[4px]' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={30} src="icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex bg-slate-600 text-white justify-center items-center gap-2 font-semibold shadow-lg rounded-full px-8 py-4 w-fit'>
                        <lord-icon

                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden ">
                            <thead className='bg-slate-400 text-white'>
                                <tr>
                                    <th className='py-2'>Website</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-yellow-100'>
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className=' py-2 text-center'>
                                                <div className='flex justify-around items-center'>
                                                    <a href={item.site} target='_blank'>{item.site}</a>
                                                    <svg onClick={() => { copytext(item.site) }} className='cursor-pointer ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M18.333 6A3.667 3.667 0 0 1 22 9.667v8.666A3.667 3.667 0 0 1 18.333 22H9.667A3.667 3.667 0 0 1 6 18.333V9.667A3.667 3.667 0 0 1 9.667 6zM15 2c1.094 0 1.828.533 2.374 1.514a1 1 0 1 1-1.748.972C15.405 4.088 15.284 4 15 4H5c-.548 0-1 .452-1 1v9.998c0 .32.154.618.407.805l.1.065a1 1 0 1 1-.99 1.738A3 3 0 0 1 2 15V5c0-1.652 1.348-3 3-3zm1.293 9.293L13 14.585l-1.293-1.292a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414" />
                                                    </svg>
                                                </div>
                                            </td>
                                            <td className='py-2 text-center'>
                                                <div className='flex justify-around items-center'>
                                                    {item.username}
                                                    <svg onClick={() => { copytext(item.username) }} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M18.333 6A3.667 3.667 0 0 1 22 9.667v8.666A3.667 3.667 0 0 1 18.333 22H9.667A3.667 3.667 0 0 1 6 18.333V9.667A3.667 3.667 0 0 1 9.667 6zM15 2c1.094 0 1.828.533 2.374 1.514a1 1 0 1 1-1.748.972C15.405 4.088 15.284 4 15 4H5c-.548 0-1 .452-1 1v9.998c0 .32.154.618.407.805l.1.065a1 1 0 1 1-.99 1.738A3 3 0 0 1 2 15V5c0-1.652 1.348-3 3-3zm1.293 9.293L13 14.585l-1.293-1.292a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414" />
                                                    </svg>
                                                </div>
                                            </td>
                                            <td className='py-2 text-center w-32'>
                                                <div className='flex justify-around items-center'>
                                                    {item.password}
                                                    <svg onClick={() => { copytext(item.password) }} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M18.333 6A3.667 3.667 0 0 1 22 9.667v8.666A3.667 3.667 0 0 1 18.333 22H9.667A3.667 3.667 0 0 1 6 18.333V9.667A3.667 3.667 0 0 1 9.667 6zM15 2c1.094 0 1.828.533 2.374 1.514a1 1 0 1 1-1.748.972C15.405 4.088 15.284 4 15 4H5c-.548 0-1 .452-1 1v9.998c0 .32.154.618.407.805l.1.065a1 1 0 1 1-.99 1.738A3 3 0 0 1 2 15V5c0-1.652 1.348-3 3-3zm1.293 9.293L13 14.585l-1.293-1.292a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414" />
                                                    </svg>
                                                </div>
                                            </td>
                                            <td className='py-2 text-center w-32'>
                                                <div className='flex justify-around'>
                                                    <svg onClick={() => { editPassword(item.id) }} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path fill="darkblue" d="M5 14q-.425 0-.712-.288T4 13t.288-.712T5 12h5q.425 0 .713.288T11 13t-.288.713T10 14zm0-4q-.425 0-.712-.288T4 9t.288-.712T5 8h9q.425 0 .713.288T15 9t-.288.713T14 10zm0-4q-.425 0-.712-.288T4 5t.288-.712T5 4h9q.425 0 .713.288T15 5t-.288.713T14 6zm8 13v-1.65q0-.2.075-.387t.225-.338l5.225-5.2q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.2 5.2q-.15.15-.337.225T15.65 20H14q-.425 0-.712-.287T13 19m6.575-4.6l.925-.975l-.925-.925l-.95.95zM14.5 18.5h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm0 0v-.95l3.05-3.025l.925.925l-3.025 3.05z" />
                                                    </svg>
                                                    <svg onClick={() => { deletePassword(item.id) }} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path fill="red" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17" />
                                                    </svg>

                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>}

                </div>
            </div >

        </>
    )
}

export default Manager