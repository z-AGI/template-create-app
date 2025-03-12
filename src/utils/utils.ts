

// 对象属性转小驼峰
export const toCamelCaseObject = (obj : any): any => {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }
    if (Array.isArray(obj)) {
        return obj.map(toCamelCaseObject)
    }
    const newObj : any = {}
    for (const key in obj) {
        newObj[toCamelCase(key)] = toCamelCaseObject(obj[key])
    }
    return newObj
}

// 中划线转小驼峰
export const toCamelCase = (str : string) => {
    return str.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
}

// 小驼峰转中划线
export const toSnakeCase = (str : string) => {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 获取对象属性
export const getObjectProperty = (obj : any, key : string) => {
    return key.split('.').reduce((acc, key) => {
        if (acc === undefined) {
            return undefined
        }
        return acc[key] || acc[toSnakeCase(key)]
    }, obj)
}