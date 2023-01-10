import React from 'react';
import useAuth from '../../../hooks/useAuth'
import './index.css'
import Message from '../Message';
import Modal from '../../Modal';
import { useState } from 'react';
import { useEffect } from 'react';

const FormAuth = ({setLogin}) => {

    const { handleSubmit, form , handleForm, error } = useAuth()
    const [loading, setLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    const handleClick = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        } , 4000)
    }

    useEffect(()=> {
        if (setLogin) {
            if (form.email === "" || form.password === "") {
                setDisableButton(true);
            } else {
                setDisableButton(false);
            }
        } else {
            if (
                form.email === "" ||
                form.password === "" ||
                form.name === "" ||
                form.lastname === ""
                ) {
                setDisableButton(true);
            } else {
                setDisableButton(false);
            }
        }
    }, [form])

    return (
        <>
        <form className="formContainer" onSubmit={(e) => {
                handleSubmit(e,setLogin)}} autoComplete="off">
                <div>
                    <label id="basic-addon1" className="icon">
                        <span class="material-icons material-icons-outlined">
                            email
                        </span>
                    </label>
                    <input required={error} type="text" name="email" value={form.email} placeholder="Enter email" onChange={handleForm}/>
                </div>
                <div>
                    <label className="icon" >
                        <span class="material-icons material-icons-outlined">
                            lock
                        </span>
                    </label>
                    <input required={error} type="password" value={form.password} name="password" onChange={handleForm} placeholder="Password" autoComplete="new-password" data- />
                </div>
            {
                !setLogin &&
                <>
                    <div>
                        <label className="icon">
                            <span class="material-icons material-icons-outlined">
                                person
                            </span>
                        </label>
                        <input required={error} type="text" value={form.name} name="name" onChange={handleForm} placeholder="Name" />
                    </div>
                    <div>
                        <label className="icon">
                            <span class="material-icons material-icons-outlined">
                                person
                            </span>
                        </label>
                        <input required={error} type="text" value={form.lastname} name="lastname" onChange={handleForm} placeholder="lastname"/>
                    </div>
                    <div>
                        <label className="icon">
                            <span class="material-icons material-icons-outlined">
                                phone_iphone
                            </span>
                        </label>
                        <input required={error} type="text" value={form.phone} name="phone" onChange={handleForm} placeholder="Phone (Optional)" />
                    </div>
                </>
            }
                <input type="checkbox"/>
                <span>Remind me</span>
            {setLogin ?
                    <button disabled={disableButton}  className="formContainer-button"  type="submit" onClick={handleClick} > Login
                </button>
            :
                    <button disabled={disableButton} className="formContainer-button" type="submit" onClick={handleClick} > Register now
                </button>
            }

        </form>
        {loading &&
            <Modal change={true}>
                <Message/>
            </Modal>
        }
        </>
    )
};

export default FormAuth;
