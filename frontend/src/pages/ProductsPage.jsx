import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

const ProductCard = ({ product }) => (
  <div className="card">
    {product.image_url && <img src={product.image_url} alt={product.name} style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />}
    <h3>{product.name}</h3>
    <p>{product.description}</p>
    <a href={product.affiliate_link} target="_blank" rel="noopener noreferrer">
      Check it out
    </a>
  </div>
);

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</p>;

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <h1 style={{ textAlign: 'center', color: 'var(--primary-dark)' }}>Recommended Products</h1>
      <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
        A curated list of tools, books, and resources we recommend.
      </p>
      <div className="card-grid">
        {products.length > 0 ? (
          products.map(prod => <ProductCard key={prod.id} product={prod} />)
        ) : (
          <p style={{ textAlign: 'center' }}>No products have been recommended yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;