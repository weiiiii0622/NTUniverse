// 1. Basic usage

let a: number = 3
// ❌ a = 'a'

const b = 'abc';  // implict declare b: string
// ❌ console.log(10 - b);

function f(x) {  // implicit "any" type, may be banned based on config
    return x;
}

type Option = 'on' | 'off';
// ❌ const opt: Option = 'none';



// 2. interface 

interface I {
    m1: number,
    m2?: string,  // optional member
    m3: (x: number) => number,
};
const A: I = {
    m1: 1,
    // m2: 'a',
    m3: (x) => x + 1,
};
// ❌ const { m4 } = A;  

const f2 = (props: I) => { };
// ❌ f2({ m1: 3 });



// 3. Generic type

type NewType<T> = T | string;
const x: NewType<number> = 3;

const f1 = <T, T1>(x: T, y: T1): T => { return x };

interface I1<T> {
    member: T,
};