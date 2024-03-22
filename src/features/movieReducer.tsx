import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export type MovieType = {
    id: string;
    title: string;
    reviews: number[];
    filmCompanyId: string;
    cost: number;
    releaseYear: number;
};

export type MovieCompanyType = {
    id: string;
    name: string;
};

export type MovieReducerType = {
    moviesList: MovieType[];
    movieCompaniesList: MovieCompanyType[];
    selectedMovie: MovieType | null;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | undefined;
};

export const loadMovies = createAsyncThunk("movies/getAllMovies", async () => {
    try {
        const moviesResponse = await fetch("http://localhost:3000/movies");
        const movies = await moviesResponse.json();
        const movieCompanieResponse = await fetch(
            "http://localhost:3000/movieCompanies",
        );
        const movieCompanies = await movieCompanieResponse.json();
        return { movies, movieCompanies };
    } catch (error) {
        throw new Error("Error Fetching Movies");
    }
});

const initialState: MovieReducerType = {
    moviesList: [],
    movieCompaniesList: [],
    selectedMovie: null,
    isLoading: false,
    hasError: false,
    errorMessage: undefined,
};

export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        changeSelectedMovie: (state, action: PayloadAction<MovieType>) => {
            state.selectedMovie = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadMovies.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        });
        builder.addCase(loadMovies.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.moviesList = action.payload.movies;
            state.movieCompaniesList = action.payload.movieCompanies;
        });
        builder.addCase(loadMovies.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
            state.errorMessage = action.error.message;
            state.moviesList = [];
            state.movieCompaniesList = [];
        });
    },
});

export const { changeSelectedMovie } = moviesSlice.actions;

export default moviesSlice.reducer;

export const selectNumberOfMovies = (state: RootState) => {
    return state.movies.moviesList.length;
};

export const selectMovies = (state: RootState) => {
    return state.movies.moviesList;
};

export const selectError = (state: RootState) => {
    return state.movies.hasError;
};
export const selectErrorMessage = (state: RootState) => {
    return state.movies.errorMessage;
};
export const selectIsLoading = (state: RootState) => {
    return state.movies.isLoading;
};
export const selectMovieCompanies = (state: RootState) => {
    return state.movies.movieCompaniesList;
};
export const selectSelectedMovie = (state: RootState) => {
    return state.movies.selectedMovie;
};
