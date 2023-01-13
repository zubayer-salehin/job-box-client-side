import React from "react";
import JobCard from "../components/reusable/JobCard";
import { useGetJobsQuery } from "../features/job/jobApi";

const Jobs = () => {

  const { data } = useGetJobsQuery();

  return (
    <div className='w-[93%] mx-auto pt-20'>
      <h1 className="text-xl font-semibold mb-5 text-primary">All Jobs</h1>
      <div className="grid grid-cols-3 gap-10">
        {data?.data?.map(jobData => <JobCard jobData={jobData}></JobCard>)}
      </div>
    </div>
  );
};

export default Jobs;
