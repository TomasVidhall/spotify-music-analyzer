import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './atw.json';
import ColorHash from 'color-hash';
const colorHash = new ColorHash();


const SECONDS_TO_PIXELS = 200;

class App extends Component {
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <div style={{ width: '100%', height: 800, display: 'flex', flexDirection: 'column', overflowX: 'scroll' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', position: 'relative', height: 100 }}>
              {data.segments.map((segment, i) => {
                const totalTimbre = segment.timbre.reduce((accumulator, currentValue) => (accumulator + currentValue), 0)
                const color = segment.pitches.some(p => p !== 1) ? colorHash.hex(1000 - totalTimbre) : 'transparent';
                const height = (segment.loudness_max + 60) * (segment.loudness_max_time/segment.duration);

                return <div key={segment.start} style={{ minWidth: segment.duration * SECONDS_TO_PIXELS, background: color, height, position: 'absolute', left: segment.start * SECONDS_TO_PIXELS  }}></div>
              }
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              {data.beats.map((beat, i) => (
                <div key={beat.start} style={{ minWidth: beat.duration * SECONDS_TO_PIXELS, color: i % 2 === 0 ? 'blue' : 'red' }}>*</div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row',  height: 20,}}>
              {data.bars.map((b, i) => (
                <div key={b.start} style={{ minWidth: b.duration * SECONDS_TO_PIXELS, borderBottom: '1px dotted black', borderRight: '1px solid black' }}></div>
              ))}
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
