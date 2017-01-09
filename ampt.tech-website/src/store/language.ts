let language = window.localStorage.getItem("lang")

if (!language) {
    if (navigator.appName === 'Netscape') {
        language = navigator.language
    } else {
        language = (navigator as any).userLanguage
    }
}

if(/zh-/ig.test(language as string)){
    language = 'zh'
}

export default language
