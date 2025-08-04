import { ReactNode } from 'react'
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
export declare function AlertProvider({
  children,
}: {
  children: ReactNode
}): import('react/jsx-runtime').JSX.Element
