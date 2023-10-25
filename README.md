# cdn

A file tree system made with very easy mechanic. Using Github Actions for updating.
I made this due to the scarcity of these kind of resources we are able to find on the internet, there are prob some exist libraries that I didnt found.
But anyways it took me a few minutes to make this simple script, which fits all my requirements I need and it is pretty need

# Explaination

This function basically creates the required html code for the website to work
It recursively searchs files in `src/`
and making its path for the later using of turning the paths into code
Thats what this function does.

```js
function generateFileTree(dir) {
  const files = fs.readdirSync(dir);

  let fileTree = '<ul>';
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const relativePath = path.relative(rootDir, fullPath);
    const isDirectory = fs.statSync(fullPath).isDirectory();

    if (isDirectory) {
      fileTree += `<li><details><summary><i class="fas fa-folder"></i> ${file}</summary>`;
      fileTree += generateFileTree(fullPath);
      fileTree += '</details></li>';
    } else {
      fileTree += `<li><a href="${rootDir + relativePath}"><i class="fas fa-file"></i> ${file}</a></li>`;
    }
  });
  fileTree += '</ul>';
  return fileTree;
}
```
