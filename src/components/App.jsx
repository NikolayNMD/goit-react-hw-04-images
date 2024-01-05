import { useState, useEffect } from 'react';
import { AppContainer } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import * as API from '../api/api';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    async function addImages() {
      try {
        setIsLoading(true);
        const data = await API.getImages(searchName, page);

        if (data.hits.length === 0) {
          return toast.warn('Sorry image not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        const normalizedImages = API.normalizedImages(data.hits);

        setImages(prevImages => [...prevImages, ...normalizedImages]);
        setIsLoading(false);
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch {
        toast.error('Something went wrong!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setIsLoading(false);
      }
    }
    addImages();
  }, [searchName, page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSubmit = query => {
    setSearchName(query);
    setImages([]);
    setPage(1);
  };

  const handleOpenModal = selectedImage => {
    setIsModalOpen(true);
    setModalData(selectedImage);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ToastContainer transition={Slide} />
      <AppContainer>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} handleOpenModal={handleOpenModal} />
        {isLoading && <Loader />}
        {images.length > 0 && totalPages !== page && !isLoading && (
          <Button onClick={loadMore} title={'Load More'} />
        )}
        {isModalOpen && (
          <Modal modalData={modalData} handleCloseModal={handleCloseModal} />
        )}
      </AppContainer>
    </>
  );
};
