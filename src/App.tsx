import "./styles.css";
import { Body, Carrousel } from "./styles";
import {
  useLayoutEffect,
  useState,
  useEffect,
  useReducer,
  Reducer
} from "react";
import { useSwipeable } from "react-swipeable";
export type DirType = "Left" | "Right";
export interface IFrameProps {
  dir: DirType;
  deltaX: number;
  swiping: boolean;
  framePositions: Array<number>;
}
function moveTo(dir: DirType, framePositions: Array<number>) {
  if (dir === "Right") {
    return framePositions.map((frame) => {
      return frame - 1 < 0 ? framePositions.length - 1 : frame - 1;
    });
  } else {
    return framePositions.map((frame) => {
      return frame + 1 > framePositions.length - 1 ? 0 : frame + 1;
    });
  }
}
type Action =
  | { type: "move"; direction: DirType }
  | { type: "stopSwiping"; direction?: DirType }
  | { type: "startSwiping"; deltaX: number; direction: DirType };
type ReducerSwip = (state: IFrameProps, action: Action) => IFrameProps;
const reducerSwip: ReducerSwip = (state, action) => {
  switch (action.type) {
    case "move":
      return {
        dir: action.direction,
        deltaX: 0,
        swiping: false,
        framePositions: moveTo(action.direction, state.framePositions)
      };
    case "stopSwiping":
      return {
        ...state,
        deltaX: 0,
        swiping: false,
        framePositions: moveTo(state.dir, state.framePositions)
      };
    case "startSwiping":
      return {
        ...state,
        dir: action.direction,
        deltaX: action.deltaX,
        swiping: true
      };
  }
};
export default function App() {
  const initialSwipProps: IFrameProps = {
    dir: "Right",
    deltaX: 0,
    swiping: false,
    framePositions: [0, 1, 2, 3, 4, 5, 6, 7]
  };
  const [swipProps, despatchSwipProps] = useReducer(
    reducerSwip,
    initialSwipProps
  );

  const handlers = useSwipeable({
    delta: 1,
    onSwiping: (e) => {
      despatchSwipProps({
        type: "startSwiping",
        direction: e.dir === "Down" ? "Left" : e.dir === "Up" ? "Right" : e.dir,
        deltaX: Math.round((-100 * e.deltaX) / window.innerWidth) / 100
      });
    },

    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });
  useLayoutEffect(() => {
    document.addEventListener(
      "touchend",
      () => {
        despatchSwipProps({ type: "stopSwiping" });
      },
      false
    );
    document.addEventListener(
      "mouseup",
      (e: MouseEvent) => {
        console.log(e);
        despatchSwipProps({
          type: "stopSwiping",
          direction: e.x > window.innerWidth / 2 ? "Right" : "Left"
        });
      },
      false
    );
  }, [handlers]);
  return (
    <Body {...handlers} className="App">
      <Carrousel framesPosition={swipProps}>
        <main id="box0">
          <img
            src="https://i.pinimg.com/736x/9c/02/33/9c02334420c3767d6eec522c7e86d714.jpg"
            alt=""
          />
        </main>
        <main id="box1">
          <img
            src="https://mhmcdn.ynvolve.net/?w=750&h=450&quality=31&clipping=landscape&url=http://manualdohomemmoderno.com.br/files/2017/06/Aquarela-Tatuagens-masculinas-no-bra%C3%A7o-3.jpg"
            alt=""
          />
        </main>
        <main id="box2">
          <img
            src="https://i.pinimg.com/474x/5f/ff/e5/5fffe56a5d5a3b367a87fc3097795b6e.jpg"
            alt=""
          />
        </main>
        <main id="box3">
          <img
            src="https://i.pinimg.com/564x/31/b3/e2/31b3e248d36e50601280713b23a5992c.jpg"
            alt=""
          />
        </main>
        <main id="box4">
          <img
            src="https://i.pinimg.com/originals/8c/53/24/8c5324086a106b52a3394909e5940ee6.jpg"
            alt=""
          />
        </main>
        <main id="box5">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdV2mslzgR9ZXH_AmvIVfqblK2_rrCA8cqbUWD4MRXuLe1lvqH0UDBTYoXXj-6X-rb0h4&usqp=CAU"
            alt=""
          />
        </main>
        <main id="box6">
          <img
            src="https://www.minhatatuagem.com/wp-content/uploads/2016/01/54-2.jpg"
            alt=""
          />
        </main>
        <main id="box7">
          <img
            src="https://i.pinimg.com/736x/47/14/48/47144850bd274d9ab609dc397f32f6c1.jpg"
            alt=""
          />
        </main>
      </Carrousel>
      <aside>
        <button
          onClick={() => despatchSwipProps({ type: "move", direction: "Left" })}
        >
          {swipProps.deltaX}
        </button>
        <button
          onClick={() =>
            despatchSwipProps({ type: "move", direction: "Right" })
          }
        >
          Next
        </button>
      </aside>
    </Body>
  );
}
