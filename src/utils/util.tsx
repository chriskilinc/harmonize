
// TODO: Make this toggleable (for sharps, flats or both)
// all 12 notes
export const chromaticScale = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
export const chromaticScaleExtended = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'];


export const getArrangedChromaticScaleByKey = (key: string) => {
    const noteIndex = chromaticScale.findIndex((note) => note == key);
    const newScale = chromaticScale.slice(noteIndex, chromaticScale.length);
    newScale.push(...chromaticScale.slice(0, noteIndex));

    if (newScale[newScale.length - 1].includes("#")) {
        // last is shart or flat
        newScale.push(newScale[0]);
    } else if (newScale[0].includes("#")) {
        // first is sharp or flat
        newScale.unshift(newScale[newScale.length - 1]);
    }
    return newScale;
}
