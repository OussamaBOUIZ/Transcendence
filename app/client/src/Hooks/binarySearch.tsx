
export const binarySearch = (arr: Record<string, number>[], val: number): number => {
    let start = 0, end = arr?.length - 1

    while (start <= end) {
        let md = Math.floor((start + end)/2)
        if (arr[md].id === val)
            return 1

        if (val < arr[md].id)
            end = md - 1
        else
            start = md + 1
    }
    return 0
}