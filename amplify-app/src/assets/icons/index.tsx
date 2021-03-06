const files = (require as NodeRequire).context('.', true, /\.svg$/)

const modules = {}

files.keys().forEach(key => {
    if (key === './index.js') {
        return
    }
    modules[key.replace(/(\.\/|\.svg)/g, '')] = `#${files(key).default.id}`
})

export default modules
