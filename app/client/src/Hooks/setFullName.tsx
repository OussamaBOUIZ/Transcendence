import {useState} from "react";
import {AllName} from "../../../global/Interfaces"

export const setFullName = (setData) => {

    const [fullName, setFullName] = useState<AllName>({
        firstname: "",
        lastname: "",
    })

    const updateFullName = (event: { target: { name: string, value: string; }; }) => {
        const { name, value } = event.target;
        // setFullName(prev => ({
        //     ...prev,
        //     [name] : value,
        // }));
        setData(prev => ({
            ...prev,
            [name] : value,
        }))
    };

    return { fullName, updateFullName }
}