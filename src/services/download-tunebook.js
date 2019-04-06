export const downloadTunebook = (copies, filename) => {
    debugger;

    const tunes = copies.reduce((agg, tune) => {
        return (agg ? agg + "\n" : "") + tune.abc;
    }, null);
    const a = document.createElement("a");
    a.href = `data:text/plain;charset=utf-8,${tunes}`;
    a.download = filename;
    a.click();
};
