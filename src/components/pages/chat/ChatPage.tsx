import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import ModalMessage from "../../modalMessage/ModalMessage";
import classes from './style.module.scss'
import { Params, useNavigate, useParams } from "react-router-dom";

import { ReactComponent as ChatIcon } from './../../../images/chat.svg'
import { ReactComponent as CheckIcon } from './../../../images/checkSecond.svg';
import { ReactComponent as SendIcon } from './../../../images/send.svg';
import { ReactComponent as XMark } from './../../../images/xmark.svg';
import { useCreateMessageEmployerMutation, useCreateMessageMutation, useGetMessagesQuery, useGetMessagesStudentQuery, useGetResponsesForEmployerQuery, useGetResponsesForStudentQuery, useMarkMessagesAsReadMutation } from "../../../app/services/responseApi";
import { getDate, getTime } from "../../../utils";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";
import { ModalTypes, changeInfo } from "../../../app/futures/user/modalSlice";

const ChatPage: React.FC = () => {

    const params: Readonly<Params<string>> = useParams()

    const Content: React.FC = () => {
        switch (params.userType) {
            case 'student':
                return <StudentChat />
            case 'employer':
                return <EmployerChat />
            default:
                return <StudentChat />
        }
    }

    const ChatContentStudent: React.FC<{ responses: any }> = ({ responses }) => {
        const params: Readonly<Params<string>> = useParams()
        const [text, setText] = useState<string>('');
        const dispatch = useDispatch();

        const response = useGetMessagesStudentQuery({ responseId: params.chatId })
        const [createMessage] = useCreateMessageMutation();
        const [markMessages] = useMarkMessagesAsReadMutation();

        useEffect(() => {
            markMessages({ responseId: params.chatId })
        }, [markMessages, params.chatId]);

        console.log(response);

        const handleSubmitMessage = async () => {
            try {
                if (text === '') {
                    dispatch(changeInfo({ type: ModalTypes.WARNING, message: 'Сообщение не должно быть пустым' }))
                    return;
                }

                const data = {
                    content: text,
                    responseId: params.chatId
                }
                const res = await createMessage(data);
                console.log(res);
                response.refetch();
                responses.refetch()
            } catch (error: any) {
                console.log(error);
            }
        }

        return (
            <>
                {response.isLoading ?
                    <div className={classes.loading_box}>
                        <ReactLoading type='spinningBubbles' color='#3B26B6' height={'10%'} width={'10%'} />
                    </div> :
                    <div className={classes.messages}>
                        <div className={classes.header}>
                            <div className={classes.student_info}>
                                <div className={classes.logo}>
                                    {response?.data?.response?.vacancy?.employer?.info?.logoUrl ?
                                        <img src={`http://localhost:5000${response?.data?.response?.vacancy?.employer?.info?.logoUrl}`} alt="" /> :
                                        <span>{response?.data?.response?.vacancy?.employer?.info?.companyName[0]}</span>
                                    }
                                </div>
                                <div className={classes.chat_info}>
                                    <div className={classes.label}>
                                        <h3>{`${response?.data?.response?.vacancy?.employer?.info?.companyName}`}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.cv_info}>
                                <p>{`Вакансия: `} <a href={`../../../vacancy/${response?.data?.response?.vacancy?.id}`}>{response?.data?.response?.vacancy?.name}</a></p>
                            </div>
                        </div>
                        <div className={classes.messages_info}>
                            {response?.data?.response?.messages.map((message: any) =>
                                message?.senderId === response?.data?.response?.cv?.student?.id ?
                                    <div className={classes.self_message_container} key={message.id}>
                                        <div className={classes.message}>
                                            <pre>{message?.content}</pre>
                                            <span className={classes.date}>{getTime(message?.createdAt)}</span>
                                            <span className={`${classes.read_icon} ${message?.status === 'прочитано' ? classes.read : ''}`}>
                                                <CheckIcon />
                                            </span>
                                        </div>
                                    </div> :
                                    <div className={classes.message_container} key={message.id}>
                                        <div className={classes.message_logo}>
                                            <span>{`${response?.data?.response?.vacancy?.employer?.name[0]}${response?.data?.response?.vacancy?.employer?.surname[0]}`}</span>
                                        </div>
                                        <div className={classes.message}>
                                            <span className={classes.name}>{response?.data?.response?.vacancy?.employer?.name}</span>
                                            <pre>{message?.content}</pre>
                                            <span className={classes.date}>{getTime(message?.createdAt)}</span>
                                        </div>
                                    </div>
                            )}
                        </div>
                        <div className={classes.footer}>
                            <div className={classes.footer_logo}>
                                <span>{`${response?.data?.response?.cv?.student?.name[0]}${response?.data?.response?.cv?.student?.surname[0]}`}</span>
                            </div>
                            <div className={classes.input}>
                                <input
                                    placeholder={response?.data?.response?.status !== "приглашение" ? 'Вас пока не пригласили' : 'Сообщение'}
                                    type="text"
                                    value={text}
                                    autoComplete="off"
                                    onChange={(e) => setText(e.target.value)}
                                    disabled={response?.data?.response?.status !== "приглашение"}
                                />
                            </div>
                            <div className={classes.btn_box}>
                                <button onClick={handleSubmitMessage}>
                                    <SendIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }

    const ChatContentEmployer: React.FC<{ responses: any }> = ({ responses }) => {
        const params: Readonly<Params<string>> = useParams()
        const [text, setText] = useState<string>('');
        const dispatch = useDispatch();

        const response = useGetMessagesQuery({ responseId: params.chatId })
        const [createMessage] = useCreateMessageMutation();
        const [markMessages] = useMarkMessagesAsReadMutation();
        const [createInvation] = useCreateMessageEmployerMutation();

        useEffect(() => {
            markMessages({ responseId: params.chatId })
        }, [markMessages, params.chatId]);

        console.log(response);

        const handleSubmitInvation = async (status: string) => {
            try {
                if (text === '') {
                    dispatch(changeInfo({ type: ModalTypes.WARNING, message: 'Сообщение не должно быть пустым' }))
                    return;
                }

                const data = {
                    content: text,
                    responseId: params.chatId,
                    status
                }
                const res = await createInvation(data);
                console.log(res);
                response.refetch();
                responses.refetch()
            } catch (error: any) {
                console.log(error);
            }
        }

        const handleSubmitMessage = async () => {
            try {
                if (text === '') {
                    dispatch(changeInfo({ type: ModalTypes.WARNING, message: 'Сообщение не должно быть пустым' }))
                    return;
                }

                const data = {
                    content: text,
                    responseId: params.chatId
                }
                const res = await createMessage(data);
                console.log(res);
                response.refetch();
                responses.refetch()
            } catch (error: any) {
                console.log(error);
            }
        }

        return (
            <>
                {response.isLoading ?
                    <div className={classes.loading_box}>
                        <ReactLoading type='spinningBubbles' color='#3B26B6' height={'10%'} width={'10%'} />
                    </div> :
                    <div className={classes.messages}>
                        <div className={classes.header}>
                            <div className={classes.student_info}>
                                <div className={classes.logo}>
                                    {response?.data?.response?.cv?.student?.info?.photoUrl ?
                                        <img src="" alt="" /> :
                                        <span>{response?.data?.response?.cv?.name[0]}</span>
                                    }
                                </div>
                                <div className={classes.chat_info}>
                                    <div className={classes.label}>
                                        <h3>{`${response?.data?.response?.cv?.student?.name} ${response?.data?.response?.cv?.student?.surname}`}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.cv_info}>
                                <p>{`Резюме: `} <a href={`../../../cv/${response?.data?.response?.cv?.id}`}>{response?.data?.response?.cv?.name}</a></p>
                            </div>
                        </div>
                        <div className={classes.messages_info}>
                            {response?.data?.response?.messages.map((message: any) =>
                                message?.senderId === response?.data?.response?.vacancy?.employer?.id ?
                                    <div className={classes.self_message_container}>
                                        <div className={classes.message}>
                                            <pre>{message?.content}</pre>
                                            <span className={classes.date}>{getTime(message?.createdAt)}</span>
                                            <span className={`${classes.read_icon} ${message?.status === 'прочитано' ? classes.read : ''}`}>
                                                <CheckIcon />
                                            </span>
                                        </div>
                                    </div> :
                                    <div className={classes.message_container}>
                                        <div className={classes.message_logo}>
                                            <span>{`${response?.data?.response?.cv?.student?.name[0]}${response?.data?.response?.cv?.student?.surname[0]}`}</span>
                                        </div>
                                        <div className={classes.message}>
                                            <span className={classes.name}>{response?.data?.response?.cv?.student?.name}</span>
                                            <pre>{message?.content}</pre>
                                            <span className={classes.date}>{getTime(message?.createdAt)}</span>
                                        </div>
                                    </div>
                            )}
                        </div>
                        <div className={classes.footer}>
                            <div className={classes.footer_logo}>
                                <span>{`${response?.data?.response?.vacancy?.employer?.name[0]}${response?.data?.response?.vacancy?.employer?.surname[0]}`}</span>
                            </div>
                            <div className={classes.input}>
                                <input
                                    placeholder="Сообщение"
                                    type="text"
                                    value={text}
                                    autoComplete="off"
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>
                            <div className={classes.btn_box}>
                                {response?.data?.response?.status !== "приглашение" ?
                                    <>
                                        <button onClick={() => handleSubmitInvation('приглашение')}>
                                            <CheckIcon />
                                        </button>
                                        <button onClick={() => handleSubmitInvation('не посмотрено')}>
                                            <XMark />
                                        </button>
                                    </> :
                                    <button onClick={handleSubmitMessage}>
                                        <SendIcon />
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }

    const StudentChat: React.FC = () => {
        const responses = useGetResponsesForStudentQuery();
        const params: Readonly<Params<string>> = useParams()

        const navigate = useNavigate();

        console.log(responses)

        return (
            <div className={classes.chat_info}>
                <h2>Чаты</h2>
                <div className={classes.chats_container}>
                    <div className={classes.chats}>
                        {responses?.data?.responses.map((response: any) =>
                            <div className={`${classes.chat_item} ${params.chatId === response.id ? classes.active : ''}`} key={response.id} onClick={() => navigate(`/student/chat/${response?.id}`)}>
                                <div className={classes.logo}>
                                    {response?.vacancy?.employer?.info?.logoUrl ?
                                        <img src={`http://localhost:5000${response?.vacancy?.employer?.info?.logoUrl}`} alt="" /> :
                                        <span>{response?.vacancy?.name[0]}</span>
                                    }
                                </div>
                                <div className={classes.chat_info}>
                                    <div className={classes.label}>
                                        <h3>{response?.vacancy?.name}</h3>
                                        <span>{getDate(response?.messages?.[0]?.createdAt)}</span>
                                    </div>
                                    <p>
                                        <span>{`${response?.vacancy?.employer?.name} ${response?.vacancy?.employer?.surname}`}</span>
                                    </p>
                                    <div className={classes.message}>
                                        <span
                                            className={`${classes.status} ${response?.status === 'приглашение' ?
                                                classes.invite : classes.response}`}>
                                        </span>
                                        {response?.messages?.[0]?.content}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={classes.chat}>
                        {!params.chatId ?
                            <div className={classes.chat_content}>
                                <div className={classes.chat_icon}>
                                    <span className={classes.icon}>
                                        <ChatIcon />
                                    </span>
                                </div>
                                <p>Выберите чат, чтобы начать общение</p>
                            </div>
                            : <ChatContentStudent responses={responses} />
                        }
                    </div>
                </div>
            </div>
        )
    }

    const EmployerChat: React.FC = () => {
        const responses = useGetResponsesForEmployerQuery();

        const navigate = useNavigate();

        console.log(responses)

        return (
            <div className={classes.chat_info}>
                <h2>Чаты</h2>
                <div className={classes.chats_container}>
                    <div className={classes.chats}>
                        {responses?.data?.responses.map((response: any) =>
                            <div className={classes.chat_item} key={response.id} onClick={() => navigate(`/employer/chat/${response?.id}`)}>
                                <div className={classes.logo}>
                                    {response?.cv?.student?.info?.photoUrl ?
                                        <img src="" alt="" /> :
                                        <span>{response?.cv?.name[0]}</span>
                                    }
                                </div>
                                <div className={classes.chat_info}>
                                    <div className={classes.label}>
                                        <h3>{response?.cv?.name}</h3>
                                        <span>{getDate(response?.messages?.[0]?.createdAt)}</span>
                                    </div>
                                    <p>
                                        <span>{`${response?.cv?.student?.name} ${response?.cv?.student?.surname}`}</span>
                                    </p>
                                    <div className={classes.message}>
                                        <span
                                            className={`${classes.status} ${response?.status === 'приглашение' ?
                                                classes.invite : response?.status === 'не посмотрено' ?
                                                    classes.response : classes.no}`}>
                                        </span>
                                        {response?.messages?.[0]?.content}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={classes.chat}>
                        {!params.chatId ?
                            <div className={classes.chat_content}>
                                <div className={classes.chat_icon}>
                                    <span className={classes.icon}>
                                        <ChatIcon />
                                    </span>
                                </div>
                                <p>Выберите чат, чтобы начать общение</p>
                            </div>
                            : <ChatContentEmployer responses={responses} />
                        }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <Header />
            <main className={classes.content}>
                <div className={classes.container}>
                    <Content />
                </div>
            </main>
            <ModalMessage />
        </>
    )
}

export default ChatPage;