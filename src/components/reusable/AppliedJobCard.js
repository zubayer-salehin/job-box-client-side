import React from 'react';
import { FaRocketchat } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AppliedJobCard = ({ jobData }) => {

    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)
    const { _id, position, companyName, employmentType, applicants } =
        jobData || {};

    const message = applicants?.find(({ _id }) => _id === user._id)
    const jobStatus = user?.selectedJobId?.includes(_id)

    return (
        <div
            key={_id}
            className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
        >
            <div className='flex justify-between  text-primary'>
                <div>
                    <p className='text-xl'>{position}</p>
                    <small className='text-primary/70 '>
                        by{" "}
                        <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
                            {companyName}
                        </span>
                    </small>
                </div>
                {
                    message?.chat.length ?
                        <button onClick={() => navigate(`/dashboard/chat-with-employer/${_id + "-" + user?._id}`)} className='h-fit'>
                            <FaRocketchat className="text-2xl text-green-500" />
                        </button>
                        :
                        <button className='h-fit'>
                            <FaRocketchat title='Chat is enable, when employer staring a message with candidate' className="text-2xl text-gray-500" />
                        </button>
                }
            </div>
            <div className='flex justify-between items-center mt-5'>
                <p>{employmentType}</p>
                <div>
                    {jobStatus ?
                        <p className='text-white px-4 py-1 bg-green-500 rounded-full'>selected</p>
                        :
                        <p className='text-white px-4 py-1 bg-yellow-500 rounded-full'>pending</p>
                    }
                </div>
            </div>
        </div >
    );
};

export default AppliedJobCard;