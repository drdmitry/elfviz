export const convertReadElfToD3 = data => {
  return data.map(section => {
    const { name, size, symbols } = section;
    const item = { name, size };
    if (symbols) {
      item.children = symbols
        .filter(symbol => symbol.size > 0 && symbol.name !== '<none>')
        .map(symbol => {
          return {
            name: symbol.name,
            size: symbol.size,
          };
        });
    }
    // console.log('item', item);
    return item;
  });
};
