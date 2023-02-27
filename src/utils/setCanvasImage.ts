export const setCanvasImage = (
    ctx: CanvasRenderingContext2D,
    url: string,
    canvas: HTMLCanvasElement,
) => {
    let img = new Image();
    img.src = url;
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
};
