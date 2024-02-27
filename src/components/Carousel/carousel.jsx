import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";

const Carousel = (props) => {
  const { children } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [touchPosition, setTouchPosition] = useState(null);
  const [showItems, setShowItems] = useState(4); // Número predeterminado

  const carouselWrapperRef = useRef(null);

  const handleResize = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 768) {
      setShowItems(1); // Configura el número de elementos para pantallas móviles
    } else if (windowWidth < 992) {
      setShowItems(2); // Configura el número de elementos para tabletas, por ejemplo
    } else {
      setShowItems(4); // Configura el número de elementos para pantallas más grandes
    }
  };

  const next = () => {
    if (transitionEnabled) {
      setCurrentIndex((prevState) => {
        if (prevState === length - showItems) {
          return 0;
        } else {
          return prevState + 1;
        }
      });
    }
  };

  const prev = () => {
    if (transitionEnabled) {
      setCurrentIndex((prevState) => {
        if (prevState === 0) {
          return length - showItems;
        } else {
          return prevState - 1;
        }
      });
    }
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      next();
      setTouchPosition(null);
    } else if (diff < -5) {
      prev();
      setTouchPosition(null);
    }
  };

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  useEffect(() => {
    // Agrega un listener para detectar cambios en el tamaño de la ventana
    window.addEventListener("resize", handleResize);
    // Llama a la función para configurar el número inicial de elementos
    handleResize();

    return () => {
      // Limpia el listener al desmontar el componente
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleTransitionEnd = () => {
      setTransitionEnabled(true);
    };

    carouselWrapperRef.current.addEventListener(
      "transitionend",
      handleTransitionEnd
    );

    return () => {
      carouselWrapperRef.current.removeEventListener(
        "transitionend",
        handleTransitionEnd
      );
    };
  }, []);

  useEffect(() => {
    setTransitionEnabled(true);
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <button onClick={prev} className="left-arrow">
          &lt;
        </button>
        <div
          ref={carouselWrapperRef}
          className="carousel-content-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`carousel-content show-${showItems}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / showItems)}%)`,
              transition: transitionEnabled ? "transform 0.5s" : "none",
            }}
          >
            {children}
          </div>
        </div>
        <button onClick={next} className="right-arrow">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
