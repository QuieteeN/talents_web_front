import React, { useEffect, useState } from "react";
import classes from './../style.module.scss'
import { Params, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetMyCvByIdQuery, useUpdateLicenseCategoriesMutation } from "../../../../app/services/cvApi";
import { ModalTypes, changeInfo } from "../../../../app/futures/user/modalSlice";
import ReactLoading from "react-loading";

const categories = ['A', 'B', 'C', 'D', 'E', 'BE', 'CE', 'DE', 'TM', 'TB'];

const RedactLiscense: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const params: Readonly<Params<string>> = useParams()

    const cv = useGetMyCvByIdQuery({ cvId: params.cvId });

    useEffect(() => {
        if ('data' in cv) {
            const licenses = cv.data?.cv?.licenseCategories.map((license: any) => license.code);
            console.log(licenses)
            setSelectedCategories(licenses || []);
        }
    }, [cv]);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prevSelected =>
            prevSelected.includes(category)
                ? prevSelected.filter(c => c !== category)
                : [...prevSelected, category]
        );
    };

    const [updateData] = useUpdateLicenseCategoriesMutation();

    const handleSubmit = async () => {
        try {
            const data = {
                selectedCategories: selectedCategories,
                cvId: params.cvId,
            }
            const res = await updateData(data);
            console.log(res);
            cv.refetch();
            dispatch(changeInfo({ type: ModalTypes.SUCCESS, message: res.data.message }))
        } catch (error: any) {
            if ('data' in error) {
                dispatch(changeInfo({ type: ModalTypes.ERROR, message: error.data.message }));
            }
            console.error('Error updating company info:', error.data.message);
        }
    }

    return (
        <div className={classes.redact_content}>
            <h1>Ключевые навыки</h1>
            <span className={classes.return} onClick={() => navigate('./../info')}>Вернуться к резюме</span>
            {cv.isLoading ? <ReactLoading type='spinningBubbles' color='#3B26B6' height={'20%'} width={'20%'} /> :
                <div className={classes.form_content}>
                    <div className={classes.form}>
                        <div className={`${classes.input_box} ${classes.align_start}`}>
                            <div className={classes.label}>
                                <label>Категории прав</label>
                            </div>
                            <div className={`${classes.input} ${classes.row}`}>
                                {categories.map(category => (
                                    <span
                                        key={category}
                                        className={`${classes.category} ${selectedCategories.includes(category) ? classes.selected : ''}`}
                                        onClick={() => toggleCategory(category)}
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={classes.btn_box}>
                            <button
                                className={`${classes.btn} ${classes.first}`}
                                onClick={handleSubmit}
                            >
                                Сохранить
                            </button>
                            <button className={classes.btn} onClick={() => navigate('./../info')}>
                                Отмена
                            </button>
                        </div>
                    </div>
                    <div className={classes.information}>
                        <p>Укажите ваши настоящие данные.</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default RedactLiscense;