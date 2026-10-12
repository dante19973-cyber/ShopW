import{useEffect} from "react";
import {useLocation,useNavigate} from "react-router-dom";
const key='oll:lastRoute'
function RouteM(){
    const local=useLocation()
    const nav=useNavigate();
    useEffect(()=>{
        if(local.pathname!=='/') return;
        let saved=null;
        try{saved=localStorage.getItem(key);}catch{}
        if(saved&&saved!=='/') nav(saved,{replace:true});
    },[]);
    useEffect(()=>{
        try{localStorage.setItem(key,local.pathname+local.search);}
        catch{}
    },[local.pathname,local.search]);
    return null;
}
export default RouteM

