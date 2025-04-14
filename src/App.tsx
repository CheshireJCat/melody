import React, {useEffect} from 'react';
import ChordView from './components/ChordView';
import './App.css';
import {ChordPlayer} from './helpers/playNote';

function App() {
  const player = React.useRef<ChordPlayer>(null);

  const initPlayer = () => {
    if (player.current) {
      player.current.init();
    }
  };

  useEffect(() => {
    player.current = new ChordPlayer();
    document.addEventListener('click', initPlayer);
    return () => {
      // 清理事件监听器
      document.removeEventListener('click', initPlayer);
    };
  }, []);

  return (
    <div className="app">
      <div className="piano">
        <ChordView
          title="C"
          chord={{
            // [弦, 品, 文本 | 配置项] 的数组
            fingers: [
              [5, 3, '3'],
              [4, 2, '2'],
              [2, 1, '1']
            ],

            // 可选：用于大横按的标记
            barres: [
              {
                fromString: 6,
                toString: 1,
                fret: 1,
                text: '1',
                color: '#000',
                textColor: '#fff',
                className: 'chord-barre hidden'
              }
            ]
          }}
          onClick={() => {
            player.current?.play({
              notes: ['C4', 'E4', 'G4'],
              duration: '2n'
            });
          }}
        />
      </div>
    </div>
  );
}

export default App;
