import { useDataContext } from '../contexts/DataContext';
import { chromaticScale } from '../utils/util';
import { Scale } from 'tonal';
import { DropdownSelect } from '../components/DropdownSelect';
import { Piano } from '../components/piano/piano';

export const InitialSection = () => {
    const { note, scaleNotes, mode, changeKey, changeMode } = useDataContext();

    const onKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        changeKey(e.target.value);
    }

    const onModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        changeMode(e.target.value);
    }

    return (
        <section>
            <h1>Initial</h1>
            <DropdownSelect options={chromaticScale} defaultValue={note.pc} onChange={onKeyChange} />
            <DropdownSelect options={Scale.names()} defaultValue={mode} onChange={onModeChange} />

            <p>{note.name}</p>
            <p>{scaleNotes.join(", ")}</p>

            <Piano />
        </section>
    )
}

