import styled from 'styled-components';

const SliderWrapper = styled.div`
  margin: 20px 0;
`;

const Slider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 15px;
`;

const SliderTrack = styled.div`
  position: absolute;
  border-radius: 3px;
  height: 5px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.oldSilver};
  z-index: 1;
`;

const SliderRange = styled(SliderTrack)`
  background-color: ${({ theme }) => theme.colors.trueBlue};
  z-index: 2;
`;

const Thumb = styled.input`
  position: absolute;
  height: 0;
  width: 100%;
  outline: none;
  z-index: 3;
  pointer-events: none;
  appearance: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;

  &::-webkit-slider-thumb {
    position: relative;
    border: none;
    border-radius: 50%;
    height: 18px;
    width: 18px;
    background-color: ${({ theme }) => theme.colors.trueBlue};
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    pointer-events: all;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  &::-moz-range-thumb {
    position: relative;
    border: none;
    border-radius: 50%;
    height: 18px;
    width: 18px;
    background-color: ${({ theme }) => theme.colors.trueBlue};
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    pointer-events: all;
  }
`;

export { SliderWrapper, Slider, SliderTrack, SliderRange, Thumb };
