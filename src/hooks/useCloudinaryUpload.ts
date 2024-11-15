export default function useCloudinaryUpload() {
  async function uploadFile(file: File) {
    try {
      const formData = new FormData();

      formData.append('file', file);
      formData.append('upload_preset', 'brdhoutx');
      formData.append("resource_type", "raw");

      const response = await fetch(`https://api.cloudinary.com/v1_1/dcdfqrryo/upload`, {method: 'POST', body: formData});

      if(!response.ok){
        throw new Error('Failed to upload file')
      }

      const data : {secure_url: string} = await response.json();

      return data.secure_url

    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  return {uploadFile}
}