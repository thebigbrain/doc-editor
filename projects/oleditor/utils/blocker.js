/**
 * This is a waiting promise that only resolves when the given value is done
 * initializing. It waits.
 */
export function blocker() {
    let resolve = null;
    const promise = new Promise(r => {
        resolve = r;
    });
    return {
        promise,
        resolve,
    };
}
