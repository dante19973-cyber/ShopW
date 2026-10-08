import{useState} from "react";
import{createPortal} from "react-dom";
import { useBasket } from "./BaskCon";
import sendOrder from "../base/email";
function Checkout({onClose}) {
    const{items,total,clearB,}=useBasket();
    const [form,setForm]=useState({name:'',phone:'',email:''})
    const [errors,setErrors]=useState({})
    const [done,setDone]=useState(false);
    const set=(key)=>(e)=>setForm({...form,[key]:e.target.value});
    const [sending,setSending]=useState(false);
    const [sendError,setSendError]=useState('');
    const validate=()=>{
     const err={};
     if(form.name.trim().length<2)err.name="Invalid Name";
     if(!/^\+?[0-9\s\-()]{9,15}$/.test(form.phone.trim()))err.phone="Invalid phone number";
     if (!/\S+@\S+\.\S+/.test(form.email.trim())) err.email = "Invalid email";
     return err;
    };
    const handleSubmit =async (e) => {
        e.preventDefault();
        const err = validate();
        setErrors(err);
        if (Object.keys(err).length > 0) return;
        const order = {
            customer: {
                name: form.name.trim(),
                phone: form.phone.trim(),
                email: form.email.trim()
            },
            items: items.map(({id, name, prise, quant}) => ({id, name, prise, quant})),
            total,
            createdAt: Date.now()
        };
        console.log('Order', order);
        setSending(true);
        setSendError('');
        try {
            await sendOrder(order);
            setDone(true);
            clearB();
        } catch (e) {
            console.error(e);
            setSendError('Failed to send order');
        } finally {
            setSending(false);
        }
    };
    const handleCancel = () => {
        onClose();
    };
    return createPortal(
        <div className="overlay">
            <div className="modal">
                {done?(
                    <>
                    <h2>Thank you for your order</h2>
                        <p>We will contact you soon</p>
                        <button className="buttonBuy" onClick={handleCancel}>OK</button>
                    </>
                ):(
                    <form onSubmit={handleSubmit} noValidate>
                        <h2>Complete your order</h2>
                        <p>For payment: {total} GOLD</p>
                        <label>Name<input type='text' value={form.name} onChange={set('name')}/>
                        {errors.name && <div className="error">{errors.name}</div>}
                        </label>
                        <label>Phone<input type='tel' value={form.phone} onChange={set('phone')}/>
                        {errors.phone && <div className="error">{errors.phone}</div>}
                        </label>
                        <label>Email<input type='email' value={form.email} onChange={set('email')}/>
                        {errors.email && <div className="error">{errors.email}</div>}
                        </label>
                        <div className="modalButtons">
                            <button type='submit' className="buttonBuy" disabled={sending}>{sending?'Sending...':'Order'}</button>
                            <button type='button' className="buttonCancel" onClick={handleCancel} disabled={sending}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>,
        document.body
    );
}
export default Checkout
