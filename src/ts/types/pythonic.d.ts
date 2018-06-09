declare module 'pythonic' {
    interface Generator<T1, T2> {
        [Symbol.iterator](): Iterator<[T1, T2]>;

        // map(callbackFn)

        // filter(callbackFn)

        // toArray()
    }

    // function rangeSimple(stop)

    // function rangeOverload(start, stop, step = 1)

    // function range(...args)

    // function enumerate(iterable)

    function zip<T1, T2>(
        iterFirst: ArrayLike<T1>,
        iterSecond: ArrayLike<T2>): Generator<T1, T2>;

    // function items(obj)
}
