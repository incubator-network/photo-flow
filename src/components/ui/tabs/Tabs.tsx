import * as TabsPrimitive from '@radix-ui/react-tabs'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

/**
 * `Tabs` — корневой компонент системы вкладок.
 *
 * Используется для создания набора вкладок с переключаемым контентом.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Вкладка 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Вкладка 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Контент 1</TabsContent>
 *   <TabsContent value="tab2">Контент 2</TabsContent>
 * </Tabs>
 * ```
 *
 * @param className Классы Tailwind для стилизации контейнера
 * @param props Остальные свойства от `TabsPrimitive.Root`
 */

function Tabs({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot='tabs'
      className={twMerge('flex flex-col', className)}
      {...props}
    />
  )
}

/**
 * `TabsList` — контейнер для набора вкладок (`TabsTrigger`).
 *
 * Располагает триггеры горизонтально или вертикально.
 *
 * @param className Классы Tailwind для стилизации
 * @param props Остальные свойства от `TabsPrimitive.List`
 */

function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List data-slot='tabs-list' className={twMerge('mb-6', className)} {...props} />
  )
}

/**
 * `TabsTrigger` — кнопка переключения между вкладками.
 *
 * Обязателен проп `value`, совпадающий с `TabsContent`.
 * Визуально выделяется при активации.
 *
 * @param value Значение вкладки
 * @param className Классы Tailwind для стилизации
 * @param props Остальные свойства от `TabsPrimitive.Trigger`
 */

function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={twMerge(
        'border-b-dark-100 text-h3 text-dark-100 cursor-pointer border-b-2 px-6 py-1.5',
        'data-[state=active]:border-b-accent-500 data-[state=active]:text-accent-500 active:bg-accent-100/15',
        'data-[state=active]:hover:bg-accent-900/15 hover:bg-accent-900/15',
        'focus:outline-none focus-visible:ring-2',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

/**
 * `TabsContent` — содержимое для соответствующей вкладки.
 *
 * Должен иметь `value`, совпадающий с `TabsTrigger`.
 *
 * @param value Значение, соответствующее `TabsTrigger`
 * @param className Классы Tailwind для стилизации
 * @param props Остальные свойства от `TabsPrimitive.Content`
 */

function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={twMerge('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
