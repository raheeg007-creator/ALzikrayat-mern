import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();


  const [lastLogin, setLastLogin] = useState('');

useEffect(() => {
  // قراءة الكوكي
  const cookies = document.cookie.split('; ');
  const lastLoginCookie = cookies.find(row => row.startsWith('lastLogin='));
  if (lastLoginCookie) {
    setLastLogin(lastLoginCookie.split('=')[1]);
  }
}, []);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(endpoint, payload);
      
      login(res.data); // حفظ بيانات المستخدم
      navigate('/gallery'); // توجيهه للمعرض بعد النجاح
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>{isLogin ? 'Login' : 'Create an Account'}</h2>
      // عرض آخر تسجيل دخول إذا كان موجود
      {lastLogin && isLogin && (
     <p style={{ textAlign: 'center', color: 'gray', fontSize: '12px' }}>
      Last login: {new Date(lastLogin).toLocaleString()}
    </p>
    )}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {!isLogin && (
          <>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required style={{ padding: '10px' }} />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required style={{ padding: '10px' }} />
          </>
        )}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{ padding: '10px' }} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ padding: '10px' }} />
        
        <button type="submit" disabled={loading} style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', cursor: 'pointer', color: 'blue' }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register here" : "Already have an account? Login here"}
      </p>
    </div>
  );
}