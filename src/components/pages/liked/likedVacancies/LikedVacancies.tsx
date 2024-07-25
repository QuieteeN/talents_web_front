import React from "react";
import Header from "../../../header/Header";
import CardList from "../../../card/CardList";
import { useGetAllLikedVacanciesQuery } from "../../../../app/services/favoriteApi";
import classes from "./styles.module.scss"

const LikedVacancies: React.FC = () => {
    const { data: likedVacancies, error, isLoading } = useGetAllLikedVacanciesQuery();

    return isLoading ? (
        <>
        </>
    ) : (
        likedVacancies ?
            <>
                <Header />
                <main className={classes.content}>
                    <div className={classes.vacancies_content}>
                        <CardList cards={likedVacancies.data} type="all" />
                    </div>
                </main>
            </>
            :
            <>
                <Header />
                <main className={classes.content}>
                    У вас пока нет понравившихся вакансий
                </main>
            </>

    )
}

export default LikedVacancies