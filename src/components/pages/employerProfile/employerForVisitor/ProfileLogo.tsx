import React, { useEffect, useState } from "react";
import { useGetEmployerProfileQuery } from "../../../../app/services/profileApi";
import ReactLoading from "react-loading";
import classes from "./../style.module.scss";
import { ReactComponent as CameraIcon } from './../../../../images/camera.svg'


const ProfileLogo: React.FC = () => {
    const [filePath, setFilePath] = useState('');
    const getEmployerProfile = useGetEmployerProfileQuery();
    const [isLoadingPhoto, setIsLoadingPhoto] = useState(true);


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
                </> : <>
                    <span className={classes.logo_item}>
                        <CameraIcon />
                    </span>
                </>}
            </>}
        </div>
    )
}

export default ProfileLogo;