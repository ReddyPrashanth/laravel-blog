/**
 * 
 * @param {number} len 
 * @param {string} str 
 */
export const truncate = (len, str = '') => {
    if(typeof len !== 'number' || str.length <= len) return str;
    return `${str.slice(0, len)} ...`;
}