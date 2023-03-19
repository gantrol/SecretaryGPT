// const {countTokens, encode, decode} = require('gpt-3-encoder');
// TODO: 由于需要调用浏览器的API，所以需要在浏览器环境下运行，但目前还没有实现合适的方法执行该单元测试
// describe('encode', () => {
//     test('space', () => {
//         const str = " ";
//         expect(encode(str)).toEqual([220])
//         expect(decode(encode(str))).toEqual(str)
//     });
//
//     test('tab', () => {
//         const str = "\t";
//         expect(encode(str)).toEqual([197])
//         expect(decode(encode(str))).toEqual(str)
//     });
//
//     test('simple text', () => {
//         const str = "This is some text";
//         expect(encode(str)).toEqual([1212, 318, 617, 2420])
//         expect(decode(encode(str))).toEqual(str)
//     });
// })

test("1", () => {
    expect(1).toBe(1);
});
