// require the module
var RNFS = require('react-native-fs');
//路径
const path = RNFS.ExternalStorageDirectoryPath + '/junan365/inspect.json';//ExternalStorageDirectoryPath
//ExternalDirectoryPath
//RNFS.ExternalStorageDirectoryPath

// get a list of files and directories in the main bundle
export function readDir() {
    RNFS.readDir(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then((result) => {
            console.log('GOT RESULT', result);

            // stat the first file
            return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        })
        .then((statResult) => {
            if (statResult[0].isFile()) {
                // if we have a file, read it
                return RNFS.readFile(statResult[1], 'utf8');
            }

            return 'no file';
        })
        .then((contents) => {
            // log the file contents
            console.log(contents);
        })
        .catch((err) => {
            console.log(err.message, err.code);
        });
}


/*将文本写入本地 json*/
export function copyFile() {
    // copy the file
    let filepath = RNFS.ExternalStorageDirectoryPath + '/junan365/inspect.json'
    RNFS.copyFile(filepath, path)
        .then((success) => {
            console.log('path', path);
            // if(typeof callback =='function'){
            //     callback(path)
            // }
        })
        .catch((err) => {
            console.log(err.message);
        });
}


/*将文本写入本地 json*/
export function writeFile(obj, callback) {

    let str = JSON.stringify(obj)
    // write the file

    // console.log("===========write",path)
    RNFS.writeFile(path, str, 'utf8')
        .then((success) => {
            // console.log('path', path);
            if (typeof callback == 'function') {
                callback(path)
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
}



/*读取json文件内容*/
export function readFile(callback) {
    // console.log('path======',path)
    return RNFS.readFile(path)
        .then((result) => {
            if (typeof callback == 'function') {
                let obj = JSON.parse(result);
                callback(obj)
            }
        })
        .catch((err) => {
            console.log(err.message);

        });
}

/*在已有的json上添加新的文本*/
export function appendFile() {

    return RNFS.appendFile(path, '新添加的文本', 'utf8')
        .then((success) => {
            console.log('success');
        })
        .catch((err) => {
            console.log(err.message);

        });
}


/*删除文件*/
export function deleteFile() {
    return RNFS.unlink(path)
        .then(() => {
            console.log('FILE DELETED');
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch((err) => {
            console.log(err.message);
        });
}
