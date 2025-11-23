import { useDataContext } from '../../contexts/DataContext';
import { useSynthContext } from '../../contexts/SynthContext';
import "./SynthControls.css";

export const SynthControls = () => {
  const { octave, setOctave } = useDataContext();
  const { volume, setVolume } = useSynthContext();
  const defaultVolume = (volume + 24) / 24; // Map volume (-24 to 0) to slider (0 to 1)

  const onOctaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = parseInt(e.target.value, 10);
    setOctave(value);
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = parseFloat(e.target.value); // Slider value (0-1)
    const dB = value * 24 - 24; // Map to -24 dB to 0 dB
    setVolume(dB);
  };

  return (
    <section
      className="synth-controls flex gap-16">
      <div className="synth-controls-wrapper">
        <div className="control">
          <header className="flex gap-8">
            <p>basic controls</p>
          </header>
          <div className="content">
            <div>
              <p>volume</p>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={defaultVolume}
                onChange={onVolumeChange}
              />
            </div>
            <div>
              <p>Octave</p>
              <input
                type="number"
                min={1}
                max={9}
                onChange={onOctaveChange}
                defaultValue={octave}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}