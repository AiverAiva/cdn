const fs = require('fs');
const path = require('path');

const rootDir = 'src/'

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

const fileTreeHTML = `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
  <h1>Some FILES OWO</h1>
  ${generateFileTree(rootDir)}
</body>
</html>
`;

fs.writeFileSync('index.html', fileTreeHTML);
console.log('File tree generated and saved as "index.html"');
