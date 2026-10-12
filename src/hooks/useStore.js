import{useEffect,useState} from "react";
const pref="oll:";
function useStore(key,initial){
    const storeKey=pref+key;
    const [value,setValue]=useState(()=>{
        try{const raw=localStorage.getItem(storeKey);
            if(raw!==null){
            const val=JSON.parse(raw);
            if(Array.isArray(initial)){
                return Array.isArray(val)?val:initial;
            }
            if(initial&& typeof initial === "object"){
                return val && typeof val === "object"?{...initial,...val}:initial;
            }
            return val??initial;
            }
        }catch {
            return initial;
        }
        return initial;
    });

useEffect(()=>{
    try{localStorage.setItem(storeKey,JSON.stringify(value));
    }catch{}
},[storeKey,value]);
return [value,setValue];
}
export default useStore;
