import React from "react"

export default function Form({ handleChange, handleSubmit, formData, setFormData }) {
    function handleEnter(event) {
        if (event.key === 'Enter')
            handleSubmit()
    }
    return (
        <>
            <input
                type='text'
                className="username"
                placeholder='Username'
                name='username'
                onKeyUp={handleEnter}
                onChange={handleChange}
                value={formData.username}
                ></input>
            <input
                type='password'
                className="password"
                placeholder='Password'
                name='password'
                onKeyUp={handleEnter}
                onChange={handleChange}
                value={formData.password}
                ></input>
        </>
    )
}