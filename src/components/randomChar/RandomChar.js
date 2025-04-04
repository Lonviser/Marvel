import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            char: null,
            loading: true,
            error: false
        };
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    onCharLoading = () =>{
        this.setState({
            loading:true
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.setState({ loading: true });
        this.onCharLoading();
        this.marvelService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state;

        const content = !(loading || error || !char) ? (
            <View char={char} />
        ) : loading ? (
            <div className="randomchar__loading"><Spinner/></div>
        ) : error ? (
            <div className="randomchar__error"><ErrorMessage/></div>
        ) : null;

        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    {content}
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button 
                        className="button button__main"
                        onClick={this.updateChar}
                        disabled={loading}
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    
    return (
        <>
            <img 
                src={thumbnail} 
                alt={name} 
                className="randomchar__img"
                style={thumbnail.includes('image_not_available') ? { objectFit: 'contain' } : null}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </>
    );
}

export default RandomChar;