import {Data} from "../../global/Interfaces"

export const setFullName = (setData: React.Dispatch<React.SetStateAction<Data>>) => {

    
    const updateFullName = (event: { target: { name: string, value: string; }; }) => {
        const { name, value } = event.target;
        setData(prev => ({
            ...prev,
            [name] : value,
        }))
    };

    return updateFullName
}