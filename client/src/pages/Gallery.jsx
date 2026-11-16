import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // جلب الصور من الباك إند
    axios.get('/api/photos')
      .then(res => setPhotos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1>Photo Gallery</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {photos.map(photo => (
          <div key={photo._id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', background: '#fff' }}>
            {/* مسار الصورة بيبدأ بـ /uploads */}
            <img src={`/uploads/${photo.fileName}`} alt={photo.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
            <h3 style={{ margin: '10px 0' }}>{photo.title}</h3>
            <p style={{ fontSize: '12px', color: '#666' }}>By: {photo.userId?.firstName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}