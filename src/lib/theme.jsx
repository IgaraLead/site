import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'igara-theme';
const MODES = ['dark', 'light', 'system'];

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light' || stored === 'system') return stored;
  } catch {
    /* noop */
  }
  return 'system';
}

function getSystemDark() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return true;
  }
}

const ThemeContext = createContext({
  theme: 'system',
  resolvedTheme: 'dark',
  cycle: () => {},
  toggle: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getStoredTheme);
  const [systemDark, setSystemDark] = useState(getSystemDark);

  useEffect(() => {
    try {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = e => setSystemDark(e.matches);
      mql.addEventListener('change', onChange);
      setSystemDark(mql.matches);
      return () => mql.removeEventListener('change', onChange);
    } catch {
      return undefined;
    }
  }, []);

  const resolvedTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* noop */
    }
  }, [resolvedTheme, theme]);

  const cycle = useCallback(
    () => setTheme(t => MODES[(MODES.indexOf(t) + 1) % MODES.length] ?? 'system'),
    []
  );

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, cycle, toggle: cycle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
