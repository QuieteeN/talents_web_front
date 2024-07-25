import React, { useEffect, useState } from 'react';
import classes from './style.module.scss'
import { ReactComponent as XMarkIcon } from './../../images/xmark.svg'
import { useGetMyAllCviesQuery } from '../../app/services/cvApi';
import { ReactComponent as ArrowIcon } from './../../images/arrow.svg'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useGetVacancyByIdQuery } from '../../app/services/vacancyApi';
import { unvisibleResponseModal } from '../../app/futures/responseModalSlice';
import { useCreateResponseByStudentMutation } from '../../app/services/responseApi';
import { ModalTypes, changeInfo } from '../../app/futures/user/modalSlice';

const ModalResponse: React.FC<{ index: string }> = ({ index }) => {
    const vacancy = useGetVacancyByIdQuery({ vacancyId: index });
    const myCvies = useGetMyAllCviesQuery();
    const [createResponse] = useCreateResponseByStudentMutation();

    const responseModal = useSelector((state: any) => state.responseModal)

    const [selectedName, setSelectedName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [isVisibleAll, setIsVisibleAll] = useState<boolean>(false);
    const [isRotate, setIsRotate] = useState<boolean>(false);
    const [cvId, setCvId] = useState<number>(0);

    const dispatch = useDispatch();

    useEffect(() => {
        if ('data' in myCvies) {
            setSelectedName(myCvies.data?.cvies[0]?.name);
        }
    }, [myCvies]);

    const handleChangeVacancy = (index: number, value: string) => {
        setIsVisibleAll(!isVisibleAll);
        setSelectedName(value)
        setCvId(index);
    }

    const handleSubmit = async () => {
        try {
            const data = {
                vacancyId: index,
                cvId: cvId,
                message: message
            }
            const res = await createResponse(data);
            console.log(res);
            if ('error' in res) {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: res.error?.data?.message }));
                return;
            }
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res?.data?.message }))
            dispatch(unvisibleResponseModal());
        } catch (error: any) {
            if ('error' in error) {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: error.error?.data?.message }));
            }
            console.log(error);
        }
    }

    console.log(myCvies);

    return (
        <div className={`${classes.modal_outer} ${responseModal.visible ? classes.active : ''}`} onClick={() => dispatch(unvisibleResponseModal())}>
            <div className={`${classes.modal_inner}`} onClick={(e: any) => e.stopPropagation()}>
                <div className={classes.header}>
                    <h2>{'Отклик на вакансию'}</h2>
                    <p>{`«${vacancy?.data?.vacancy?.name}»`}</p>
                </div>
                <div className={classes.my_data}>
                    <h3>Резюме для отклика</h3>
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
                        {myCvies?.data?.cvies?.map((cv: any) =>
                            <div
                                key={cv.id}
                                className={`${classes.select_item} ${selectedName === vacancy?.name ? classes.selected : ''}`}
                                onClick={() => handleChangeVacancy(cv?.id, cv?.name)}
                            >{cv?.name}</div>
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
                    <button onClick={handleSubmit}>Откликнуться</button>
                    <button onClick={() => dispatch(unvisibleResponseModal())}>Отмена</button>
                </div>
                <span className={classes.xmark} onClick={() => dispatch(unvisibleResponseModal())}>
                    <XMarkIcon />
                </span>
            </div>
        </div >
    )
}

export default ModalResponse;