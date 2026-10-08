import{createContext,useContext,useState} from "react";
const BasketContext=createContext(null);
export function BasketProvider({children}){
    const [items,setItem]=useState([]);

    const addItem=(product)=>{
        setItem((prev)=>{const found=prev.find((i)=>i.id===product.id);
            if(found){
                return prev.map((i)=>i.id===product.id?{...i,quant:i.quant+1}:i);
            }
           return[...prev,{id:product.id,name:product.name,img:product.img,prise:product.prise,quant:1}];
        });
    };

const changeQuant=(id,delta)=>{
    setItem((prev)=>prev.map((i)=>(i.id===id?{...i,quant:i.quant+delta}:i))
        .filter((i)=>i.quant>0)
    );
}
const removeItem=(id)=>
    setItem((prev)=>prev.filter((i)=>i.id!==id));
const clearBasket=()=>
    setItem([]);
const total=items.reduce((sum,i)=>sum+i.prise*i.quant,0);
const count=items.reduce((sum,i)=>sum+i.quant,0);
return(
    <BasketContext.Provider value={{items,addItem,changeQuant,removeItem,clearBasket,total,count}}>
        {children}
    </BasketContext.Provider>
);
}
export function useBasket() {
    const ctx = useContext(BasketContext);
    if (!ctx) throw new Error('Basket error');
    return ctx;
}