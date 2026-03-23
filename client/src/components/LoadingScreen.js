import React from 'react';

const LoadingScreen = () => {
  return (
    <div style={styles.container}>
      {/* Usamos logo.png que es el que ya confirmamos que tienes */}
      <img src="/logo.png" alt="Ambulancias Titan" style={styles.logo} />
      
      <div className="spinner"></div>
      
      <h2 style={styles.title}>Conectando con la Central...</h2>
      <p style={styles.text}>
        Estamos activando nuestros servicios de emergencia.<br />
        <strong>Por favor, espere unos segundos.</strong>
      </p>

      <style>{`
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border-left-color: #d32f2f;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh', display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff',
    textAlign: 'center', padding: '20px', fontFamily: 'sans-serif'
  },
  logo: { width: '120px', marginBottom: '30px' },
  title: { color: '#d32f2f', fontSize: '24px', margin: '10px 0' },
  text: { color: '#555', fontSize: '16px', lineHeight: '1.5' }
};

export default LoadingScreen;