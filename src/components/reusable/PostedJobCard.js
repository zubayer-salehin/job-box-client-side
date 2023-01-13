import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRemovePostMutation } from '../../features/job/jobApi';

const PostedJobCard = ({ jobData }) => {

    const navigate = useNavigate();
    const { _id, position, companyName, location, employmentType } =
        jobData || {};
    const [removePost] = useRemovePostMutation();

    const handleDeletePost = (id) => {
        removePost(id)
    }

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
                <p>{location}</p>
            </div>
            <div className='flex justify-between items-center mt-5'>
                <p>{employmentType}</p>
                <div>
                    <button className='btn mr-3' onClick={() => navigate(`/dashboard/apply-candidate/${_id}`)}>
                        Apply Candidate
                    </button>
                    <button onClick={() => handleDeletePost(_id)} className='px-4 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all hover:px-6 disabled:text-gray-300 disabled:border-gray-300 disabled:hover:px-4 disabled:hover:bg-transparent disabled:cursor-not-allowed'>
                        Delete Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostedJobCard;