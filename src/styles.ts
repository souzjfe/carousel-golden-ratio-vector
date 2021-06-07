import styled, { css } from "styled-components";
import { DirType, IFrameProps } from "./App";
interface ISizeDiamond {
  Length: number;
  Side: number;
  sizeDifference: number;
}
interface IPositionDiamond {
  right: number;
  top: number;
}
const fibbonaciReason = 1.6180339887;
let screenWidth = Math.round(96);
let sizeDiamonds: Array<ISizeDiamond> = [
  {
    Length: Math.sqrt(Math.pow(screenWidth, 2) * 2),
    Side: screenWidth,
    sizeDifference: (Math.sqrt(Math.pow(screenWidth, 2) * 2) - screenWidth) / 2
  }
];
for (let i = 1; i < 8; i++) {
  sizeDiamonds.push({
    Length: Math.sqrt(Math.pow(screenWidth, 2) * 2),
    Side: screenWidth,
    sizeDifference: (Math.sqrt(Math.pow(screenWidth, 2) * 2) - screenWidth) / 2
  });
  screenWidth = screenWidth / fibbonaciReason;
}
const marginTop = 0;
const marginRight = -25;
const positionDiamonds: Array<IPositionDiamond> = [
  {
    right: marginRight - 67.9,
    top: marginTop + 87.8
  },
  {
    right: marginRight,
    top: marginTop + sizeDiamonds[1].sizeDifference
  },
  {
    right: marginRight + 60.2,
    top: marginTop + 105.9
  },
  {
    right: marginRight + 97.4,
    top: marginTop + 75.3
  },
  {
    right: marginRight + 120.4,
    top: marginTop + 108.2
  },
  {
    right: marginRight + 134.6,
    top: marginTop + 96.5
  },
  {
    right: marginRight + 143.4,
    top: marginTop + 109.03
  },
  {
    right: marginRight + 148.7,
    top: marginTop + 104.55
  }
];

function positionOnSwiping(pos: number, deltaX: number) {
  if (deltaX === 0) {
    return pos;
  } else if (deltaX < 0) {
    //indo para direita
    return pos - 1 < 0 ? sizeDiamonds.length - 1 : pos - 1;
  } else {
    //indo para esqueda
    return pos + 1 > sizeDiamonds.length - 1 ? 0 : pos + 1;
  }
}
function topOnSwiping(index: number, position: number, deltaX: number) {
  if (index % 2 === 0) {
    if (deltaX > 0) {
      return (
        positionDiamonds[position].top -
        (positionDiamonds[position].top -
          positionDiamonds[positionOnSwiping(position, deltaX)].top) *
          (deltaX === 0 ? 0.1 : deltaX)
      );
    } else {
      return (
        positionDiamonds[position].top -
        (positionDiamonds[positionOnSwiping(position, deltaX)].top -
          positionDiamonds[position].top) *
          (deltaX === 0 ? 0.1 : deltaX)
      );
    }
  } else {
    if (deltaX > 0) {
      return (
        positionDiamonds[position].top +
        (positionDiamonds[positionOnSwiping(position, deltaX)].top -
          positionDiamonds[position].top) *
          (deltaX === 0 ? 0.1 : deltaX)
      );
    } else {
      return (
        positionDiamonds[position].top +
        (positionDiamonds[position].top -
          positionDiamonds[positionOnSwiping(position, deltaX)].top) *
          (deltaX === 0 ? 0.1 : deltaX)
      );
    }
  }
}
function rightOnSwiping(index: number, position: number, deltaX: number) {
  if (deltaX > 0) {
    return (
      positionDiamonds[position].right +
      (-positionDiamonds[position].right +
        positionDiamonds[positionOnSwiping(position, deltaX)].right) *
        (deltaX === 0 ? 0.1 : deltaX)
    );
  } else {
    return (
      positionDiamonds[position].right -
      (-positionDiamonds[position].right +
        positionDiamonds[positionOnSwiping(position, deltaX)].right) *
        (deltaX === 0 ? 0.1 : deltaX)
    );
  }
}
function sizeOnSwiping(position: number, deltaX: number) {
  if (deltaX > 0) {
    return (
      sizeDiamonds[position].Side -
      (sizeDiamonds[position].Side -
        sizeDiamonds[positionOnSwiping(position, deltaX)].Side) *
        (deltaX === 0 ? 0.1 : deltaX)
    );
  } else {
    return (
      sizeDiamonds[position].Side +
      (sizeDiamonds[position].Side -
        sizeDiamonds[positionOnSwiping(position, deltaX)].Side) *
        (deltaX === 0 ? 0.1 : deltaX)
    );
  }
}
function opacityOnSwiping(position: number, deltaX: number) {
  if (deltaX > 0) {
    if (position === 0) {
      return 0.7 + 0.3 * deltaX;
    } else {
      return (
        position * -0.1 +
        1 -
        (position * -0.1 + 1 - ((position + 1) * -0.1 + 1)) * deltaX
      );
    }
  } else {
    if (position === 0) {
      return 0.3 * deltaX;
    } else {
      return (
        position * -0.1 +
        1 -
        ((position + 1) * -0.1 + 1 - (position * -0.1 + 1)) * -deltaX
      );
    }
  }
}
function zindex(position: number, deltaX: number) {
  if (position === 0) {
    return 90;
  } else if (position === 1 && deltaX > 0) {
    return 100;
  } else if (position === 2 && deltaX < 0) {
    return 100;
  } else {
    return 90 + positionDiamonds.length - position;
  }
}
function createCss({ framePositions, dir, deltaX, swiping }: IFrameProps) {
  let styles = ``;
  framePositions?.forEach((position, index) => {
    if (swiping) {
      styles += `#box${index}{
        top: ${topOnSwiping(index, position, deltaX)}vw;
        right: ${rightOnSwiping(index, position, deltaX)}vw;
        width: calc(${sizeOnSwiping(position, deltaX)}vw - var(--gap));
        height: calc(${sizeOnSwiping(position, deltaX)}vw - var(--gap));
        opacity: ${opacityOnSwiping(position, deltaX)}; 
        transition: 0s;
      }`;
    } else {
      styles += `#box${index}{
        top: ${positionDiamonds[position].top}vw;
        right: ${positionDiamonds[position].right}vw;
        width: calc(${sizeDiamonds[position].Side}vw - var(--gap) );
        height: calc(${sizeDiamonds[position].Side}vw - var(--gap) );
        opacity: ${position * -0.1 + 1}; 
        transition:${
          position + 1 === framePositions.length ||
          position + 2 === framePositions.length
            ? "0s"
            : `0.5s`
        };
      }`;
    }
    styles += `#box${index}{
      z-index: ${zindex(position, deltaX)};
      
    }`;
  });
  return css`
    ${styles}
  `;
}
interface IPropsCarrousel {
  framesPosition: IFrameProps;
}
export const Body = styled.div`
  background: #1c1b1a;
  width: 100vw;
  height: 100vh;
  display: flex;

  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  > aside {
    position: absolute;
  }
`;
export const Carrousel = styled.div<IPropsCarrousel>`
  --gap: 0.8rem;
  ${(props) => props.framesPosition && createCss(props.framesPosition)};
  display: block;
  position: relative;
  width: 100%;
  height: 100%;

  main {
    position: absolute;
    transform: rotate(-45deg);
    margin-top: 5%;
    /*it is hellper &:before {
      content: " ";
      border: solid 1px red;
      width: calc(100%);
      height: calc(100%);
      position: absolute;
      top: 0;
      right: 0;
    } */
    background: linear-gradient(
      180deg,
      #da7f22 0%,
      #bc6a17 53.12%,
      #f2b87b 75.52%,
      #da7f22 100%
    );

    img {
      position: absolute;
      top: -16%;
      right: -16%;
      object-fit: cover;
      object-position: center;
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      transform: rotate(45deg);
      width: 132%;
      height: 132%;
    }
  }
`;
