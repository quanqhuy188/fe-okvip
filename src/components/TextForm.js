import React, { useState } from 'react';

const TextForm = ({ onSubmit, loading }) => {
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(quantity);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nhập số lượng cần random:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Đang thêm...' : 'Thêm Text'}
      </button>
    </form>
  );
};

export default React.memo(TextForm);
