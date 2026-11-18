export default function resolveAsset(path: string): string {
    if (!path) return '';
    const cleanPath = path.replace(/^(\.\/|\/)/, '');
    return `${import.meta.env.BASE_URL}${cleanPath}`;
}