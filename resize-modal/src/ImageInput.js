import './ImageInput.css';

export const ImageInput = ({passImage, zoom, value, preview}) => {

    const setValue = (e) => {
        zoom(e);
    }

    const setImage = (e) => {
        passImage(e);
    }

    return (
        <div className="image-input">
            <input type="file" accept='image/jpg, image/png' onChange={setImage} />
            <input type="range" value = {value} min ="0" max="200" onInput={setValue}/>
            <button onClick={preview}>Preview Image</button>
        </div>
    )
}