export default function resolveAsset(path) {
    if (!path) return '';
    const cleanPath = path.replace(/^(\.\/|\/)/, '');
    return `${import.meta.env.BASE_URL}${cleanPath}`;
}