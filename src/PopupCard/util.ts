export const getClipboard = () => {

    return new Promise((resolve, reject) => {

        navigator.clipboard.readText()
            .then(text => {
                resolve(text);
            })
            .catch(err => {
                reject(err);
            });

    })



}