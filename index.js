var path = require('path');


function getFileSize(file){
    const stats = fs.statSync(file)
    const fileSizeInBytes = stats.size
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(fileSizeInBytes, 10) || 0;
    while(n >= 1024 && ++l)
        n = n/1024;
    return(n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
}

function getStructure (fs, dir, callback) {
    var results = [];
    var localPath = '';
    var total = { files: 0, folders: 0 };

    fs.readdir(dir, function (err, list) {
        if (err) return callback(err);

        var itemsLeft = list.length;

        if (!itemsLeft) return callback(null, {name: path.basename(dir), type: 'folder', children: results}, total);

        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    getStructure(fs, file, function (err, res, tot) {
                        total.folders = total.folders + tot.folders + 1;
                        total.files = total.files + tot.files;
                        results.push({ name: path.basename(file), type: 'folder', children: res, children_count: res.length, created_at: stat.birthtime, local_path: file });
                        if (!--itemsLeft) callback(null, results, total);
                    });
                }
                else {
                    var ext = path.extname(file||'').split('.');
                    results.push({ type: 'file', name: path.basename(file), size: getFileSize(file), created_at: stat.birthtime, file_type: ext[ext.length - 1], local_path: file });
                    total.files++;
                    if (!--itemsLeft) callback(null, results, total);
                }
            });
        });
    });
}

function traverseStructure (structure, basepath, onFolderFound, onFileFound) {
    structure.forEach(function (object) {
        if (object.type === 'folder' && object.children.length > 0) {
            onFolderFound(object, basepath);
            traverseStructure(object.children, basepath ? basepath + '/' + object.name : object.name, onFolderFound, onFileFound);
        }

        if (object.type === 'file') {
            onFileFound(object, basepath);
        }
    });
}

module.exports.getStructure = getStructure;
module.exports.traverseStructure = traverseStructure;
