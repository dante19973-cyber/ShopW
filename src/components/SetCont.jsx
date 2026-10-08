import { cldImg } from '../base/cloudinary';
import { useBasket } from './BaskCon';
const DISCOUNT = 0.05;
export function getSetPrice (items) {
    const total = items.reduce((sum, i) => sum + Number(i.prise), 0);
    const final = Math.round(total * (1 - DISCOUNT));
    return {total, final};
}
function SetCont({ setName, items, onBuy }) {
    const { addItem } = useBasket();
    const { total, final } = getSetPrice(items);
    return (
        <section className="conteiner setConteiner">
            <div className="name">
                <h2>{setName}</h2>
            </div>
            <div className="setItems">
                {items.map((i) => (
                    <div key={i.id} className="setItem">
                        <img src={cldImg(i.img, 150)} alt={i.name} loading="lazy" />
                        <p>{i.name}</p>
                        <p>{i.prise} GOLD</p>
                    </div>
                ))}
            </div>
            <p className="oldPrise"><s>{total} GOLD</s></p>
            <p className="prise">{final} GOLD (−5%)</p>
            <button
                className="buttonBuy"
                onClick={() => addItem({ id: `set-${setName}`, name: `${setName}(set)`,img:items[0]?.img, prise: final })}
            >
                Buy set
            </button>
        </section>
    );
}
export default SetCont