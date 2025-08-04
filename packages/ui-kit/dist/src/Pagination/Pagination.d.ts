export type PaginationPropsType = {
    id?: string;
    currentPage: number;
    itemsPerPage: number;
    totalCount: number;
    onChangePagination: (page: number, count: number) => void;
};
export declare const Pagination: ({ currentPage, itemsPerPage, totalCount, onChangePagination, }: PaginationPropsType) => import("react/jsx-runtime").JSX.Element | null;
