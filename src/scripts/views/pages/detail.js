import UrlParser from '../../routes/url-parser';
import TheMovieDbSource from '../../data/themoviedb-source';
import { createMovieDetailTemplate } from '../../views/templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';


const Detail = {
  async render() {
    return `
      <div id="movie" class="movie"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const movie = await TheMovieDbSource.detailMovie(url.id);
    const movieContainer = document.querySelector('#movie');
    movieContainer.innerHTML = createMovieDetailTemplate(movie);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        backdropPath: movie.backdrop_path,
        voteAverage: movie.vote_average,
      },
    });
  },
};

export default Detail;