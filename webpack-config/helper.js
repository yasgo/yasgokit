module.exports = {
    deleteFilePathSingle: (item) => item.substring(item.lastIndexOf('/') + 1, item.length),
    createType: process.argv[2],
    createName: process.argv[3]
};