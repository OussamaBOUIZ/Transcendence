

export const setFullName = (setData) => {

    
    const updateFullName = (event: { target: { name: string, value: string; }; }) => {
        const { name, value } = event.target;
        console.log("event.target.name : ", event.target.name)
        console.log("event.target.value : ", event.target.value)
        setData(prev => ({
            ...prev,
            [name] : value,
        }))
    };

    return updateFullName
}