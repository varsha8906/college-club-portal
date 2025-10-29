import React, { useState } from 'react';
import AuthCard from '../components/AuthCard';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <AuthCard isLogin={isLogin} toggleAuthMode={toggleAuthMode} />
    </div>
  );
}

export default AuthPage;
