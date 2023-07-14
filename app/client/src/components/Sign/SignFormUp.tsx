import React, {useState} from "react"

export default function Form({handleChange, formDataUp, setFormDataUp}) {
    return (
        <>
            <div className="yourNameForm">
                <input
                    className="firstname"
                    type='text'
                    placeholder='First name'
                    name='firstname'
                    onChange={handleChange}
                    value={formDataUp.firstname}
                    ></input>
                <input
                    type='text'
                    className="lastname"
                    placeholder='Last name'
                    name='lastname'
                    onChange={handleChange}
                    value={formDataUp.lastname}
                    ></input>
            </div>
            <input
                type="email"
                className="username"
                placeholder= "Email"
                name="email"
                onChange={handleChange}
                value={formDataUp.email}
                ></input>
            <input
                type='text'
                className="password"
                placeholder='Password'
                name='password'
                onChange={handleChange}
                value={formDataUp.password}
                ></input>
        </>
    )
}