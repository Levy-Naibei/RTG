import { useState, useEffect } from 'react';
import './main.css';

interface Theme {
  colors: string[];
  style: string;
}

const Main = () => {
  const [designStyle, setDesignStyle] = useState<string>('');
  const [colorPalette, setColorPalette] = useState<string[]>([]);
  const [savedThemes, setSavedThemes] = useState<Theme[]>([]);

  useEffect(() => {
    const savedThemes = localStorage.getItem('savedThemes');
    if (savedThemes) {
      setSavedThemes(JSON.parse(savedThemes));
    }
  }, []);

  const generateColorPalette = () => {
    let colors = [];
    for (let i = 0; i < 5; i++) {
      let randomColor = getRandomHexColor();
      colors.push(randomColor);
    }
    setColorPalette(colors);
  };

  const generateDesignStyle = () => {
    const designStyles = ['Elegant', 'Vintage', 'Futuristic', 'Minimalistic', 'Grunge', 'Retro'];
    const randomStyle = designStyles[Math.floor(Math.random() * designStyles.length)];
    setDesignStyle(randomStyle);
  };

  const saveTheme = () => {
    const theme: Theme = {
      colors: [...colorPalette],
      style: designStyle,
    };
    setSavedThemes([...savedThemes, theme]);
    setColorPalette([]);
    setDesignStyle('');
    localStorage.setItem('savedThemes', JSON.stringify([...savedThemes, theme]));
  };

  const clearSavedThemes = () => {
    setSavedThemes([]);
    localStorage.clear();
  };

  const getRandomHexColor = () => {
    let hexColor = '#';
    const baseHexColorCode = '0123456789ABCDEF';
    for (let i = 0; i < 6; i++) {
      hexColor += baseHexColorCode[Math.floor(Math.random() * 16)];
    }
    return hexColor;
  }
  return (
    <div className="App">
      <button className="custom-btn" onClick={generateColorPalette}>Generate Palette</button>
      <button className="custom-btn" onClick={generateDesignStyle}>Generate Style</button>
      <button className="custom-btn" onClick={saveTheme}>Save Theme</button>
      <button className="custom-btn" onClick={clearSavedThemes}>Clear Saved</button>

      <div className="color-palette">
        {colorPalette.map((color: string, index: number) => (
          <div
            key={index}
            style={{ backgroundColor: color }}
            className="color-box">
          </div>
        ))}
      </div>

      <div className="custom_container">
        <h4 className="app_sub_headers">Customize Theme</h4>
        <input
          className="custom_input"
          type="color"
          value={colorPalette[0] || ''}
          onChange={(e) => setColorPalette(
            [
              e.target.value,
              ...colorPalette.slice(1)
            ]
          )}
        />

        <input
          className="custom_input"
          type="color"
          value={colorPalette[1] || ''}
          onChange={(e) => setColorPalette(
            [
              colorPalette[0],
              e.target.value,
              ...colorPalette.slice(2)
            ]
          )}
        />

        <input
          className="custom_input"
          type="color"
          value={colorPalette[2] || ''}
          onChange={(e) => setColorPalette(
            [
              colorPalette[0],
              colorPalette[1],
              e.target.value,
              ...colorPalette.slice(3)
            ]
          )}
        />

        <input
          className="custom_input"
          type="color"
          value={colorPalette[3] || ''}
          onChange={(e) => setColorPalette(
            [
              colorPalette[0],
              colorPalette[1],
              colorPalette[2],
              e.target.value,
              ...colorPalette.slice(4)
            ]
          )}
        />

        <input
          className="custom_input"
          type="color"
          value={colorPalette[4] || ''}
          onChange={(e) => setColorPalette(
            [
              colorPalette[0],
              colorPalette[1],
              colorPalette[2],
              colorPalette[3],
              e.target.value
            ]
          )}
        />

        <div>
          <input
            type="text"
            placeholder="design style"
            id="custom-style"
            value={designStyle}
            onChange={(e) => setDesignStyle(e.target.value)}
          />
        </div>
      </div>
      <div className="saved_themes">
        <h4 className="app_sub_headers">Your saved themes</h4>
        {savedThemes.length ? savedThemes.map((theme: Theme, index: number) => (
          <div key={index} className="saved_theme">
            <div className="theme_colors">
              {theme.colors.map((color: string, index: number) => (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className="color-box">
                </div>
              ))}
            </div>
            <div className="theme-style">{theme.style}</div>
          </div>
        )) : <p className="theme-style">No saved themes yet</p>}
      </div>
    </div>
  );
};
export default Main;