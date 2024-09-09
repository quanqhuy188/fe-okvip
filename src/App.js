import React, { useState, useEffect } from 'react';
import WindowedSelect from 'react-windowed-select';

function App() {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [records, setRecords] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5184/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quantity),
      });

      if (response.ok) {
        setMessage(`Đã thêm ${quantity} random text thành công!`);
        await fetchRecords();
      } else {
        setMessage('Có lỗi xảy ra khi thêm random text.');
      }
    } catch (error) {
      setMessage('Lỗi kết nối tới server.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await fetch(`http://localhost:5184/api/get-all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        setRecords(data)
      } else {
        setMessage('Có lỗi xảy ra khi lấy danh sách các bản ghi.');
      }
    } catch (error) {
      setMessage('Lỗi kết nối tới server.');
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const options = records.map((record)=>({
    value:record.id,
    label:record.randomText
  }))
  return (
    <div className="App">
      <h1>Thêm random Text Ngẫu Nhiên</h1>
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

      {message && <p>{message}</p>}

      <div>
      <h2>Danh sách các bản ghi</h2>
      <WindowedSelect
        options={options}
        height={400}
        windowThreshold={1000}
      />
      {/* <select  >
        {records.map(record => (
          <option key={record.id} value={record.id}>
            {record.randomText}
          </option>
        ))}
      </select> */}
        </div>
    </div>
  );
}

export default App;
