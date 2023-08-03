import React, {useState} from "react"

export default function Form({handleChange, handleSubmit, formDataUp, setFormDataUp}) {
    function handleEnter(event) {
        console.log(event)
        if (event.key === 'Enter')
            handleSubmit()
    }
    return (
        <>
            <div className="yourNameForm">
                <input
                    className="firstname"
                    type='text'
                    placeholder='First name'
                    name='firstname'
                    onChange={handleChange}
                    onKeyUp={handleEnter}
                    value={formDataUp.firstname}
                    ></input>
                <input
                    type='text'
                    className="lastname"
                    placeholder='Last name'
                    name='lastname'
                    onChange={handleChange}
                    onKeyUp={handleEnter}
                    value={formDataUp.lastname}
                    ></input>
            </div>
            <input
                type="email"
                className="username"
                placeholder= "Email"
                name="email"
                onChange={handleChange}
                onKeyUp={handleEnter}
                value={formDataUp.email}
                ></input>
            <input
                type='password'
                className="password"
                placeholder='Password'
                name='password'
                onChange={handleChange}
                onKeyUp={handleEnter}
                value={formDataUp.password}
                ></input>
        </>
    )
}