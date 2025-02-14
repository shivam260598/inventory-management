import React, { useState } from 'react';
import { Product } from '../types/inventory';
import '../styles/App.css';
import CloseIcon from '@mui/icons-material/Close';

interface EditProductModalProps {
    product: Product;
    onClose: () => void;
    onSave: (product: Product) => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
    product,
    onClose,
    onSave,
}) => {
    const [editedProduct, setEditedProduct] = useState(product);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedProduct);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">Edit Product</div>
                    <button className="close-button" onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="modal-subheading">{product.name}</div>

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={editedProduct.name}
                                onChange={(e) =>
                                    setEditedProduct({ ...editedProduct, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                id="price"
                                type="number"
                                value={parseFloat(editedProduct.price.replace('$', ''))}
                                onChange={(e) =>
                                    setEditedProduct({
                                        ...editedProduct,
                                        price: `$${parseFloat(e.target.value)}`,
                                    })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                id="quantity"
                                type="number"
                                value={editedProduct.quantity}
                                onChange={(e) =>
                                    setEditedProduct({
                                        ...editedProduct,
                                        quantity: parseInt(e.target.value),
                                    })
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input
                                id="category"
                                type="text"
                                value={editedProduct.category}
                                onChange={(e) =>
                                    setEditedProduct({
                                        ...editedProduct,
                                        category: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="button" className="button button-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="button button-primary">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};