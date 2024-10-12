export async function delay (ms:number) {
    return new Promise((reslove) => {
        setTimeout(() => {
            reslove('')
        }, ms)
    })
}