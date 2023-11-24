import { CreditosDTO } from "./creditos-dto";
import { GenericInformation } from "./generic-information";
import { VideoDTO } from "./video-dto";

export interface DetalheFilmeDTO {
    adult: boolean;
    backdropPath: string;
    belongsToCollection: any;
    budget: number;
    genres: GenericInformation[];
    homepage: string;
    id: number;
    imdbId: string;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string;
    productionCompanies: GenericInformation[];
    productionCountries: GenericInformation[];
    releaseDate: string;
    revenue: number;
    runtime: number;
    spokenLanguages: GenericInformation[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
    videos: TmdbCabecalhoDTO<VideoDTO>;
    credits: CreditosDTO;
}