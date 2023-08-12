

export const setFullName = (setData) => {

    const updateFullName = (event: { target: { name: string, value: string; }; }) => {
        const { name, value } = event.target;
        setData(prev => ({
            ...prev,
            [name] : value,
        }))
    };

    return updateFullName
}