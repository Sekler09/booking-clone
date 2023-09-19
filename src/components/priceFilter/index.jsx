import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Slider,
  SliderRange,
  SliderTrack,
  SliderWrapper,
  Thumb,
} from './styled';

function PriceFilter({ min, max, onChange }) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  function getPercent(value) {
    return Math.round(((value - min) / (max - min)) * 100);
  }

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  return (
    <SliderWrapper>
      <Slider>
        <Thumb
          type="range"
          min={min}
          max={max}
          step={10}
          value={minVal}
          ref={minValRef}
          onChange={event => {
            const value = Math.min(+event.target.value, maxVal - 10);
            setMinVal(value);
            event.target.value = value.toString();
          }}
        />
        <Thumb
          type="range"
          step={10}
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={event => {
            const value = Math.max(+event.target.value, minVal + 10);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
        />
        <SliderTrack />
        <SliderRange ref={range} />
      </Slider>
    </SliderWrapper>
  );
}

PriceFilter.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PriceFilter;
