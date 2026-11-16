import { useState } from 'react';

export default function Gallery() {
  // داتا تجريبية مؤقتة لحد ما نربط الداتابيز
  const [photos, setPhotos] = useState([
    { _id: '1', title: 'Beautiful Sunset', fileName: 'https://picsum.photos/300/200?random=1' },
    { _id: '2', title: 'Mountain View', fileName: 'https://picsum.photos/300/200?random=2' },
    { _id: '3', title: 'City Lights', fileName: 'https://picsum.photos/300/200?random=3' }
  ]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Photo Gallery</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {photos.map(photo => (
          <div key={photo._id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <img src={photo.fileName} alt={photo.title} style={{ width: '100%', borderRadius: '5px' }} />
            <h3>{photo.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}