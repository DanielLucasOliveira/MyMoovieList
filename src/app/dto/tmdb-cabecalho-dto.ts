export interface TmdbCabecalhoDTO<T> {
    page: number;
    results: T[];
    totalPages: number;
    totalResults: number;
}