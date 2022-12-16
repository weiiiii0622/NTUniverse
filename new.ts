type a = string
interface I {
    a: number
};

const f = <T>(s: T): T => { return s };

type S<T> = T;