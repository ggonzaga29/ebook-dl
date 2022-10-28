export default function truncate(str, n) {

    let out = (str.slice(0, n)).concat('...');
    while(out.length < n) {
        out += " ";
    }

    return out;
}
