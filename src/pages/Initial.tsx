import { useDataContext } from '../contexts/DataContext';
import { chromaticScale } from '../utils/util';
import { Scale } from 'tonal';
import { DropdownSelect } from '../components/DropdownSelect/DropdownSelect';
import { Piano } from '../components/piano/piano';
import { ScaleRow } from '../components/ScaleRow';

export const InitialSection = () => {
    const { note, scale, mode, changeKey, changeMode } = useDataContext();

    const onKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        changeKey(e.target.value);
    }

    const onModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        changeMode(e.target.value);
    }

    return (
        <section className='flex flex-column flex-center gap-32'>
            <ScaleRow scale={scale} />

            <Piano />

            <div className='flex flex-center gap-16 flex-wrap'>
                <DropdownSelect options={chromaticScale} defaultValue={note.pc} onChange={onKeyChange} />
                <DropdownSelect options={Scale.names()} defaultValue={mode} onChange={onModeChange} />
            </div>
        </section>
    )
}

