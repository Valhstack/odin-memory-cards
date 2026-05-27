export function Card({ img, onImageClick }) {
    return (
        <div className="card-img-wrapper" data-id={img.id}>
            <img src={img.url} data-id={img.id} className='card-img' onClick={onImageClick} />
        </div>
    )
}