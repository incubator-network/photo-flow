import * as TabsPrimitive from '@radix-ui/react-tabs';
import { ComponentProps } from 'react';
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
declare function Tabs({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
/**
 * `TabsList` — контейнер для набора вкладок (`TabsTrigger`).
 *
 * Располагает триггеры горизонтально или вертикально.
 *
 * @param className Классы Tailwind для стилизации
 * @param props Остальные свойства от `TabsPrimitive.List`
 */
declare function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>): import("react/jsx-runtime").JSX.Element;
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
declare function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
/**
 * `TabsContent` — содержимое для соответствующей вкладки.
 *
 * Должен иметь `value`, совпадающий с `TabsTrigger`.
 *
 * @param value Значение, соответствующее `TabsTrigger`
 * @param className Классы Tailwind для стилизации
 * @param props Остальные свойства от `TabsPrimitive.Content`
 */
declare function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { Tabs, TabsList, TabsTrigger, TabsContent };
