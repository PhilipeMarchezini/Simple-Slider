import { useEffect, useState } from 'react';
import { GET_IMAGES } from './api/imagesApi';
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from 'react-icons/bs';
import styles from './ImagesSlider.module.css';

type PropsImg = {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
};

export const ImagesSlider = () => {
  const [image, setImages] = useState<PropsImg[]>([]);
  const [currentSlider, setCurrentSlider] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const previousImage = () => {
    setCurrentSlider((prev) => {
      if (prev == 0) return image.length - 1;
      else return currentSlider - 1;
    });
    console.log(currentSlider);
  };

  const nextImage = () => {
    setCurrentSlider((prev) => {
      if (prev == image.length - 1) return 0;
      else return currentSlider + 1;
    });
    console.log(currentSlider);
  };

  const handleButtonClick = (index: number) => {
    setCurrentSlider(index);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(GET_IMAGES());
      setLoading(true);
      if (!response.ok) throw new Error('Error to load the images');

      const data = (await response.json()) as PropsImg[];
      setImages(data);
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  return (
    <div className={styles.container}>
      <BsArrowLeftCircleFill
        onClick={previousImage}
        color="white"
        size={40}
        className={`${styles.arrow} ${styles.arrowLeft}`}
      />
      {image && image.length
        ? image.map((imageItem, index) => (
            <img
              key={imageItem.id}
              alt={imageItem.download_url}
              src={imageItem.download_url}
              className={`${
                currentSlider == index
                  ? styles.currentImage
                  : styles.currentImageNone
              }`}
            />
          ))
        : null}
      <BsArrowRightCircleFill
        onClick={nextImage}
        className={`${styles.arrow} ${styles.arrowRight}`}
        color="white"
        size={40}
      />
      <span className={styles.wrapperButton}>
        {image && image.length
          ? image.map((_, index) => (
              <button
                key={index}
                className={`${
                  index == currentSlider ? styles.buttonActive : styles.button
                }`}
                onClick={() => handleButtonClick(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
};
