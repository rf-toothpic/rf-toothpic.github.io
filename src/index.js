import React, { Component, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { render } from 'react-dom';
import DesignSystem from '../../src/design-system';
import Type from '../../src/components/Type';
import OpenSansFont from '../../src/OpenSansFont';

const design = new DesignSystem();

function TypographyGrid({ options, colors, filter }) {
  return (
    <div
      style={{
        fontFamily: options.fontFamily,
        overflowX: 'auto',
        display: 'flex',
        flexWrap: 'noWrap'
      }}
    >
      {colors
        .filter(c => filter && (filter === '*' || c.name.indexOf(filter) > -1))
        .map(color => (
          <TypeVariants options={options} color={color} />
        ))}
    </div>
  );
}

const TypeVariants = ({ options, color }) => (
  <div style={{ flex: 1, minWidth: '100%', padding: 32, borderRight: '1px dashed #ddd' }}>
    <Type color={color.color} fontSize={32}>
      {color.name}
    </Type>
    {options.fontSizes.map((size, i) =>
      Object.keys(options.fontWeights).map(weight => (
        <Grid container>
          {['left', 'center', 'right'].map(align => (
            <Grid item xs={4}>
              <Type
                weight={options.fontWeights[weight]}
                fontSize={size}
                color={color.color}
                textAlign={align}
              >
                {options.fontSizeNames[i]}
              </Type>
            </Grid>
          ))}
        </Grid>
      ))
    )}
  </div>
);

const ColorGrid = ({ colors, setFilter }) => {
  const ColorNames = Object.keys(colors);
  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        {ColorNames.map(colorName => {
          const _colors = design.colors[colorName];
          const Shades = Object.keys(_colors);
          return (
            <Grid container spacing={16}>
              {Shades.map(shade => (
                <Grid item xs={1.5}>
                  <div
                    style={{ padding: 8, background: _colors[shade], height: 100, width: 200 }}
                    onClick={() => setFilter(`${colorName} ${shade}`)}
                  >
                    <Type color={design.getContrastColor(_colors[shade])}>
                      {colorName}-{shade}
                      <br />
                      {_colors[shade]}
                    </Type>
                  </div>
                </Grid>
              ))}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

function App() {
  const colors = design.getColorList();

  const [filter, setFilter] = useState('');

  return (
    <div className="App" style={{ overflowX: 'auto', padding: 32, fontFamily: design.fontFamily }}>
      <OpenSansFont>
        <Type dark fontSize={120}>Color Palette</Type>
        <ColorGrid colors={design.colors} setFilter={setFilter} />
        <Type dark fontSize={120}>Typography</Type>
        <Type fontSize={32}>Select a color above or start typing in the box to find a types, or enter * to show all types</Type>
        <input
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="color name"
          type="text"
        />
        <button onClick={() => setFilter('')}>Clear</button>
        <TypographyGrid options={design} colors={colors} filter={filter} />
      </OpenSansFont>
    </div>
  );
}

render(<App />, document.querySelector('#demo'));
