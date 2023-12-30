export default async function convertFileToBase64(imageFile) {
  return new Promise((resolve) => {
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      if (fileReader.readyState === 2) resolve(fileReader.result);
    };

    fileReader.readAsDataURL(imageFile);
  });
}
