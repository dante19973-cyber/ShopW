import useStore from '../../hooks/useStore';
import Filter from '../../components/Filter';
import SetCont, { getSetPrice } from '../../components/SetCont';
import useProd from '../../hooks/useProd';
function Sets() {
    const { products, loading, error } = useProd();
    const [filters, setFilters] = useStore('filters:Sets',{
        priseF: '',
        priseT: '',
        rarity: '',
        sortP: '↑'
    });
    const groups = products.reduce((acc, p) => {
        if (!p.setName) return acc;
        (acc[p.setName] ||= []).push(p);
        return acc;
    }, {});
    const sets = Object.entries(groups).map(([name, items]) => ({
        name,
        items,
        ...getSetPrice(items)
    }));
    const filteredS = sets.filter((s) => {
        if (filters.priseF && s.final < Number(filters.priseF)) return false;
        if (filters.priseT && s.final > Number(filters.priseT)) return false;
        if (filters.rarity && !s.items.some((i) => i.rarity === filters.rarity)) return false;
        return true;
    });
    const sortedS = [...filteredS].sort((a, b) => {
        if (filters.sortP === '↑') return a.final - b.final;
        if (filters.sortP === '↓') return b.final - a.final;
        return 0;
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong</p>;
    return (
        <div className="Category">
            <h1>Sets</h1>
            <Filter filters={filters} onChange={setFilters} />
            {sortedS.length === 0
                ? <p className="no-products">Sets not found</p>
                : <div className="products-grid">
                    {sortedS.map((s) => (
                        <SetCont key={s.name} setName={s.name} items={s.items} />
                    ))}
                </div>}
        </div>
    );
}
export default Sets