import React, { useEffect, useState } from 'react';
import classes from './style.module.scss'
import { ReactComponent as XMarkIcon } from './../../images/xmark.svg'
import { useGetCvByIdQuery } from '../../app/services/cvApi';
import { useGetAllVacanciesQuery } from '../../app/services/vacancyApi';
import { ReactComponent as ArrowIcon } from './../../images/arrow.svg'
import { useDispatch } from 'react-redux';
import { unvisibleModal } from '../../app/futures/inviteModalSlice';
import { useSelector } from 'react-redux';
import { useCreateResponseByEmployerMutation } from '../../app/services/responseApi';
import { ModalTypes, changeInfo } from '../../app/futures/user/modalSlice';

const ModalInvite: React.FC<{ index: string }> = ({ index }) => {
    const cv = useGetCvByIdQuery({ cvId: index });
    const myVacancies = useGetAllVacanciesQuery();

    const inviteModal = useSelector((state: any) => state.inviteModal)

    const [selectedName, setSelectedName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isVisibleAll, setIsVisibleAll] = useState<boolean>(false);
    const [isRotate, setIsRotate] = useState<boolean>(false);
    const [vacancyId, setVacancyId] = useState<number>(myVacancies.data?.vacancies[0]?.id);

    const dispatch = useDispatch();

    const [createResponse] = useCreateResponseByEmployerMutation();

    useEffect(() => {
        if ('data' in myVacancies) {
            setSelectedName(myVacancies.data?.vacancies[0]?.name);
            setVacancyId(myVacancies.data?.vacancies[0]?.id);
        }
    }, [myVacancies]);

    const handleChangeVacancy = (index: number, value: string) => {
        setIsVisibleAll(!isVisibleAll);
        setSelectedName(value)
        setVacancyId(index);
    }

    const handleSubmit = async () => {
        try {
            const data = {
                vacancyId: vacancyId,
                cvId: index,
                message: message
            }
            const res = await createResponse(data);
            console.log(res);
            if ('error' in res) {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: res.error?.data?.message }));
                return;
            }
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res?.data?.message }))
            dispatch(unvisibleModal());
        } catch (error: any) {
            if ('error' in error) {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: error.error?.data?.message }));
            }
            console.log(error);
        }
    }

    console.log(myVacancies);

    return (
        <div className={`${classes.modal_outer} ${inviteModal.visible ? classes.active : ''}`} onClick={() => dispatch(unvisibleModal())}>
            <div className={`${classes.modal_inner}`} onClick={(e: any) => e.stopPropagation()}>
                <div className={classes.header}>
                    <h2>{'Приглашение по резюме'}</h2>
                    <p>{`«${cv?.data?.cv?.name}»`}</p>
                </div>
                <div className={classes.my_data}>
                    <h3>Вакансии для приглашения</h3>
                    <div className={classes.select_input} onClick={() => {
                        setIsRotate((prev: boolean) => !prev)
                        setIsVisibleAll((prev: boolean) => !prev)
                    }}>
                        <span className={classes.selected}>{selectedName}</span>
                        <span className={`${classes.icon} ${isRotate ? classes.rotate : ''}`}>
                            <ArrowIcon />
                        </span>
                    </div>
                    <div className={`${classes.all} ${isVisibleAll ? classes.active : ''}`}>
                        {myVacancies?.data?.vacancies?.map((vacancy: any) =>
                            <div className={`${classes.select_item} ${selectedName === vacancy?.name ? classes.selected : ''}`} onClick={() => handleChangeVacancy(vacancy?.id, vacancy?.name)}>{vacancy?.name}</div>
                        )}
                    </div>
                    <div className={classes.input_box}>
                        <div className={classes.label}>
                            <label htmlFor="message">Сообщение</label>
                        </div>
                        <div className={classes.input}>
                            <textarea name='message' id="message" placeholder='Сообщение' value={message} onChange={(e: any) => setMessage(e.target.value)}></textarea>
                        </div>
                    </div>
                </div>
                <div className={classes.btn_box}>
                    <button onClick={() => handleSubmit()}>Пригласить</button>
                    <button onClick={() => dispatch(unvisibleModal())}>Отмена</button>
                </div>
                <span className={classes.xmark} onClick={() => dispatch(unvisibleModal())}>
                    <XMarkIcon />
                </span>
            </div>
        </div >
    )
}

export default ModalInvite;