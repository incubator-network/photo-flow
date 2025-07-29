'use client'

import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Alert } from './Alert'
import { AlertContext } from './AlertContext'
import { AlertData } from './AlertTypes'
import { alertService } from './alertService'

/**
 * AlertProvider — контекст-провайдер для глобальной системы оповещений (alert).
 *
 * Оборачивает всё приложение и предоставляет метод `showAlert` через контекст.
 * Алерт отображается через React Portal в элемент с id="alert-root".
 *
 * Пример использования:
 * const { showAlert } = useAlert()!
 * useAlert из AlertContext
 * '!' используется для указанию TS, что showAlert точно не null
 * showAlert({ message: 'Что-то пошло не так', type: 'error' });
 *
 * @param {Object} props
 * @param {ReactNode} props.children - Дочерние компоненты, которым будет доступен `showAlert`.
 * @returns {JSX.Element}
 */
export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertData | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Устанавливаем флаг, когда компонент смонтирован (чтобы избежать ошибок с document)
    setMounted(true)
  }, [])

  /**
   * Показывает алерт с заданным сообщением и типом.
   * Алерт исчезает автоматически через 3 секунды.
   *
   * @param {AlertData} data - Данные для отображения алерта.
   */
  const showAlert = useCallback((data: AlertData) => {
    setAlert(data)
  }, [])

  useEffect(() => {
    alertService.subscribe(showAlert)
  }, [showAlert])

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {mounted &&
        alert &&
        createPortal(
          <Alert
            message={alert.message}
            type={alert.type ?? 'info'}
            onClose={() => {
              setAlert(null)
            }}
          />,
          document.getElementById('alert-root')!
        )}
    </AlertContext.Provider>
  )
}
