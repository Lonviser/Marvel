import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';


class CharList extends Component {
    state = {
        charList: [],  // Массив вместо null
        loading: true,
        error: false
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList();
    }

    onCharListLoaded = (charList) => {
        this.setState({ charList, loading: false });
    };

    onError = () => {
        this.setState({ error: true, loading: false });
    };

    updateCharList = () => {
        this.setState({ loading: true });
        const offset = Math.floor(Math.random() * 500);  // Случайный offset от 0 до 4999
    
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    };

    render() {
        const { charList, loading } = this.state;
        
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {charList.map((char) => (
                        <li key={char.id} className="char__item">
                            <img src={char.thumbnail} alt={char.name} style={char.thumbnail.includes('image_not_available') ? { objectFit: 'contain' } : null} />
                            <div className="char__name">{char.name}</div>
                        </li>
                    ))}
                </ul>
                <button 
                    className="button button__main button__long"
                    onClick={this.updateCharList}
                    disabled={loading}
                >
                    <div className="inner">
                        {loading ? "Loading..." : "Load more"}
                    </div>
                </button>
            </div>
        );
    }
}

export default CharList;