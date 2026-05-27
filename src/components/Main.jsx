import { useEffect, useState } from 'react';
import { CardsHolder } from './CardsHolder.jsx';
import { Scores } from './Scores.jsx';
import { Header } from './Header.jsx';
import { DifficultySelector } from './DifficultySelector.jsx';

export function Main() {
    const [images, setImages] = useState(() => {
        const storedImages = sessionStorage.getItem('cat-images');
        return storedImages ? JSON.parse(storedImages) : [];
    });

    const [clickedImages, setClickedImages] = useState([]);

    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(() => {
        const bestUsersScore = localStorage.getItem('best-score');
        return bestUsersScore ? JSON.parse(bestUsersScore) : 0;
    });

    const max = 9;

    useEffect(() => {
        if (images.length >= max) return;

        const fetchImages = async () => {
            let collectedImages = [];

            while (collectedImages.length < max) {
                const response = await fetch(
                    `https://api.thecatapi.com/v1/images/search?limit=${max}&breed_ids=siam,beng,mcoo,rblu&size=full`
                );

                const data = await response.json();

                const verticalImages = data.filter(d => d.height > d.width && !collectedImages.some(img => img.id === d.id));

                collectedImages = [
                    ...collectedImages,
                    ...verticalImages
                ];
            }

            const finalImages = collectedImages.slice(0, 10);

            setImages(finalImages);

            sessionStorage.setItem(
                'cat-images',
                JSON.stringify(finalImages)
            );
        };

        fetchImages();
    }, [images]);

    const shuffleArray = (array) => {
        const shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[j]] = [
                shuffled[j],
                shuffled[i]
            ];
        }

        return shuffled;
    }

    const handleImgClick = (e) => {
        console.log('Img ID: ' + e.target.dataset.id + ' is clicked');
        if (clickedImages.some(img => img.id === e.target.dataset.id)) {
            if (currentScore > bestScore) {
                setBestScore(currentScore);
                localStorage.setItem('best-score', JSON.stringify(currentScore));
            }

            setCurrentScore(0);
            const storedImages = sessionStorage.getItem('cat-images');
            setImages(JSON.parse(storedImages));
            setClickedImages([]);
        }
        else {
            if (currentScore === max) {
                setCurrentScore(0);
                const storedImages = sessionStorage.getItem('cat-images');
                setImages(JSON.parse(storedImages));
                setClickedImages([]);
            }
            else {
                setClickedImages(prev => [
                    ...prev,
                    images.find(image => image.id === e.target.dataset.id)
                ]);

                setImages(shuffleArray(images));

                setCurrentScore(prevScore => prevScore + 1);
            }
        }

        console.log(currentScore);
    }

    console.log(clickedImages);

    return (
        <div id="main" className="main">
            <Header />
            <DifficultySelector />
            <Scores currentScore={currentScore} bestScore={bestScore} />
            <CardsHolder images={images} onImageClick={handleImgClick} />
        </div>
    );
}