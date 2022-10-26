import React, { Component } from "react";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/Paginate";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      sortColumn,
      selectedGenre,
      movies: allMovies,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, datas: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, sortColumn, genres } = this.state;

    if (count === 0) return <p>There's no movies in the database.</p>;

    const { totalCount, datas } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
              items={genres}
            />
          </div>
          <div className="col">
            <p>Showing {totalCount} movies from the database.</p>
            <MoviesTable
              movies={datas}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
