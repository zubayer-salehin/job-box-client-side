import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Loading from '../../components/reusable/Loading';
import { useCandidateByIdQuery } from '../../features/job/jobApi';

const CandidateDetails = () => {

    const { id } = useParams();
    const { data, isLoading } = useCandidateByIdQuery(id);
    const { firstName, lastName, email, address, country, city, gender, role, postcode } = data?.data || {};

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-full h-full flex justify-center'>
            <div className="w-1/2 h-fit mt-10 p-10 border shadow-lg rounded-xl">
                <div className='flex justify-between'>
                    <h2 className='text-xl font-medium text-primary'>Candidate Information</h2>
                    <FaUserCircle className='text-3xl text-primary' />
                </div>
                <div className='mt-5'>
                    <p className='font-medium capitalize'>Full Name : {firstName + " " + lastName}</p>
                    <p className='font-medium capitalize mt-1'>Email : {email}</p>
                    <p className='font-medium capitalize mt-1'>Country : {country}</p>
                    <p className='font-medium capitalize mt-1'>City : {city}</p>
                    <p className='font-medium capitalize mt-1'>Address : {address}</p>
                    <p className='font-medium capitalize mt-1'>Gender : {gender}</p>
                    <p className='font-medium capitalize mt-1'>Role : {role}</p>
                    <p className='font-medium capitalize mt-1'>Post Code : {postcode}</p>
                </div>
            </div>
        </div>
    );
};

export default CandidateDetails;