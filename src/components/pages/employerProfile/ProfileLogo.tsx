import React, { useEffect, useState } from "react";
import { useDeletePhotoMutation, useUploadPhotoMutation } from "../../../app/services/employerInfoApi";
import { useGetEmployerProfileQuery } from "../../../app/services/profileApi";
import ReactLoading from "react-loading";
import classes from "./style.module.scss";
import { ReactComponent as CameraIcon } from './../../../images/camera.svg'
import { ReactComponent as TrashIcon } from './../../../images/trash.svg'
import { useDispatch } from "react-redux";
import { ModalTypes, changeInfo } from "../../../app/futures/user/modalSlice";

const ProfileLogo: React.FC = () => {
    const [filePath, setFilePath] = useState('');
    const [uploadPhoto] = useUploadPhotoMutation();
    const [deletePhoto] = useDeletePhotoMutation();
    const getEmployerProfile = useGetEmployerProfileQuery();
    const [isLoadingPhoto, setIsLoadingPhoto] = useState(true);

    const dispatch = useDispatch()

    useEffect(() => {
        if ('data' in getEmployerProfile) {
            const file = getEmployerProfile.data?.employer?.info?.logoUrl;
            if (file) {
                setFilePath(file);
            }
        }
    }, [getEmployerProfile]);

    useEffect(() => {
        setIsLoadingPhoto(getEmployerProfile.isLoading);
    }, [getEmployerProfile.isLoading])

    const handleFileChange = async (event: any) => {
        const input = event.target;
        const file = input.files.length > 0 ? input.files[0] : null;

        if (!file) {
            alert("Please select a file to upload");
            return;
        }

        try {
            setIsLoadingPhoto((val) => val = true);
            const result = await uploadPhoto({ file }).unwrap();
            setFilePath(result.filePath);
            setIsLoadingPhoto((val) => val = false);
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: result.message }))
            console.log(result);
        } catch (error) {
            dispatch(changeInfo({ type: ModalTypes.ERROR, message: 'Ошибка при загрузке фотографии' }));
            console.error('Error uploading photo:', error);
        }
    };

    const handleDeletePhoto = async () => {
        try {
            setIsLoadingPhoto((val) => val = true);
            const result = await deletePhoto().unwrap();
            setFilePath('');
            setIsLoadingPhoto((val) => val = false);
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: result.message }))
            console.log('Photo deleted successfully:', result);
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    }

    const LoadingComponent: React.FC = () => {
        return (
            <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} />
        )
    }

    return (
        <div className={classes.logoBlock}>
            {isLoadingPhoto ? <LoadingComponent /> : <>
                {filePath !== '' ? <>
                    <img src={`http://localhost:5000${filePath}`} alt="Logo" />
                    <div className={classes.logo_icons}>
                        <label>
                            <CameraIcon />
                            <input type="file" id="photo" name="photo" accept="image/*" className={classes.photo_input} onChange={handleFileChange} />
                        </label>
                        <span onClick={handleDeletePhoto}>
                            <TrashIcon />
                        </span>
                    </div>
                </> : <>
                    <span className={classes.logo_item}>
                        <CameraIcon />
                    </span>
                    <button>
                        <label htmlFor="photo">Загрузить фото</label>
                        <input type="file" id="photo" name="photo" accept="image/*" className={classes.photo_input} onChange={handleFileChange} />
                    </button>
                    <p className={classes.first_p}>JPG, PNG</p>
                    <p>Не более 1 МБ</p>
                </>}
            </>}
        </div>
    )
}

export default ProfileLogo;