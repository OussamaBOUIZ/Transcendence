import { useEffect, useRef } from "react"
    
export default function useEffectOnUpdate (effectFunc, deps:any[]) {
    const initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return ;
        }
        deps.map(attribute => {if (!attribute) {console.log("okKO"); return ;}})
        effectFunc()
    }, deps)
}