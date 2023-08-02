import React, {useState} from "react"
import FormIn from "./SignFormIn"
import FormUp from "./SignFormUp"

export default function Form({ SignX, handleChange, formData, setFormData, formDataUp, setFormDataUp }) {

    return (
        <form className='form' style={SignX === "up" ? {marginBottom: "1rem"} : {marginBottom: "0rem"}}>
            {
                SignX === "in" ?
                <FormIn handleChange = {handleChange} formData = {formData} setFormData = {setFormData} /> :
                <FormUp handleChange = {handleChange} formDataUp = {formDataUp} setFormDataUp = {setFormDataUp}/>
            }
        </form>
    )
}