import React, { useEffect } from "react";
import classes from './style.module.scss'
import { ReactComponent as XMarkIcon } from '../../images/xmark.svg'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { endAnimation } from "../../app/futures/user/modalSlice";

const ModalMessage: React.FC = () => {
    const modal = useSelector((state: any) => state.modal);
    const dispatch = useDispatch();

    useEffect(() => {
        if (modal.visible) {
            const timer = setTimeout(() => {
                dispatch(endAnimation());
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [modal.visible, dispatch]);

    return (
        <div className={`${classes.modal_message} ${modal.visible ? classes.visible : classes.hidden}`}>
            <div className={`${classes.left_border} ${classes[modal.type]}`}></div>
            <div className={classes.message}>{modal.message}</div>
            <span onClick={() => dispatch(endAnimation())}>
                <XMarkIcon />
            </span>
        </div>
    )
}

export default ModalMessage;