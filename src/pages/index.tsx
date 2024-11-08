import { useEffect, useState, useRef, RefObject } from "react";
import "../index.css"

const UnderlineText = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [underlineStyle, setUnderlineStyle] = useState<React.CSSProperties>({});
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const items = ["Songs", "Albums", "Artists", "Playlists", "Settings"];

  useEffect(() => {
    const updateUnderline = () => {
      const currentItem = itemsRef.current[selectedIndex];
      if (currentItem) {
        setUnderlineStyle({
          left: currentItem.offsetLeft,
          width: currentItem.offsetWidth,
        });
      }
    };
    updateUnderline();
    window.addEventListener('resize', updateUnderline);
    return () => {
      window.removeEventListener('resize', updateUnderline);
    }
  }, [selectedIndex]);

  return (
    <div className="container">
      <div className="menu">
        {items.map((item, i) => (
          <span
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            className={`menu-item ${selectedIndex === i ? 'active' : ''}`}
            onClick={() => setSelectedIndex(i)}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="underline" style={underlineStyle}></div>
    </div>
  )
}

const Index = () => {
  const [_state, setState] = useState("");
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/test`);
      const text = await response.json();
      setState(text);
    })();
  }, [])

  return (
    <main>
      <div className="top-bar">
        <UnderlineText />
      </div>
      <div className="col-3">
        <div className="col-3-container shadow left-sidebar">
          <div className="scroll">
            <h2>A</h2>
            <h3>aaa</h3>
          </div>
        </div>
        <div className="col-3-container shadow middle-container">
          <div className="scroll">

          </div>
        </div>
        <div className="col-3-container shadow right-sidebar">
          <div className="scroll">

          </div>
        </div>
      </div>
      <div className="player shadow">

      </div>
    </main>
  )
}

export default Index;
