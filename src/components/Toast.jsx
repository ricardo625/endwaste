import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import './Toast.css'

const ToastContext = createContext(null)

function ToastItem({ id, message, onUndo, duration, onRemove }) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(id), duration)
    return () => clearTimeout(t)
  }, [id, duration, onRemove])

  return (
    <div className="toast">
      <span className="toast-message">{message}</span>
      {onUndo && (
        <button className="toast-undo-btn" onClick={() => { onUndo(); onRemove(id) }}>
          Undo
        </button>
      )}
      <div className="toast-progress" style={{ animationDuration: `${duration}ms` }} />
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const remove = useCallback(id => setToasts(prev => prev.filter(t => t.id !== id)), [])

  const show = useCallback(({ message, onUndo, duration = 4000 }) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, onUndo, duration }])
  }, [])

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="toast-stack">
        {toasts.map(t => (
          <ToastItem key={t.id} {...t} onRemove={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
