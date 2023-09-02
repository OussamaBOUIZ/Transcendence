import { useEffect, useRef } from "react"
    
export default function useEffectOnUpdate (effectFunc, deps:any[]) {
    const initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return ;
        }
        const val = deps.some(attribute => {
            if (!attribute) return false;
            if (typeof attribute === 'object' && !attribute.length)
                return false;
            return true;
        })
        if (val)
            effectFunc()
    }, deps)
}