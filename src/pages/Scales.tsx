import { Scale } from "tonal";
import { useSearchParams } from 'react-router-dom';
import { chromaticScale } from '../utils/util';
import { NoteButton } from '../components/NoteButton/NoteButton';
import { useEffect, useMemo, useState } from 'react';
import '../style/scales.css';
import { ScaleCard } from '../components/ScaleCard/ScaleCard';
import { Note } from 'tonal';

// TODO: Replace clear button with an icon button

const searchParamsKey = 'notes';
const rootSearchParamsKey = 'root';

export const Scales = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedNotes, setSelectedNotes] = useState<Set<string>>(() => {
        const notes = searchParams.get(searchParamsKey);
        return notes ? new Set(notes.split(',')) : new Set();
    });
    const [rootNote, setRootNote] = useState<string | null>(() => {
        const root = searchParams.get(rootSearchParamsKey);
        return root || null;
    });

    // When searchParams change (e.g. after refresh or navigation), update selectedNotes
    useEffect(() => {
        const notes = searchParams.get(searchParamsKey);
        const parsedSelectedNotes = notes ? new Set(notes.split(',')) : new Set<string>();
        const root = searchParams.get(rootSearchParamsKey);
        const validRoot = root && parsedSelectedNotes.has(root) ? root : null;

        setSelectedNotes(parsedSelectedNotes);
        setRootNote(validRoot || Array.from(parsedSelectedNotes)[0] || null);
    }, [searchParams]);

    // Keep URL query params in sync with selection and explicit root.
    useEffect(() => {
        const notes = Array.from(selectedNotes).join(',');
        const newParams = new URLSearchParams(searchParams.toString());
        const normalizedRoot = rootNote && selectedNotes.has(rootNote) ? rootNote : null;

        if (notes) {
            newParams.set(searchParamsKey, notes);
        } else {
            newParams.delete(searchParamsKey);
        }

        if (normalizedRoot) {
            newParams.set(rootSearchParamsKey, normalizedRoot);
        } else {
            newParams.delete(rootSearchParamsKey);
        }

        // Only update if params actually changed
        if (newParams.toString() !== searchParams.toString()) {
            setSearchParams(newParams, { replace: true });
        }
    }, [selectedNotes, rootNote, searchParams, setSearchParams]);

    const toggleNote = (note: string) => {
        setSelectedNotes((prevSelectedNotes) => {
            const newSelectedNotes = new Set(prevSelectedNotes);

            if (newSelectedNotes.has(note)) {
                newSelectedNotes.delete(note);
                setRootNote((prevRoot) => {
                    if (prevRoot !== note) return prevRoot;
                    return Array.from(newSelectedNotes)[0] || null;
                });
            } else {
                newSelectedNotes.add(note);
                setRootNote((prevRoot) => prevRoot || note);
            }

            return newSelectedNotes;
        });
    };

    const setExplicitRoot = (note: string) => {
        if (!selectedNotes.has(note)) return;
        setRootNote(note);
    };

    const isRoot = (note: string) => {
        return rootNote === note;
    }

    const detectedScales = useMemo(() => {
        if (selectedNotes.size <= 1) return [];

        const selected = Array.from(selectedNotes);

        return Scale.detect(selected)
            .map((scale) => {
                const scaleObj = Scale.get(scale);
                const tonic = scaleObj.tonic ? Note.simplify(scaleObj.tonic) : '';
                const rootMatches = rootNote ? tonic === Note.simplify(rootNote) : false;
                const noteCountPenalty = Math.abs(scaleObj.notes.length - selected.length);
                const score = (rootMatches ? 100 : 0) - noteCountPenalty;

                return { scale, score };
            })
            .sort((a, b) => b.score - a.score || a.scale.localeCompare(b.scale));
    }, [selectedNotes, rootNote]);

    return (
        <section className='container scales-page'>
            <header className='header'>
                <h1>Scales Finder</h1>
                <p>Find scales based on your selected notes</p>
                <p className='root-hint'>Right-click a selected note to set root</p>

                <div className='scale-meta'>
                    <span className='meta-pill'>Selected: {selectedNotes.size}</span>
                    <span className='meta-pill'>Root: {rootNote || 'Auto'}</span>
                    <span className='meta-pill'>Matches: {detectedScales.length}</span>
                </div>

                <button className='clear-button' onClick={() => { setSelectedNotes(new Set()); setRootNote(null); }}>clear</button>
                <section className='flex flex-wrap gap-8'>
                    {chromaticScale.map((note, index) => (
                        <NoteButton
                            key={index}
                            note={note}
                            selected={selectedNotes.has(note)}
                            isRoot={isRoot(note)}
                            onClick={() => toggleNote(note)}
                            onRightClick={() => setExplicitRoot(note)}
                        />
                    ))}

                </section>
            </header>

            <section className='scales-results'>
                <div className='scales-container'>
                    {detectedScales.length === 0 && selectedNotes.size > 1 && (
                        <p className='results-empty'>No scales found for this note set.</p>
                    )}
                    {detectedScales.length === 0 && selectedNotes.size <= 1 && (
                        <p className='results-empty'>Select at least two notes to detect scales.</p>
                    )}
                    {detectedScales.map(({ scale }, index) => {
                        return <ScaleCard scale={scale} rootNote={rootNote} index={index} key={`${scale}-${index}`} />
                    })}
                </div>
            </section>
        </section>
    )
}