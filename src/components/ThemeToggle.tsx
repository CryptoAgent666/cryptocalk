import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    // Always initialise to 'light' so SSR HTML matches the first client render.
    // useEffect corrects to the real stored/system value after hydration — this
    // eliminates React Error #418 (hydration mismatch).
    const [theme, setTheme] = useState<string>('light');

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const actual = stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setTheme(actual);
        // Sync attribute in case the inline script ran before hydration finished
        document.documentElement.setAttribute('data-theme', actual);
    }, []);

    const toggle = () => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="theme-toggle-btn"
        >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
    );
}
