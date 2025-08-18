import React, { useState, useEffect } from 'react';
import api from '../../axios';

export default function DepartmentDetail({ id, onClose }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/api/mst-department/${id}`).then(res => setData(res.data));
  }, [id]);

  if (!data) {
    return (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.content}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.content}>
        <h2>Detail Department</h2>
        <p><b>Department No:</b> {data.department_no}</p>
        <p><b>Department Name:</b> {data.department_name}</p>
        <p><b>Descriptions:</b> {data.descriptions}</p>
        <p><b>Header:</b> {data.header}</p>
        <p><b>Sub Department:</b> {data.sub_department}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
    alignItems: 'center', justifyContent: 'center'
  },
  content: {
    background: '#fff', padding: '20px', borderRadius: '8px', minWidth: '400px'
  }
};
