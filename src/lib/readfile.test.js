import { readfile } from './readfile';
import elfSimpleCProgram from '../data/elfSimpleCProgram';

const file = new Blob([elfSimpleCProgram], { type: 'text/plain' });

it('should have readfile function', () => {
  expect(typeof readfile).toBe('function');
});

it('should call FileReader', () => {
  const readAsText = jest.fn();
  const dummyFileReader = { addEventListener, readAsText, result: elfSimpleCProgram };
  window.FileReader = jest.fn(() => dummyFileReader);
  readfile(file);
  expect(FileReader).toHaveBeenCalled();
  expect(readAsText).toHaveBeenCalledWith(file, 'UTF-8');
});

it('should resolve promise with loaded data', () => {
  const file = new Blob([elfSimpleCProgram], { type: 'text/plain' });
  const readAsText = jest.fn(() => dummyFileReader.onload({ target: { result: elfSimpleCProgram } }));
  // const readAsText       = jest.fn();
  const addEventListener = jest.fn((_, evtHandler) => { evtHandler(); });
  const dummyFileReader = { addEventListener, readAsText, result: elfSimpleCProgram };
  window.FileReader = jest.fn(() => dummyFileReader);
  expect.assertions(1);
  readfile(file).then(data => expect(data).toEqual(elfSimpleCProgram));
});

it('should reject promise with error', () => {
  const file = new Blob([elfSimpleCProgram], { type: 'text/plain' });
  const readAsText = jest.fn(() => dummyFileReader.onerror('error'));
  const addEventListener = jest.fn((_, evtHandler) => { evtHandler(); });
  const dummyFileReader = { addEventListener, readAsText, result: elfSimpleCProgram };
  window.FileReader = jest.fn(() => dummyFileReader);
  expect.assertions(1);
  readfile(file).catch(err => expect(err).toEqual('error'));
});
