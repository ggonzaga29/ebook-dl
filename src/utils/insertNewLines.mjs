export default function insertNewLines(str, n) {
    let result = '';
    while (str.length > 0) {
        result += str.substring(0, n) + '\n';
        str = str.substring(n);
    }
   
    return result;
}
