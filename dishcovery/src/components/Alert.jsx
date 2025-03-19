// src/components/Alert.jsx
function Alert({ message, type = 'error' }) {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${
        type === 'error' ? 'bg-red-500' : 'bg-green-500'
      }`}
    >
      {message}
    </div>
  );
}

export default Alert;