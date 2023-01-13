import React, { useState } from 'react';
import { BsMessenger } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../components/reusable/Loading';
import { useCandidateByIdQuery, useChatInsertMutation, useGetChatByJobIdQuery } from '../../features/job/jobApi';

const ChatWithCandidate = () => {

    const { user: { role } } = useSelector(state => state.auth)
    const [messageText, setMessageText] = useState("");
    const { jobAndCandidateId } = useParams();
    const [jobId, candidateId] = jobAndCandidateId.split("-");
    const { data, isLoading } = useCandidateByIdQuery(candidateId);
    const { firstName, lastName } = data?.data || {};
    const [chatInsert] = useChatInsertMutation();
    const { data: allChat } = useGetChatByJobIdQuery(jobId, { pollingInterval: 500 });
    const candidateChat = allChat?.data?.find(c => c._id === candidateId)

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleChatText = () => {
        chatInsert({ messageText, candidateId, jobId, role });
        setMessageText("")
    }

    return (
        <div>
            <div className='w-full h-full flex justify-center'>
                <div className="w-1/2 h-fit mt-5 p-10 border shadow-lg rounded-xl">
                    <div className='flex justify-between'>
                        <h2 className='text-xl font-medium text-primary capitalize mb-5'>Chat With {firstName + " " + lastName}</h2>
                        <BsMessenger className='text-3xl text-green-500' />
                    </div>
                    <div className='border border-primary mb-2.5 rounded-sm'>
                        <div className='flex flex-col gap-2 h-96 p-2 overflow-y-auto'>
                            {candidateChat?.chat?.map(({ role, message }, count) =>
                                <div className='text-sm'>
                                    {count === 0 && <div className='ml-[25%] flex justify-end'>
                                        <div className='flex flex-col gap-0.5'>
                                            {message?.map((m) =>
                                                <div className='flex justify-end items-end'>
                                                    <p className='bg-primary text-white py-1.5 px-4 mr-1 rounded-2xl'>{m}</p>
                                                    <p className='bg-primary text-white px-3 rounded-full uppercase py-1.5 h-fit'>{role.slice(0, 1)}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>}
                                    <div>
                                        {(count > 0) ? (count % 2) === 0
                                            ?
                                            <div className='flex flex-col gap-0.5 ml-[25%]'>
                                                {message?.map((m) =>
                                                    <div className='flex justify-end items-end'>
                                                        <p className='bg-primary text-white py-1.5 px-4 mr-1 rounded-2xl'>{m}</p>
                                                        <p className='bg-primary text-white px-3 rounded-full uppercase py-1.5 h-fit'>{role.slice(0, 1)}</p>
                                                    </div>
                                                )}
                                            </div>
                                            :
                                            <div className='flex flex-col gap-0.5 mr-[25%]'>
                                                {message?.map((m) =>
                                                    <div className='flex justify-start items-end'>
                                                        <p className='bg-gray-500 text-white px-2.5 rounded-full uppercase py-1.5 mr-1 h-fit'>{role.slice(0, 1)}</p>
                                                        <p className='bg-gray-300 text-black py-1.5 px-4 rounded-2xl'>{m}</p>
                                                    </div>
                                                )}
                                            </div> : null}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex'>
                        <input onChange={(e) => setMessageText(e.target.value)} className='w-full' type="text" value={messageText} />
                        <button onClick={() => handleChatText()} className='chatSubmitBtn ml-4'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatWithCandidate;