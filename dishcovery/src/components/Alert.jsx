function Alert({ message, type = 'error', onClose }) {
  const alertTypeClasses =
    type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${alertTypeClasses} transition-opacity duration-300 opacity-100`}
    >
      {message}
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 p-1 bg-white text-black rounded-full"
        >
          <span>&times;</span>
        </button>
      )}
    </div>
  );
}

export default Alert;