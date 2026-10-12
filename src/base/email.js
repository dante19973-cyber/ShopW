import emailjs from '@emailjs/browser';

const num = (v) => Number(v) || 0;

export function sendOrder(order) {
    const items = Array.isArray(order.items) ? order.items : [];

    const lines = items.map((i) => {
        const price = num(i.prise ?? i.price);
        const qty = num(i.quant ?? i.quantity ?? i.qty ?? 1);
        return { text: `${i.name} × ${qty} = ${price * qty} GOLD`, sum: price * qty };
    });

    const total = order.total ?? lines.reduce((s, l) => s + l.sum, 0);

    const params = {
        customer_name: order.customer?.name ?? '',
        customer_phone: order.customer?.phone ?? '',
        customer_email: order.customer?.email ?? '',
        order_items: lines.length ? lines.map((l) => l.text).join('\n') : '(without items)',
        order_total: total,
        order_date: new Date(order.createdAt ?? Date.now()).toLocaleString('en')
    };

    console.log('EmailJS params', params);

    return emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        params,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
    );
}
export default sendOrder