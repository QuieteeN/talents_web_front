import React, { useState } from "react";
import classes from './styles.module.scss'
import { getExperience, getStringSalary } from "../../utils";
import { ReactComponent as LikeIcon } from '../../images/likeIcon.svg'
import { ReactComponent as FullLikeIcon } from '../../images/fullLike.svg'
import { useNavigate } from "react-router-dom";
import { useToggleLikeCvMutation } from "../../app/services/favoriteApi";

interface IProps {
    cards: any[],
    type: string
}

interface ICardProps {
    card: any,
    type: string
}

const CVList: React.FC<IProps> = ({ cards, type }) => {
    const [cardStates, setCardStates] = useState<any[]>(cards);

    const [toggleLikeCv] = useToggleLikeCvMutation();

    const likeCv = async (event: React.MouseEvent<HTMLDivElement>, cardId: number) => {
        event.stopPropagation();

        try {
            const response = await toggleLikeCv({ cvId: cardId });
            if ('data' in response) {
                setCardStates(prevStates => prevStates.map(card =>
                    card.id === cardId ? { ...card, isLiked: !card.isLiked } : card
                ));
            } else {
                console.error('Failed to like the cv');
            }
        } catch (error) {
            console.error('An error occurred while liking the cv', error);
        }
    }

    const Card: React.FC<ICardProps> = ({ card, type }) => {
        // const [isLiked, setIsLiked] = useState(card.isLiked ? true : false);

        const navigate = useNavigate();

        const navig = (index: number) => {
            switch (type) {
                case 'all':
                    navigate(`/cv/${index}`);
                    break;
                case 'self':
                    navigate(`./../${index}/info`);
                    break
                default:
                    navigate(`/cv/${index}`);
                    break
            }
        }

        return (
            <div className={classes.cv__container}>
                <h3 className={classes.cv__header} onClick={() => navig(card.id)}>
                    {card.name}
                </h3>
                {card?.salary && <p className={classes.cv__salary}>{getStringSalary(card?.salary)}</p>}
                {/* <div className={classes.cv__status}>{card.status}</div> */}
                <div className={classes.cv__add__info}>
                    <span className={classes.label}>Опыт работы</span>
                    <span className={classes.info}>{getExperience(card?.experience)}</span>
                </div>
                <div className={classes.cv__add__info}>
                    <span className={classes.label}>Город</span>
                    <div className={classes.info}>{card?.city}</div>
                </div>
                {
                    type !== "self" &&
                    <div className={classes.cv__footer} onClick={() => navig(card.id)}>
                        <button className={classes.invite}>Пригласить</button>
                        <div
                            className={classes.cv__icon}
                            onClick={(event) => likeCv(event, card.id)}
                        >
                            {card.isLiked ? <FullLikeIcon /> : <LikeIcon />}
                        </div>
                    </div>
                }
            </div>
        )
    }

    return (
        <div className={classes.cvs__container}>
            {cardStates.map((card, index) => (
                <Card card={card} key={index} type={type} />
            ))}
        </div>
    )
}

export default CVList;