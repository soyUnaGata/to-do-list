export function formatNumber(num) {
    return num >= 10 ? num.toString() : num.toString().padStart(2, '0')
};