import emailjs from '@emailjs/browser';
export default function sendOrder(order) {
    const itemsText = order.items
        .map((i) => `${i.name} × ${i.quant} = ${i.prise * i.quant} GOLD`)
        .join('\n');
    const totalValue = order.total ?? order.items.reduce((sum, i) => sum + (i.prise * i.quant), 0);
    return emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
            customer_name: order.customer.name,
            customer_phone: order.customer.phone,
            customer_email: order.customer.email,
            items: itemsText,
            total: totalValue,               // ← тільки число
            order_date: new Date().toISOString(),
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
    );
}