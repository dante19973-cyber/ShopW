import Container from './Container';

function ProductList({ products, onBuy }) {
    if (!products || products.length === 0) {
        return <p className="no-products">Products not found</p>;
    }
    return (
        <div className="productL">
            {products.map((item) => (
                <Container key={item.id} product={item} onBuy={onBuy} />
            ))}
        </div>
    );
}
export default ProductList;