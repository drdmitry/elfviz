import { convertReadElfToD3 } from './converter';
import elfSimpleCProgram from '../data/elfSimpleCProgram';

it('should have convert function', () => {
  expect(typeof convertReadElfToD3).toBe('function');
});

it('should return empty array on empty data', () => {
  const data = convertReadElfToD3([]);
  expect(data).toEqual([]);
});

it('should do conversion and match snapshot on one item data', () => {
  const initialData = [
    {
      "number": "0",
      "name": "<none>",
      "type": "NULL",
      "address": "0x0000000000000000",
      "offset": "0x000000",
      "size": 0,
      "flags": ""
    },
  ];
  const data = convertReadElfToD3(initialData);
  expect(data).toMatchSnapshot();
});

it('should do conversion and match snapshot on hierarchy of data (from elfSimpleCProgram.json)', () => {
  const data = convertReadElfToD3(elfSimpleCProgram);
  expect(data).toMatchSnapshot();
});
