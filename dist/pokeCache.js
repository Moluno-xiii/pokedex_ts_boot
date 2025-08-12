export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(value) {
        this.#interval = value;
        this.#startReapLoop();
    }
    add(key, val) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val,
        });
    }
    get(key) {
        return this.#cache.get(key) ?? undefined;
    }
    #reap() {
        for (const entry of this.#cache) {
            entry[1].createdAt < Date.now() - this.#interval
                ? this.#cache.delete(entry[0])
                : null;
        }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }
    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
