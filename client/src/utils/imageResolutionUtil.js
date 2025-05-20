export const resizeImage = (
  imgFile,
  maxWidth = 1920,
  maxHeight = 1080,
  callback
) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // const base64String = canvas.toDataURL("image/jpeg", 0.9); // 0.9 = high quality
      const base64String = canvas.toDataURL("image/png"); // 0.9 = high quality
      callback(base64String);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(imgFile);
};

export const resizeAndCropImage = (
  imgFile,
  targetWidth,
  targetHeight,
  callback
) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      // Scale so the image fully covers the target dimensions
      const scale = Math.max(
        targetWidth / img.width,
        targetHeight / img.height
      );
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;

      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");

      // Calculate top-left coords to crop the center part of the scaled image
      const dx = (targetWidth - scaledWidth) / 2;
      const dy = (targetHeight - scaledHeight) / 2;

      ctx.drawImage(img, dx, dy, scaledWidth, scaledHeight);

      const base64String = canvas.toDataURL("image/png");
      callback(base64String);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(imgFile);
};

export const getBase64Size = (base64String) => {
  // Remove "data:image/jpeg;base64," prefix
  const base64Data = base64String.split(",")[1];
  // Base64 string length
  const length = base64Data.length;
  // Calculate the size in bytes
  // Each base64 character encodes 6 bits => 4 chars = 3 bytes
  // So, size in bytes = (length * 3) / 4
  const sizeInBytes = (length * 3) / 4;
  return sizeInBytes;
};

export const base64ToFile = (base64String, filename) => {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
