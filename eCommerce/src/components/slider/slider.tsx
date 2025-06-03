import { useState } from 'react';
import { Wrapper } from '../wrapper/wrapper';
import { Img } from '../img/img';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import '../../styles/components/_slider.scss';
import { Modal } from '../modal/modal';

type ImgSliderProps = {
  imgUrls: string[];
};

export const ImgSlider: React.FC<ImgSliderProps> = ({ imgUrls }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Wrapper className="wrapper-slider">
        <Swiper modules={[Navigation]} navigation loop={true} slidesPerView={1}>
          {imgUrls.map((url, i) => (
            <SwiperSlide
              key={i}
              style={{ cursor: 'pointer' }}
              onClick={() => setIsOpen(true)}
            >
              <Wrapper className="wrapper-product-img">
                <Img className="product-img" src={url} alt={`Image ${i + 1}`} />
              </Wrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </Wrapper>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <Wrapper className="wrapper-slider modal-slider">
            <Swiper
              modules={[Navigation]}
              navigation
              loop={true}
              slidesPerView={1}
            >
              {imgUrls.map((url, i) => (
                <SwiperSlide key={i}>
                  <Wrapper className="wrapper-product-img">
                    <Img
                      className="product-img"
                      src={url}
                      alt={`Image ${i + 1}`}
                    />
                  </Wrapper>
                </SwiperSlide>
              ))}
            </Swiper>
          </Wrapper>
        </Modal>
      )}
    </>
  );
};
