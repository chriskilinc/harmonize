import { useDataContext } from '../contexts/DataContext';
import { chromaticScale } from '../utils/util';
import { Scale } from 'tonal';
import { DropdownSelect } from '../components/DropdownSelect/DropdownSelect';
import { Piano } from '../components/piano/piano';
import { ScaleRow } from '../components/ScaleRow';
import { CopyButton } from '../components/CopyButton/CopyButton';

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
            {!scale?.empty && <ScaleRow scale={scale} />}

            <Piano />

            <div className='flex gap-8 md-gap-16 flex-wrap flex-center'>
                <DropdownSelect options={chromaticScale} defaultValue={note.pc} onChange={onKeyChange} />
                <DropdownSelect options={Scale.names()} defaultValue={mode} onChange={onModeChange} />
            </div>
            <p className='scale-name'>
                {scale?.empty ?
                    <>
                        Something went wrong..
                    </> : <>
                        {scale.name}
                        {scale.aliases.length > 0 && <span style={{ fontStyle: "italic", fontSize: "0.75rem" }}> ({scale.aliases.join(", ")})</span>}
                        <CopyButton size={"1rem"} text={location.href} />
                    </>}

            </p>

        </section>
    )
}

// TODO: http://localhost:5173/?mode=lydian+%235P+pentatonic&key=A%23
// TODO: http://localhost:5173/?mode=minor+%237M+pentatonic&key=A%23