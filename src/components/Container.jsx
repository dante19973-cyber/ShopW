import { cldImg } from '../base/cloudinary';
import { useBasket } from './BaskCon';
const STARS={Common:1,Rare:2,Epic:3,Legendary:4};
function Container({ product }) {
    const { name, img, type, rarity, characteristics, prise } = product;
    const { addItem } = useBasket();
    return (
        <section className="conteiner">
            <div className="name">
                <h2>{name}</h2>
            </div>
            <img src={cldImg(img, 400)} alt={name} loading="lazy" />
            <h3>{type}</h3>
            <p className="rarity" title={rarity}>{STARS[rarity]?'★'.repeat(STARS[rarity]):rarity}</p>
            <p className="characteristics">{characteristics}</p>
            <p className="prise">{prise} GOLD</p>
            <button className="buttonBuy" onClick={() => addItem(product)}>Buy</button>
        </section>
    )
}
export default Container