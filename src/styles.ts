import styled, { css } from "styled-components";

function createVarCss(arrayStyles: number[]) {
  let size = 96 * 1.6180339887;
  let carrouselSize = Math.sqrt(
    Math.pow(size / 1.6180339887, 2) + Math.pow(size / 1.6180339887, 2)
  );
  let gap = 1;
  let styles = `--gap: ${gap}rem;`;
  arrayStyles.forEach((position, index) => {
    if (index > 1 && index % 2 !== 0) {
      carrouselSize += Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2)) / 2;
    }
    styles += `
      --box-size-${index}: ${size}vw;
      --box-tranversal-size-${index}: ${
      (Math.sqrt(Math.pow(size, 2) * 2) - size) / 2
    }vw;
    `;
    size = size / 1.6180339887;
  });
  styles += `--carrousselSize: ${carrouselSize}px`;
  return css`
    ${styles}
  `;
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

function createCss(arrayStyles: number[]) {
  let styles = ``;
  arrayStyles.forEach((position, index) => {
    styles += `#box${index}{
      top: var(--top${position});
      right: var(--right${position});
      width: calc(var(--box-size-${position}) - var(--gap));
      height: calc(var(--box-size-${position}) - var(--gap));
      z-index:${position === arrayStyles.length ? 0 : position};
      opacity:calc(-1 * 0.${position} + 1);
      transition:${
        position + 1 === arrayStyles.length ||
        position + 2 === arrayStyles.length
          ? "0s"
          : "0.5s"
      };
      
    }`;
  });
  return css`
    ${styles}
  `;
}
interface IPropsCarrousel {
  framesPosition: number[];
}
export const Carrousel = styled.div<IPropsCarrousel>`
  ${(props) =>
    props.framesPosition?.length > 0 && createVarCss(props.framesPosition)};
  --margin-top: 5%;
  --margin-right: -20%;
  --top0: var(--box-size-1);
  --right0: calc(-1200%);
  --top1: calc(var(--box-tranversal-size-1) + var(--margin-top));
  --right1: var(--margin-right);
  --top2: calc(
    var(--box-tranversal-size-1) * 2 + var(--box-size-1) - var(--box-size-2) / 2 +
      var(--margin-top)
  );
  --right2: calc(
    var(--box-size-1) / 2 + var(--box-tranversal-size-2) + var(--margin-right)
  );
  --top3: calc(
    var(--box-size-1) / 2 + var(--box-tranversal-size-1) + var(--margin-top) +
      var(--box-tranversal-size-3)
  );
  --right3: calc(
    var(--box-size-1) + var(--margin-right) + var(--box-tranversal-size-1) -
      var(--box-size-3) / 2
  );
  --top4: calc(
    var(--margin-top) + var(--box-size-1) / 2 + var(--box-tranversal-size-1) +
      var(--box-size-3) + var(--box-tranversal-size-4)
  );
  --right4: calc(
    var(--box-size-1) + var(--margin-right) + var(--box-tranversal-size-1) -
      var(--box-size-3) / 2 + var(--box-size-4)
  );
  --top5: calc(
    var(--box-size-1) / 2 + var(--box-tranversal-size-1) + var(--margin-top) +
      var(--box-tranversal-size-3) + var(--box-size-3) / 2 + var(--box-size-5) /
      2 - var(--box-tranversal-size-5)
  );
  --right5: calc(
    var(--box-size-1) + var(--margin-right) + var(--box-tranversal-size-1) +
      var(--box-size-3) / 2
  );
  --top6: calc(
    var(--box-size-1) / 2 + var(--box-tranversal-size-1) + var(--margin-top) -
      var(--box-tranversal-size-6) + var(--box-size-3) + var(--box-size-5) / 2
  );
  --right6: calc(
    var(--margin-right) + var(--box-size-1) + var(--box-tranversal-size-1) +
      var(--box-size-3) / 2 + var(--box-size-5) / 2
  );

  --top7: calc(-1200%);
  --right7: calc(-1200%);
  ${(props) =>
    props.framesPosition?.length > 0 && createCss(props.framesPosition)};
  display: block;
  position: relative;
  width: 100%;
  height: 100%;

  main {
    position: absolute;
    transform: rotate(-45deg);
    /* it is hellper &:before {
      content: " ";
      border: solid 2px green;
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      position: absolute;
      top: 0;
      right: 0;
      transform: rotate(45deg);
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
