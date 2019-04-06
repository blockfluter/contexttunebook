import abcjs from 'abcjs/midi'

export const TuneCollection = (abc) => {
    let tuneBook = new abcjs.TuneBook(abc);
    const titles = () => {
        return tuneBook.tunes.map(
            (t, i) => `${Number(i) + 1}. ${t.title}`
        )
    }
    const tuneCount = () => {
        return tuneBook.tunes.length
    }
    const tuneAbc = n => {
        return n >= 0 && n < tuneBook.tunes.length
            ? tuneBook.tunes[n].abc
            : ''
    }
    return Object.freeze({
        titles,
        tuneCount,
        tuneAbc,
    })
}

