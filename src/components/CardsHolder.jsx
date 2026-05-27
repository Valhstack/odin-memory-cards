import { Card } from "./Card.jsx";

export function CardsHolder({ images, onImageClick }) {
    return (
        <div id="cards-holder-wrapper">
            {
                images.map(image => (
                    <Card img={image} onImageClick={onImageClick} key={image.id} />
                ))
            }
        </div>
    )
}