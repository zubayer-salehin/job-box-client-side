import React from 'react';
import { useSelector } from 'react-redux';
import PostedJobCard from '../../components/reusable/PostedJobCard';
import { useGetPostedJobsQuery } from '../../features/job/jobApi';

const PostJob = () => {

    const { user: { _id } } = useSelector(state => state.auth)
    const { data } = useGetPostedJobsQuery(_id, { refetchOnMountOrArgChange: true });

    return (
        <div className="p-8">
            <h3 className="text-primary text-xl font-medium mb-5">Job Posted List</h3>
            <div className="grid grid-cols-2 gap-10">
                {data?.data?.map(jobData => <PostedJobCard jobData={jobData}></PostedJobCard>)}
            </div>
        </div>
    );
};

export default PostJob;