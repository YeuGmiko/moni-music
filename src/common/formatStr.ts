const fileSizeExt: { nextMultiple: number; ext: string }[] = [
    {
        nextMultiple: 1024,
        ext: 'B'
    },
    {
        nextMultiple: 1024,
        ext: 'KB'
    },
    {
        nextMultiple: 1024,
        ext: 'MB'
    },
    {
        nextMultiple: 1024,
        ext: 'GB'
    },
    {
        nextMultiple: Number.MAX_SAFE_INTEGER,
        ext: 'TB'
    }
]
export function formatFileSize(fileSize: number) {
    let index = 0
    function dp(size: number) {
        if (size >= fileSizeExt[index].nextMultiple) {
            // 继续格式化单位
            return dp(size / fileSizeExt[index++].nextMultiple)
        } // 达到最大单位
        else return size
    }
    return `${dp(fileSize).toFixed(2)}${fileSizeExt[index].ext}`
}
