import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMovies = async () => {
    const tmp = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    const { // 구조 분해 할당
      data: { // json안의 데이터 중에 data.data.movies만을 추출해 movies객체에 저장
        data: { movies },
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    this.setState({ movies, isLoading: false }); // 구조 분해 할당  == this.setState({movies:movies}); <- 변수명이 같으면 축약 가능
  } // json 파일 로딩 완료시 isLoading변수를 false로 바꿈. setState함수 호출다음 자동으로 render함수 호출

  componentDidMount() { // 영화 데이터 로딩
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
            <div className="movies">
              {movies.map(movie => (
                <Movie
                  key={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
                ))}
            </div>
          )}
      </section>
    );
  }
}

export default Home;