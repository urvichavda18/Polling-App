import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    //Appenfd image file to from data 
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart-form-data', //set header file upload 
            },
        });
        return response.data;//return response data

    } catch (error) {
        console.error('Error uploading he image:', error);
        throw error; //rethorw error for handling 
    }
};

export default uploadImage;