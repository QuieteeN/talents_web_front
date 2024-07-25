import React from "react";
import { useSelector } from "react-redux";
import { UserTypes } from "../../../app/futures/authInfoSlice";
import LikedCvs from "./likedCvs/LikedCvs";
import LikedVacancies from "./likedVacancies/LikedVacancies";

const LikedPage: React.FC = () => {
    const authInfo = useSelector((state: any) => state.authInfo);
    
    const getLikedPage = () => {
        switch (authInfo.type) {
            case UserTypes.EMPLOYER: return <LikedCvs />
            case UserTypes.STUDENT: return <LikedVacancies />
            default: return <></>
        }
    }

    return (
        getLikedPage()
    )
}

export default LikedPage