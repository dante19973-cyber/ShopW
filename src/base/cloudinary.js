export function cldImg(img, width = 400) {
    if (!img) return '';

    const transform = `f_auto,q_auto,w_${width}`;

    // У базі лежить повний URL: додаємо трансформацію після /upload/
    if (img.startsWith('http')) {
        return img.replace('/upload/', `/upload/${transform}/`);
    }

    // У базі лежить public_id: збираємо URL самі
    return `https://res.cloudinary.com/${hq3is8rt}/image/upload/${transform}/${img}`;
}