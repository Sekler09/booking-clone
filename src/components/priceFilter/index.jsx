import React, { useEffect, useState, useRef } from 'react';
import { number, func } from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  Slider,
  SliderRange,
  SliderTrack,
  SliderWrapper,
  Thumb,
} from './styled';

function PriceFilter({ min, max, onChange }) {
  const { t } = useTranslation();
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

  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
  }, [min, max]);

  return (
    <>
      <h3>{t('budgetFilterTitle')}</h3>
      <div>
        {t('money', { val: minVal })} - {t('money', { val: maxVal })}
      </div>
      <SliderWrapper>
        <Slider>
          <Thumb
            type="range"
            min={min}
            max={max}
            step={1}
            value={minVal}
            ref={minValRef}
            onChange={event => {
              const value = Math.min(+event.target.value, maxVal - 10);
              setMinVal(value);
            }}
            data-cy="thumb-min"
          />
          <Thumb
            type="range"
            step={1}
            min={min}
            max={max}
            value={maxVal}
            ref={maxValRef}
            onChange={event => {
              const value = Math.max(+event.target.value, minVal + 10);
              setMaxVal(value);
            }}
            data-cy="thumb-max"
          />
          <SliderTrack />
          <SliderRange ref={range} />
        </Slider>
      </SliderWrapper>
    </>
  );
}

PriceFilter.propTypes = {
  min: number.isRequired,
  max: number.isRequired,
  onChange: func.isRequired,
};

export default PriceFilter;
