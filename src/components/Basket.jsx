import { useState } from 'react';
import { useBasket } from './BaskCon';
import { cldImg } from '../base/cloudinary';
import Checkout from './Check';

function Basket() {
    const { items, total, count, changeQuant, removeItem } = useBasket();
    const [isOpen, setIsOpen] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    return (
        <>
            <button className="basketToggle" onClick={() => setIsOpen(true)} aria-label="Open basket">
                Basket {count}
            </button>
            <aside className={`basket${isOpen ? ' basketOpen' : ''}`} id="basket">
                    <div className="basketHead">
                        <h2>Basket</h2>
                        <button className="basketClose" onClick={() => setIsOpen(false)} aria-label="Close basket">✕</button>
                    </div>
                    {items.length === 0 ? (
                        <p className="no-products">No products in basket</p>
                    ) : (
                        <>
                            <ul className="basketList">
                                {items.map((i) => (
                                    <li key={i.id} className="basketItem">
                                        <img src={cldImg(i.img, 100)} alt={i.name} />
                                        <div className="basketInfo">
                                            <p className="basketName">{i.name}</p>
                                            <p>{i.prise} GOLD</p>
                                        </div>
                                        <div className="basketQty">
                                            <button onClick={() => changeQuant(i.id, -1)}>−</button>
                                            <span>{i.quant}</span>
                                            <button onClick={() => changeQuant(i.id, 1)}>+</button>
                                        </div>
                                        <p className="basketLine">{i.prise * i.quant} GOLD</p>
                                        <button className="basketRemove" onClick={() => removeItem(i.id)}>
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="basketTotal">Total: {total} GOLD</div>
                            <button className="buttonBuy" onClick={() => setCheckoutOpen(true)}>
                                Checkout
                            </button>
                        </>
                    )}
                </aside>

            {checkoutOpen && <Checkout onClose={() => setCheckoutOpen(false)} />}
        </>
    );
}
export default Basket