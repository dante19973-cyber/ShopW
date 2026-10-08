import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../base/firebase.js';

function useProd(category) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        get(ref(db, 'products'))
            .then((snap) => {
                if (cancelled) return;
                const val = snap.val() || {};
                let list = Object.entries(val).map(([id, data]) => ({ id, ...data }));
                if (category) list = list.filter((p) => p.category === category);
                setProducts(list);
                setLoading(false);
            })
            .catch((e) => {
                if (cancelled) return;
                setError(e);
                setLoading(false);
            });

        return () => { cancelled = true; };
    }, [category]);

    return { products, loading, error };
}
export default useProd