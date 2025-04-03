import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentDidCatch(err, info){
        console.log(err,info);
        this.setState({error:true})
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false
        });
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
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton />;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({ char }) => {
    if (!char) return null;

    const { name, description, thumbnail, homepage, wiki, comics } = char;
    const imgStyle = thumbnail.includes('image_not_available') 
        ? { objectFit: 'contain' } 
        : null;

    return (
        <>
            <div className="char__basics">
                <img 
                    src={thumbnail} 
                    alt={name} 
                    style={imgStyle}
                    onError={(e) => {
                        e.target.src = 'path/to/default/image.jpg';
                    }}
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a 
                            href={homepage} 
                            className="button button__main"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="inner">homepage</div>
                        </a>
                        <a 
                            href={wiki} 
                            className="button button__secondary"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description || 'No description available'}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 
                    ? <li className="char__comics-item">There are no comics with this character</li>
                    : comics.slice(0, 10).map((item) => (
                        <li key={item.resourceURI} className="char__comics-item">
                            {item.name}
                        </li>
                    ))
                }
            </ul>
        </>
    );
}

export default CharInfo;