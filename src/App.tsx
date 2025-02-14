import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ShoppingCart,
  CurrencyExchange,
  RemoveShoppingCart,
  Category,
  Logout,
} from '@mui/icons-material';
import { Product } from './types/inventory';
import { InventoryTable } from './components/InventoryTable.tsx';
import { StatsCard } from './components/StatsCard.tsx';
import { EditProductModal } from './components/EditProductModal.tsx';
import './styles/App.css';
import sampleData from './data/sampleData.json';

const API_URL = 'https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory';

const App: React.FC = () => {
  const { isUser } = useSelector((state: any) => state.isUser);
  const dispatch = useDispatch();

  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [userView, setUserView] = useState<boolean>(isUser || false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoader(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        /* API failing with error 429: too many requests
        * Fallback to sample data */
        setProducts(sampleData);
      } finally {
        setLoader(false);
      }
    };

    fetchProducts();
  }, []);

  const calculateStats = () => {
    const activeProducts = products.filter(p => !p.disabled);
    return {
      totalProducts: activeProducts.length,
      totalValue: activeProducts.reduce((sum, p) => sum + parseFloat(p.price.replace('$', '')) * p.quantity, 0),
      outOfStock: activeProducts.filter(p => p.quantity === 0).length,
      categories: new Set(activeProducts.map(p => p.category)).size,
    };
  };

  const stats = calculateStats();

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = (updatedProduct: Product) => {
    setProducts(products.map(p =>
      p.name === updatedProduct.name ? updatedProduct : p
    ));
    setEditingProduct(null);
  };

  const handleDelete = (name: string) => {
    setProducts(products.filter(p => p.name !== name));
  };

  const handleToggleStatus = (name: string) => {
    setProducts(products.map(p =>
      p.name === name ? { ...p, disabled: !p.disabled } : p
    ));
  };

  const handleToggleAdmin = () => {
    setUserView(!userView);
    dispatch({ type: 'TOGGLE_ADMIN' });
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        admin
        <label className="toggle-switch">
          <input type="checkbox" checked={userView} onChange={handleToggleAdmin} />
          <span className="slider"></span>
        </label>
        user
        <div className="divider"></div>
        <button className="logout-button">
          <Logout />
        </button>
      </header>

      <main className="container">
        <h1 className="app-title">Inventory stats</h1>

        <div className="stats-container">
          <StatsCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<ShoppingCart />}
          />
          <StatsCard
            title="Store Value"
            value={`$${stats.totalValue.toFixed(2)}`}
            icon={<CurrencyExchange />}
          />
          <StatsCard
            title="Out of Stock"
            value={stats.outOfStock}
            icon={<RemoveShoppingCart />}
          />
          <StatsCard
            title="Categories"
            value={stats.categories}
            icon={<Category />}
          />
        </div>

        <InventoryTable
          loader={loader}
          products={products}
          userView={userView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />

        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSave={handleSave}
          />
        )}
      </main>
    </div>
  );
};

export default App;