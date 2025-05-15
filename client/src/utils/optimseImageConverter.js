export const processImageFile = async (file, sizes = [75, 150, 300]) => {
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("Please select a valid image file.");
  }

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  };

  const sizeMap = {
    // 75: "small",
    150: "medium",
    // 300: "large",
  };

  const dataURL = await readFileAsDataURL(file);

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const results = {};

      // Store original
      results.original = {
        dataURL,
        file: base64ToFile(dataURL, file.name),
      };

      const minSize = Math.min(img.width, img.height);
      const sx = (img.width - minSize) / 2;
      const sy = (img.height - minSize) / 2;

      sizes.forEach((size) => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, sx, sy, minSize, minSize, 0, 0, size, size);

        const resizedDataURL = canvas.toDataURL("image/jpeg", 0.8);
        const resizedFile = base64ToFile(
          resizedDataURL,
          `${file.name.split(".")[0]}_${size}.jpg`
        );

        const key = sizeMap[size] || size.toString();
        results[key] = {
          dataURL: resizedDataURL,
          file: resizedFile,
        };
      });

      resolve(results);
    };

    img.src = dataURL;
  });
};

// Helper function to convert base64 string to File
function base64ToFile(base64, filename) {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
