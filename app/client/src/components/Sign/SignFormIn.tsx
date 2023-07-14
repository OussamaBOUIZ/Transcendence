import React from "react"

export default function Form({ handleChange, formData, setFormData }) {

    return (
        <>
            <input
                type='text'
                className="username"
                placeholder='Username'
                name='username'
                onChange={handleChange}
                value={formData.username}
                ></input>
            <input
                type='text'
                className="password"
                placeholder='Password'
                name='password'
                onChange={handleChange}
                value={formData.password}
                ></input>
        </>
    )
}