/**
 * 验证手机号
 * @param mobile
 * @returns {boolean}
 */
export function isMobile(mobile) {
    return /0?(13|14|15|16|17|18|19)[0-9]{9}/.test(mobile)
}

/**
 * 验证为空
 * @param str
 * @returns {boolean}
 */
export function isEmpty(str) {
    return (typeof str === 'undefined') || (String(str).trim() === '') ? true : false
}