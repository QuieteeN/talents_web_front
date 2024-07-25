import React, { useEffect, useState } from "react";
import classes from './style.module.scss'
import { ReactComponent as Briefcase } from '../../images/briefcase.svg'
import { getExperience, getStringSalary } from "../../utils";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LikeIcon } from '../../images/likeIcon.svg';
import { ReactComponent as FullLikeIcon } from '../../images/fullLike.svg'
import { useGetAllLikedVacanciesQuery, useToggleLikeVacancyMutation } from "../../app/services/favoriteApi";

interface ICard {
    id: number;
    name: string;
    salary: any;
    employer: {
        info: {
            companyName: string;
        };
    };
    city: string;
    experience: string;
    isLiked: boolean;  // добавляем поле isLiked для каждого card
}

interface IProps {
    cards: ICard[];
    type: string;
}

const CardList: React.FC<IProps> = ({ cards, type }: IProps) => {
    const [cardStates, setCardStates] = useState<ICard[]>(cards);


    useEffect(() => {
        setCardStates(cards)
    }, [cards])

    const [toggleLikeVacancy] = useToggleLikeVacancyMutation()

    const navigate = useNavigate();

    const navig = (index: number) => {
        switch (type) {
            case 'all':
                navigate(`/vacancy/${index}`);
                break;
            case 'self':
                navigate(`./../${index}/info`);
                break;
            default:
                navigate(`/vacancy/${index}`);
                break;
        }
    }

    const likeVacancy = async (event: React.MouseEvent<HTMLButtonElement>, cardId: number) => {
        event.stopPropagation();

        try {
            const response = await toggleLikeVacancy({ vacancyId: cardId });
            if ('data' in response) {
                setCardStates(prevStates => prevStates.map(card =>
                    card.id === cardId ? { ...card, isLiked: !card.isLiked } : card
                ));
            } else {
                console.error('Failed to like the vacancy');
            }
        } catch (error) {
            console.error('An error occurred while liking the vacancy', error);
        }
    }

    const openVacancy = (id: number) => {
        navig(id);
    }


    return (
        <div className={classes.cards__container}>
            {cardStates?.map((card) => (
                <div className={classes.card} key={card.id} onClick={() => openVacancy(card.id)}>
                    <div className={classes.card__title}>{card?.name}</div>
                    <div className={classes.card__salary}>{getStringSalary(card?.salary)}</div>
                    <div className={classes.card__company}>{card?.employer?.info?.companyName}</div>
                    <div className={classes.card__city}>{card?.city}</div>
                    <div className={classes.card__experience}>
                        <div className={classes.experience__icon}>
                            <Briefcase />
                        </div>
                        <span className={classes.experience__text}>
                            {getExperience(card?.experience)}
                        </span>
                    </div>
                    <div className={classes.controls_container}>
                        <button className={classes.card__btn}>
                            {type === 'all' ? 'Откликнуться' : 'Посмотреть'}
                        </button>
                        <button className={classes.btn} onClick={(event) => likeVacancy(event, card.id)}>
                            <span>
                                {card.isLiked ? <FullLikeIcon /> : <LikeIcon />}
                            </span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardList;
