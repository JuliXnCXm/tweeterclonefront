import React from 'react';
import { Form, Button , InputGroup, FormControl} from 'react-bootstrap'
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
        <Form className="formContainer" onSubmit={(e) => {
                handleSubmit(e,setLogin)}} autoComplete="off">
            <InputGroup className="mb-3 formContainer-email" controlId="formBasicEmail">
                <InputGroup.Text id="basic-addon1" className="icon">
                    <span class="material-icons material-icons-outlined">
                        email
                    </span>
                </InputGroup.Text>
                <FormControl required={error} type="text" name="email" value={form.email} placeholder="Enter email" onChange={handleForm}/>
            </InputGroup>
            <InputGroup className="mb-3 formContainer-password" controlId="formBasicPassword">
                <InputGroup.Text className="icon" >
                    <span class="material-icons material-icons-outlined">
                        lock
                    </span>
                </InputGroup.Text>
                    <Form.Control required={error} type="password" value={form.password} name="password" onChange={handleForm} placeholder="Password" autoComplete="new-password" />
            </InputGroup>
            {
                !setLogin &&
                <>
                <InputGroup className="mb-3 formContainer-name" controlId="formBasicName">
                    <InputGroup.Text className="icon">
                        <span class="material-icons material-icons-outlined">
                            person
                        </span>
                    </InputGroup.Text>
                        <Form.Control required={error} type="text" value={form.name} name="name" onChange={handleForm} placeholder="Name" />
                </InputGroup>
                <InputGroup className="mb-3 formContainer-lastname" controlId="formBasicLastname">
                    <InputGroup.Text className="icon">
                        <span class="material-icons material-icons-outlined">
                            person
                        </span>
                    </InputGroup.Text>
                        <Form.Control required={error} type="text" value={form.lastname} name="lastname" onChange={handleForm} placeholder="lastname"/>
                </InputGroup>
                <InputGroup className="mb-3 formContainer-phone" controlId="formBasicPhone">
                    <InputGroup.Text className="icon">
                        <span class="material-icons material-icons-outlined">
                            phone_iphone
                        </span>
                    </InputGroup.Text>
                        <Form.Control required={error} type="text" value={form.phone} name="phone" onChange={handleForm} placeholder="Phone (Optional)" />
                </InputGroup>
                </>
            }
            <Form.Group className="mb-3 formContainer-check" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remind me" />
            </Form.Group>
            {setLogin ?
                    <Button disabled={disableButton}  size="lg" className="formContainer-button" variant="primary" type="submit" onClick={handleClick} > Login
                </Button>
            :
                    <Button disabled={disableButton} size="lg" className="formContainer-button" variant="primary" type="submit" onClick={handleClick} > Register now
                </Button>
            }

        </Form>
        {loading &&
            <Modal change={true}>
                <Message/>
            </Modal>
        }
        </>
    )
};

export default FormAuth;
