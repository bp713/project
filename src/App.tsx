import { Header } from "./components/header";
import { MovieTable } from "./components/movieTable";
import { useSelector } from "react-redux";
import { selectSelectedMovie } from "./features/selectedMovieReducer";

// TODO: use https://giddy-beret-cod.cyclic.app/movieCompanies
const mockMovieCompanyData: any = [{ id: "1", name: "Test Productions" }];

// TODO: use https://giddy-beret-cod.cyclic.app/movies
const mockMovieData: any = [
    {
        id: "1",
        reviews: [6, 8, 3, 9, 8, 7, 8],
        title: "A Testing Film",
        filmCompanyId: "1",
        cost: 534,
        releaseYear: 2005,
    },
    {
        id: "2",
        reviews: [5, 7, 3, 4, 1, 6, 3],
        title: "Mock Test Film",
        filmCompanyId: "1",
        cost: 6234,
        releaseYear: 2006,
    },
];

export const App = () => {
    const selectedMovie = useSelector(selectSelectedMovie);

    return (
        <div>
            <Header></Header>
            <br />
            <MovieTable></MovieTable>
            <br />
            <div>
                {selectedMovie
                    ? (selectedMovie.movie?.title as any)
                        ? (("You have selected " +
                              selectedMovie.movie?.title) as any)
                        : "No Movie Title"
                    : "No Movie Seelcted"}
                {selectedMovie && <p>Please leave a review below</p>}
                {selectedMovie && (
                    <form onSubmit={() => {}}>
                        <label>
                            Review:
                            <input type="text" />
                        </label>
                    </form>
                )}
            </div>
        </div>
    );
};
