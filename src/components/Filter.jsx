import { useState } from 'react';
const TEXT = {
    filters: 'Filters',
    rarity: 'Rarity',
    price: 'Price',
    min: 'Min',
    max: 'Max',
    sort: 'Sort',
    asc: 'Price: low to high',
    desc: 'Price: high to low',
    reset: 'Reset'
};
const RARITIES = [
    { value: '', label: 'All' },
    { value: 'Common', label: 'Common' },
    { value: 'Rare', label: 'Rare' },
    { value: 'Epic', label: 'Epic' },
    { value: 'Legendary', label: 'Legendary' }
];
const MAX_PRICE = 5000;
const STEP = 50;
function Filter({ filters, onChange }) {
    const [open, setOpen] = useState(false);
    const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });
    const maxNum = filters.priseT === '' ? MAX_PRICE : Number(filters.priseT);
    const sliderValue = Math.min(Math.max(maxNum || 0, 0), MAX_PRICE);
    const setSlider = (e) => {
        const v = Number(e.target.value);
        onChange({ ...filters, priseT: v >= MAX_PRICE ? '' : String(v) });
    };
    const reset = () => onChange({ ...filters, priseF: '', priseT: '', rarity: '', sortP: '↑' });
    return (
        <div className={`filter${open ? ' filterOpen' : ''}`}>
            <button type="button" className="filterHead" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
                {TEXT.filters}
            </button>
            <div className="filterBody">
                <fieldset className="filterSection">
                    <legend className="filterLabel">{TEXT.rarity}</legend>
                    {RARITIES.map((r) => (
                        <label key={r.value} className="radio">
                            <input
                                type="radio"
                                name="rarity"
                                value={r.value}
                                checked={filters.rarity === r.value}
                                onChange={set('rarity')}
                            />
                            <span>{r.label}</span>
                        </label>
                    ))}
                </fieldset>
                <section className="filterSection">
                    <h3 className="filterLabel">{TEXT.price}</h3>
                    <div className="priceRange">
                        <input type="number" min="0" placeholder={TEXT.min} aria-label={TEXT.min}
                               value={filters.priseF} onChange={set('priseF')} />
                        <input type="number" min="0" placeholder={TEXT.max} aria-label={TEXT.max}
                               value={filters.priseT} onChange={set('priseT')} />
                    </div>
                    <input
                        type="range"
                        className="slider"
                        min={0}
                        max={MAX_PRICE}
                        step={STEP}
                        value={sliderValue}
                        onChange={setSlider}
                        aria-label={TEXT.max}
                        style={{ '--fill': `${(sliderValue / MAX_PRICE) * 100}%` }}
                    />
                    <div className="sliderScale"><span>0</span><span>{MAX_PRICE}+</span></div>
                </section>
                <section className="filterSection">
                    <h3 className="filterLabel">{TEXT.sort}</h3>
                    <select value={filters.sortP} onChange={set('sortP')}>
                        <option value="↑">{TEXT.asc}</option>
                        <option value="↓">{TEXT.desc}</option>
                    </select>
                </section>
                <button type="button" className="buttonCancel" onClick={reset}>{TEXT.reset}</button>
            </div>
        </div>
    );
}
export default Filter