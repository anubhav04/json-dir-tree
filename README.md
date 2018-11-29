Directory Structure JSON
========================

This module exposes functions with which you can:

* Get a JSON structure of a folder (including subdirectories and files), note that you have specify the `filesystem` to use yourself
* Traverse a structure, giving callbacks to execute when a file or folder is found

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

JsonDirTree.traverseStructure(structure, basepath,
function (folder, path) {
    console.log('folder found: ', folder.name, 'at path: ', path);
},
function (file, path) {
    console.log('file found: ', file.name, 'at path: ', path);
});
```
