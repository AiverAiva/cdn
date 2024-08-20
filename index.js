const fs = require('fs');
const path = require('path');

const rootDir = 'src/';

function generateFileTree(dir) {
  const files = fs.readdirSync(dir);

  let fileTree = '<ul class="list-none p-0 m-0">';
  const directories = files.filter((file) => fs.statSync(path.join(dir, file)).isDirectory());
  const filesOnly = files.filter((file) => !fs.statSync(path.join(dir, file)).isDirectory());

  directories.forEach((file) => {
    const fullPath = path.join(dir, file);
    const relativePath = path.relative(rootDir, fullPath);
    fileTree += `<li class="cursor-pointer hover:bg-gray-200 p-1"><i class="fas fa-folder mr-2"></i>${file}</li>`;
    fileTree += `<li class="hidden pl-4" data-parent="${file}">${generateFileTree(fullPath)}</li>`;
  });

  filesOnly.forEach((file) => {
    const fullPath = path.join(dir, file);
    const relativePath = path.relative(rootDir, fullPath);
    const fileTypeIcon = fs.statSync(fullPath).isFile() ? (file.match(/.(jpg|jpeg|png|gif)$/i) ? '<i class="fas fa-image mr-2"></i>' : '<i class="fas fa-file mr-2"></i>') : '<i class="fas fa-folder mr-2"></i>';
    fileTree += `<li class="cursor-pointer hover:bg-gray-200 p-1"><a href="${rootDir + relativePath}" class="text-blue-500 hover:underline">${fileTypeIcon}${file}</a></li>`;
  });

  fileTree += '</ul>';
  return fileTree;
}

const fileTreeHTML = `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
  <!-- Tailwind CSS -->
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <script>
    document.addEventListener('DOMContentLoaded', (event) => {
      document.querySelectorAll('.cursor-pointer').forEach((item) => {
        item.addEventListener('click', (e) => {
          const parent = e.currentTarget.nextElementSibling;
          if (parent && parent.getAttribute('data-parent')) {
            parent.classList.toggle('hidden');
          }
        });
      });
    });
  </script>
</head>
<body class="bg-gray-100 font-mono p-4">
  <h1 class="text-3xl mb-4 font-black">The thing where I share my files! </h1>
  ${generateFileTree(rootDir)}
</body>
</html>
`;

fs.writeFileSync('index.html', fileTreeHTML);
console.log('File tree generated and saved as "index.html"');
