export const readfile = fileToRead => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = file => resolve(file.target.result);
    reader.onerror = err => reject(err);
    reader.readAsText(fileToRead, "UTF-8");
  });
};
