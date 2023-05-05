import fs from 'fs';
export default fs.readdirSync(__dirname)
  .filter((value: string) => {
    return /\.ts$/.test(value) && value !== 'index.ts';
  })
  .map((value: string) => require('./' + value).default);