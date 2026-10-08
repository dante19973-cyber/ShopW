import emailjs from '@emailjs/browser';
export default function sendOrder(order) {
   const itemsText = order.items.map((i)=>`${i.name} x ${i.quant}=${i.prise * i.quant} GOLD`).join('\n');
   return emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, {
       customer_name: order.customer.name,
       customer_phone: order.customer.phone,
       customer_email: order.customer.email,
       items: itemsText,
       total: order.total,
       order_date: new Date().toISOString()
   }, {publicKey:import.meta.env.VITE_EMAILJS_PUBLIC_KEY}
);
}