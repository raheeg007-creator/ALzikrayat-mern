import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function PhotoDetail() {
  const { id } = useParams(); // بنجيب رقم الصورة من الرابط
  const { user } = useContext(AuthContext);
  
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // جلب بيانات الصورة
    axios.get(`/api/photos/${id}`).then(res => setPhoto(res.data)).catch(console.error);
    // جلب التعليقات
    axios.get(`/api/photos/${id}/comments`).then(res => setComments(res.data)).catch(console.error);
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please login to comment');
    
    try {
      const res = await axios.post(`/api/photos/${id}/comments`, 
        { comment: newComment },
        { headers: { 'x-user-id': user._id } }
      );
      // تحديث الواجهة فوراً (بنضيف التعليق الجديد في أول القائمة)
      setComments([res.data, ...comments]); 
      setNewComment(''); // تفريغ الخانة
    } catch (err) {
      console.error(err);
      alert('Error adding comment');
    }
  };

  if (!photo) return <h2 style={{textAlign: 'center', marginTop: '50px'}}>Loading...</h2>;

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/gallery" style={{ color: 'blue', textDecoration: 'none', marginBottom: '20px', display: 'block' }}>← Back to Gallery</Link>
      
      <h1 style={{ marginBottom: '5px' }}>{photo.title}</h1>
      <p style={{ color: '#666', fontSize: '14px' }}>Uploaded by {photo.userId?.firstName} {photo.userId?.lastName}</p>
      
      <img 
        src={`/uploads/${photo.fileName}`} 
        alt={photo.title} 
        style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', background: '#222', borderRadius: '10px', marginTop: '15px' }} 
      />
      
      <p style={{ fontSize: '18px', marginTop: '20px' }}>{photo.description}</p>
      
      <hr style={{ margin: '30px 0' }} />
      
      <h3>Comments ({comments.length})</h3>
      
      {/* فورم إضافة تعليق */}
      {user ? (
        <form onSubmit={handleCommentSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Write a comment..." 
            value={newComment} 
            onChange={e => setNewComment(e.target.value)} 
            required 
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Post</button>
        </form>
      ) : (
        <p><Link to="/login">Login</Link> to add a comment.</p>
      )}

      {/* عرض التعليقات */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {comments.map(c => (
          <div key={c._id} style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
            <strong style={{ color: '#333' }}>{c.userId?.firstName}</strong> 
            <span style={{ fontSize: '12px', color: '#888', marginLeft: '10px' }}>
              {new Date(c.dateTime).toLocaleString()}
            </span>
            <p style={{ margin: '5px 0 0 0' }}>{c.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}