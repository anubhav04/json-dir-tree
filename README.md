Directory Structure JSON
========================

This module exposes functions with which you can:

* Get a JSON tree/structure of a folder (including subdirectories and files), note that you have specify the `filesystem` to use yourself. You can get JSON tree for a directory with `n` levels of children.
* Traverse a structure, giving callbacks to execute when a file or folder is found.

* It gives you all the details of the file and folder including date created, size in actual units, file extension and local path.

* You can use to it get only size of file you are uploading: Size Units: ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']


## Installation
    npm install --save json-dir-tree

## Example of a directory structure output
``` json
 [
    {
        "type": "file",
        "name": "index.js",
        "size": "2KB",
        "created_at": "Wed Nov 28 2018 15:03:56 GMT+0530 (IST)",
        "local_path": "/Users/test/json-dir-tree/",
        "file_type": "js"
    },
    {
        "name": "node_modules",
        "type": "folder",
        "children_count": "1",
        "created_at": "Wed Nov 28 2018 15:03:56 GMT+0530 (IST)",
        "children": [
            {
                "name": "path",
                "type": "folder",
                "created_at": "Wed Nov 28 2018 15:03:56 GMT+0530 (IST)",
                "children": [
                    {
                        "type": "file",
                        "name": "path.js",
                        "size": "43KB",
                        "created_at": "Wed Nov 28 2018 15:03:56 GMT+0530 (IST)",
                        "local_path": "/Users/test/json-dir-tree/",
                        "file_type": "js"
                    },
                    {
                        "type": "file",
                        "name": "package.json",
                        "size": "113KB",
                        "created_at": "Wed Nov 28 2018 15:03:56 GMT+0530 (IST)",
                        "local_path": "/Users/test/json-dir-tree/",
                        "file_type": "json"
                    },
                    {
                        "type": "file",
                        "name": "README.md",
                        "size": "1KB",
                        "created_at": "Wed Nov 28 2018 15:03:56 GMT+0530 (IST)",
                        "local_path": "/Users/test/json-dir-tree/",
                        "file_type": "md"
                    }
                ]
            }
        ]
    }
]
```

## Get directory structure
``` javascript
var JsonDirTree = require('json-dir-tree');
var basepath = 'path/to/some/folder';
var fs = require('fs'); // you can select any filesystem as long as it implements the same functions that native fs uses.

JsonDirTree.getStructure(fs, basepath, function (err, structure, total) {
    if (err) console.log(err);

    console.log('there are a total of: ', total.folders, ' folders and ', total.files, ' files');
    console.log('the structure looks like: ', JSON.stringify(structure, null, 4));
});
```

## Traverse structure
The structure retrieved from the example above can be traversed.


``` javascript
var JsonDirTree = require('json-dir-tree');
var basepath = 'path/to/some/folder'; // this will be prepended to the paths found in the structure

JsonDirTree.traverseTree(structure, basepath,
function (folder, path) {
    console.log('folder found: ', folder.name, 'at path: ', path);
},
function (file, path) {
    console.log('file found: ', file.name, 'at path: ', path);
});
```

## Get file size
```javascript
var JsonDirTree = require('json-dir-tree');
var basepath = 'path/to/some/file'; // this will be prepended to the paths found in the structure
var fileSize = JsonDirTree.getFileSize(basepath);
```

## License MIT
* MIT License

Copyright (c) 2018 anubhav04

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
