import { Scale } from "tonal";
import { useSearchParams } from 'react-router-dom';
import { chromaticScale } from '../utils/util';
import { NoteButton } from '../components/NoteButton/NoteButton';
import { useEffect, useState } from 'react';
import '../style/scales.css';
import { ScaleCard } from '../components/ScaleCard/ScaleCard';

// TODO: Replace clear button with an icon button

const searchParamsKey = 'notes';

export const Scales = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedNotes, setSelectedNotes] = useState<Set<string>>(() => {
        const notes = searchParams.get(searchParamsKey);
        return notes ? new Set(notes.split(',')) : new Set();
    });

    // When searchParams change (e.g. after refresh or navigation), update selectedNotes
    useEffect(() => {
        const notes = searchParams.get(searchParamsKey);
        setSelectedNotes(notes ? new Set(notes.split(',')) : new Set());
    }, [searchParams]);

    // When selectedNotes change, update the URL search params
    useEffect(() => {
        const notes = Array.from(selectedNotes).join(',');
        const newParams = new URLSearchParams(searchParams.toString());
        if (notes) {
            newParams.set(searchParamsKey, notes);
        } else {
            newParams.delete(searchParamsKey);
        }
        // Only update if params actually changed
        if (newParams.toString() !== searchParams.toString()) {
            setSearchParams(newParams, { replace: true });
        }
    }, [selectedNotes]);

    const isRoot = (note: string) => {
        if (selectedNotes.size === 0) return false;
        return note === Array.from(selectedNotes)[0];
    }

    return (
        <section className='container scales-page'>
            <header className='header'>
                <h1>Scales Finder</h1>
                <p>Find scales based on your selected notes</p>

                <button className='clear-button' onClick={() => { setSelectedNotes(new Set()); }}>clear</button>
                <section className='flex flex-wrap gap-8'>
                    {chromaticScale.map((note, index) => (
                        <NoteButton key={index} note={note} selected={selectedNotes.has(note)} isRoot={isRoot(note)} onClick={() => {
                            const newSelectedNotes = new Set(selectedNotes);
                            if (newSelectedNotes.has(note)) {
                                newSelectedNotes.delete(note);
                            } else {
                                newSelectedNotes.add(note);
                            }
                            setSelectedNotes(newSelectedNotes);
                        }} />
                    ))}

                </section>
            </header>

            <section className='scales-results'>
                <div className='scales-container'>
                    {selectedNotes.size > 1 && Scale.detect(Array.from(selectedNotes)).map((scale, index) => {
                        return <ScaleCard scale={scale} index={index} key={index} />
                    })}
                </div>
            </section>
        </section>
    )
}