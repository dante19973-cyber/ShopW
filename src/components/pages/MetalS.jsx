import {useState} from 'react';
import Filter from '../../components/Filter'
import List from '../../components/List';
import useProd from '../../hooks/useProd';
function MetalS (){
    const { products, loading, error } = useProd('MetalS');
    const [filters, setFilters]=useState({
        priseF:'',
        priseT:'',
        rarity:'',
        sortP:'↑'
    });
    const filteredP= products.filter(prod=>{
        if(filters.priseF&&prod.prise<Number(filters.priseF))return false;
        if(filters.priseT&&prod.prise>Number(filters.priseT))return false;
        if(filters.rarity&&prod.rarity!==filters.rarity)return false;
        return true;
    })
    const sortedP=[...filteredP].sort((a,b)=>{
        if (filters.sortP === '↑') return Number(a.prise) - Number(b.prise);
        if (filters.sortP === '↓') return Number(b.prise) - Number(a.prise);
        return 0;
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong</p>
    return(
        <div className="Category">
            <h1>Steel Sword</h1>
            <Filter filters={filters} onChange={setFilters}/>
            <List products={sortedP} />
        </div>
    )
}
export default MetalS