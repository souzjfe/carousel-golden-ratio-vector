import "./styles.css";
import { Body, Carrousel } from "./styles";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
export default function App() {
  const [framesPosition, setFramePosition] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  function handleNextFrame() {
    setFramePosition((frames) =>
      frames.map((frame) => {
        return frame - 1 < 0 ? framesPosition.length - 1 : frame - 1;
      })
    );
  }
  function handlePreviusFrame() {
    setFramePosition((frames) =>
      frames.map((frame) => {
        return frame + 1 > framesPosition.length - 1 ? 0 : frame + 1;
      })
    );
  }
  const handlers = useSwipeable({
    onSwipedLeft: () => handlePreviusFrame(),
    onSwipedRight: () => handleNextFrame(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });
  return (
    <Body {...handlers} className="App">
      <Carrousel framesPosition={framesPosition}>
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
        <button onClick={handlePreviusFrame}>prev</button>
        <button onClick={handleNextFrame}>{framesPosition[0]}</button>
      </aside>
    </Body>
  );
}
