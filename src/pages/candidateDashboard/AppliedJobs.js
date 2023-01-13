import React from "react";
import { useSelector } from "react-redux";
import AppliedJobCard from "../../components/reusable/AppliedJobCard";
import Loading from "../../components/reusable/Loading";
import { useGetAppliedJobsQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
  const { user: { email } } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsQuery(email, { pollingInterval: 2000 });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-8">
      <h1 className='text-xl font-semibold pb-5 pt-7'>Applied jobs</h1>
      <div className='grid grid-cols-2 gap-5 pb-5'>
        {data?.data?.map((job) => (
          <AppliedJobCard jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
