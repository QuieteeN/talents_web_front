import React from "react";
import Header from "../../../header/Header";
import { useGetAllLikedCvsQuery } from "../../../../app/services/favoriteApi";
import classes from "./styles.module.scss"
import CVList from "../../../cv/CVList";

const LikedCvs: React.FC = () => {
    const { data: likedCvs, error, isLoading } = useGetAllLikedCvsQuery();
    console.log(likedCvs)

    return isLoading ? (
        <>
        </>
    ) : (
        likedCvs ?
            <>
                <Header />
                <main className={classes.content}>
                    <div className={classes.vacancies_content}>
                        <CVList cards={likedCvs.data} type="all" />
                    </div>
                </main>
            </>
            :
            <>
                <Header />
                <main className={classes.content}>
                    У вас пока нет понравившихся резюме
                </main>
            </>

    )
}

export default LikedCvs