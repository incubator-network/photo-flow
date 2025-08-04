import { jsx as _jsx } from "react/jsx-runtime";
export function Loader() {
    return (_jsx("div", { className: 'flex h-screen items-center justify-center', children: _jsx("div", { className: 'h-20 w-20 animate-spin rounded-full border-4 border-t-blue-500' }) }));
}
