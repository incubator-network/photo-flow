type PropsType = {
    currentPage: number;
    pageSize: number;
    siblingCount?: number;
    totalCount: number;
};
export declare const usePagination: ({ totalCount, pageSize, siblingCount, currentPage, }: PropsType) => (string | number)[] | undefined;
export {};
