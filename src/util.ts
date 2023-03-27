
// 将信息添加到 Anki
export function ankiAction(action: any, version: any, params = {}) {
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:8765', {
            method: "POST",
            body: JSON.stringify({ "action": action, "version": version, "params": params })
        }).then(response => response.json()).then((data) => {

            console.log(data);
            resolve(data)

        })

    });
}