

export const setFullName = (setData) => {

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

    return updateFullName
}