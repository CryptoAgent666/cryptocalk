import { useState, useRef, useEffect, useId, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { LANGUAGES, type Lang, getLocalizedPath, getPathWithoutLang } from '../i18n/utils';

interface Props {
    currentLang: Lang;
    currentPath: string;
}

export default function LanguageSwitcher({ currentLang, currentPath }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const optionsRef = useRef<Array<HTMLAnchorElement | null>>([]);
    const dropdownId = useId();

    useEffect(() => {
        const handler = (e: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };

        const onEscape = (e: globalThis.KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler);
        document.addEventListener('keydown', onEscape);
        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('touchstart', handler);
            document.removeEventListener('keydown', onEscape);
        };
    }, []);

    const basePath = getPathWithoutLang(currentPath);
    const current = LANGUAGES[currentLang];
    const languageEntries = Object.entries(LANGUAGES) as [Lang, typeof current][];

    const focusOption = (index: number) => {
        const next = optionsRef.current[index];
        if (next) {
            next.focus();
        }
    };

    const openMenuAndFocus = (index: number) => {
        setOpen(true);
        window.requestAnimationFrame(() => focusOption(index));
    };

    const onTriggerKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            openMenuAndFocus(0);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            openMenuAndFocus(languageEntries.length - 1);
        } else if (e.key === 'Escape' && open) {
            e.preventDefault();
            setOpen(false);
        } else if ((e.key === 'Enter' || e.key === ' ') && !open) {
            e.preventDefault();
            setOpen(true);
        }
    };

    const onOptionKeyDown = (e: ReactKeyboardEvent<HTMLAnchorElement>, index: number) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            focusOption((index + 1) % languageEntries.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            focusOption((index - 1 + languageEntries.length) % languageEntries.length);
        } else if (e.key === 'Home') {
            e.preventDefault();
            focusOption(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            focusOption(languageEntries.length - 1);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            setOpen(false);
            buttonRef.current?.focus();
        } else if (e.key === 'Tab') {
            setOpen(false);
        }
    };

    return (
        <div className="lang-switcher" ref={ref}>
            <button
                ref={buttonRef}
                type="button"
                className="lang-btn"
                onClick={() => setOpen(!open)}
                onKeyDown={onTriggerKeyDown}
                aria-label="Switch language"
                aria-haspopup="menu"
                aria-controls={dropdownId}
                aria-expanded={open}
            >
                <Globe size={16} />
                <span className="lang-current">{current.flag} {current.name}</span>
                <ChevronDown size={14} className={`lang-chevron ${open ? 'open' : ''}`} />
            </button>

            {open && (
                <div className="lang-dropdown" id={dropdownId} role="menu" aria-label="Language options">
                    {languageEntries.map(([code, meta], index) => (
                        <a
                            key={code}
                            href={getLocalizedPath(basePath, code)}
                            ref={(element) => {
                                optionsRef.current[index] = element;
                            }}
                            className={`lang-option ${code === currentLang ? 'active' : ''}`}
                            onClick={() => setOpen(false)}
                            onKeyDown={(e) => onOptionKeyDown(e, index)}
                            role="menuitemradio"
                            aria-checked={code === currentLang}
                        >
                            <span className="lang-flag">{meta.flag}</span>
                            <span className="lang-name">{meta.name}</span>
                            {code === currentLang && <span className="lang-check">✓</span>}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
