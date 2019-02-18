import React, { Component } from 'react';
import styles from './autocomplete.css';

class Autocomplete extends Component {
    state = {
        results: [],
        searchTerm: '',
        error: '',
        active: false
    };

    MAX_RESULTS = 8;
    API_KEY = 'cab2afe8b43cf5386e374c47aeef4fca';
    //API_KEY = process.env.API_KEY; // <- This should be used instead, for security

    movieSelect = title => {
        this.setState({
            searchTerm: title,
            results: [],
            active: false,
            error: ''
        });
    }

    renderMovies = () => {

        return this.state.results.map(result => {
            return (
                <div
                    className={ styles.movies_container }
                    key={ result.id }
                    onClick={ this.movieSelect.bind(this, result.title) }
                >
                    <span className={styles.movies_title}>{ result.title }</span>
                    <div>{ result.vote_average } Rating, { result.release_date.slice(0, 4) }</div>
                </div>
            )
        });
    }

    handleChange = e => {
        const value = e.target.value;
        this.setState({
            results: value.length >= 3 ? this.state.results : [],
            searchTerm: value,
            active: value.length > 0,
            error: value.length < 3 ? "Please enter at least 3 characters" : ""
        });
        if (value.length >= 3) this.fetchMovies(value);
    }

    fetchMovies = text => {
        const url = 'https://api.themoviedb.org/3/search/movie?'
        + `api_key=${this.API_KEY}`
        + `&language=en-US&query=${text}`
        + '&page=1&include_adult=false';

        fetch(url)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    results: data.results.slice(0, this.MAX_RESULTS),
                    error: data.results.length < 1 ? "Your search returned no results" : ""
                }),
            )
            .catch(error => this.setState({ error, active: true }));
    }

    render() {
        const { error, searchTerm, active } = this.state;
        return <div className={styles.container}>
            <div className={styles.form_container}>
                <div className={ `material-icons ${styles.movie_icon_white}` }>
                    movie
                </div>
                <div className={styles.search_container}>
                    <div className={styles.input_container}>
                        {active && <div className={`material-icons ${styles.movie_icon_black}`}>
                            movie
                        </div>}
                        <input
                            placeholder="Enter movie name"
                            onChange={this.handleChange}
                            className={active ? styles.active_input : styles.passive_input}
                            value={searchTerm}
                        />
                    </div>
                    {active && <div className={styles.enter_movie_name}>Enter a movie name</div>}
                    {error && active && <div className={styles.error}>{error}</div>}
                    {!error && active && this.renderMovies()}
                </div>
                {!active && <div className={ `material-icons ${styles.search_icon}` }>
                    search
                </div>}
            </div>
        </div>
    }

}

export default Autocomplete;
