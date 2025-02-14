import React from 'react';
import { Edit, Delete, Visibility, VisibilityOff } from '@mui/icons-material';
import { Product } from '../types/inventory';
import '../styles/App.css';

interface InventoryTableProps {
    loader: boolean;
    products: Product[];
    userView: boolean;
    onEdit?: (product: Product) => void;
    onDelete?: (id: string) => void;
    onToggleStatus?: (id: string) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
    loader,
    products,
    userView,
    onEdit,
    onDelete,
    onToggleStatus,
}) => {
    if (loader) return <div className="loading-spinner" />;

    return (
        <React.Fragment>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>
                            <div className="header-container">Name</div>
                        </th>
                        <th>
                            <div className="header-container">Category</div>
                        </th>
                        <th>
                            <div className="header-container">Price</div>
                        </th>
                        <th>
                            <div className="header-container">Quantity</div>
                        </th>
                        <th>
                            <div className="header-container">Value</div>
                        </th>
                        <th>
                            <div className="header-container">ACTION</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        const price = parseFloat(product.price.replace('$', ''));
                        return (
                            <tr
                                key={product.name}
                                className={product.disabled ? 'disabled-row' : ''}
                            >
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{price.toFixed(2) || 0}</td>
                                <td>{product.quantity}</td>
                                <td>${(product.quantity * price).toFixed(2)}</td>
                                <td>
                                    <button
                                        className="action-button edit-wrapper"
                                        onClick={() => onEdit?.(product)}
                                        disabled={product.disabled || !userView}
                                    >
                                        <Edit style={{ width: 18, height: 18 }} />
                                    </button>
                                    <button
                                        disabled={!userView}
                                        className="action-button disable-wrapper"
                                        onClick={() => onToggleStatus?.(product.name)}
                                    >
                                        {product?.disabled ?
                                            <VisibilityOff style={{ width: 18, height: 18 }} />
                                            : <Visibility style={{ width: 18, height: 18 }} />}
                                    </button>
                                    <button
                                        disabled={!userView}
                                        className="action-button delete-wrapper"
                                        onClick={() => onDelete?.(product.name)}
                                    >
                                        <Delete style={{ width: 18, height: 18 }} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {(products || []).length === 0 ? <div className="no-data-found">
                No Data Found
            </div> : null}
        </React.Fragment>
    );
};