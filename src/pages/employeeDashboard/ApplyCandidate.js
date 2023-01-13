import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/reusable/Loading';
import { useGetApplyCandidateQuery, useSelectCandidateMutation } from '../../features/job/jobApi';
import { FaRocketchat } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import { BiSelectMultiple } from "react-icons/bi";


const ApplyCandidate = () => {

    const { jobId } = useParams();
    const { data, isLoading } = useGetApplyCandidateQuery(jobId);
    const navigate = useNavigate();
    const [selectCandidate] = useSelectCandidateMutation();

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleSelectedCandidate = (id) => {
        selectCandidate({ userId: id, jobId });
    }

    return (
        <div class='flex flex-col justify-center items-center h-full w-full '>
            <div class='w-11/12 max-w-7xl mx-auto rounded-lg  bg-white shadow-lg border border-gray-200'>
                <header class='px-5 py-4 border-b border-gray-100'>
                    <div class='font-semibold text-gray-800'>Candidate List</div>
                </header>

                <div class='overflow-x-auto p-3'>
                    <table class='table-auto w-full'>
                        <thead class='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                            <tr>
                                <th>#</th>
                                <th class='p-3'>
                                    <div class='font-semibold text-left'>Name</div>
                                </th>
                                <th class='p-3'>
                                    <div class='font-semibold text-left'>Email</div>
                                </th>
                                <th class='p-3'>
                                    <div class='font-semibold text-left'>Gender</div>
                                </th>
                                <th class='p-3'>
                                    <div class='font-semibold text-left'>Country</div>
                                </th>

                                <th class='p-3'>
                                    <div class='font-semibold text-center'>Status</div>
                                </th>
                                <th class='p-3'>
                                    <div class='font-semibold text-center'>Message</div>
                                </th>
                                <th class='p-3'>
                                    <div class='font-semibold text-center'>Details</div>
                                </th>
                            </tr>
                        </thead>

                        <tbody class='text-sm divide-y divide-gray-100'>
                            {data?.data?.map(({ email, gender, country, firstName, lastName, _id, selectedJobId }, count) => (
                                <tr>
                                    <td>
                                        {count + 1}
                                    </td>
                                    <td class='p-3'>
                                        <div class='font-medium text-gray-800'>{firstName + " " + lastName}</div>
                                    </td>
                                    <td class='p-3'>
                                        <div class='text-left'>{email}</div>
                                    </td>
                                    <td class='p-3'>
                                        <div class='text-left capitalize'>
                                            {gender}
                                        </div>
                                    </td>
                                    <td class='p-3'>
                                        <div class='text-left font-medium text-primary'>
                                            {country}
                                        </div>
                                    </td>
                                    <td class='p-3'>
                                        <div class='flex justify-center'>
                                            {selectedJobId.includes(jobId) ?
                                                <span className='px-4 py-2 bg-green-500 text-white rounded-full'>Selected</span>
                                                :
                                                <button onClick={() => handleSelectedCandidate(_id)} className='btn flex items-center'>
                                                    <BiSelectMultiple className='text-xl text-green-500 mr-1' />
                                                    Selected
                                                </button>}
                                        </div>
                                    </td>
                                    <td class='p-3'>
                                        <div class='flex justify-center'>
                                            <button onClick={() => navigate(`/dashboard/chat-with-candidate/${jobId + "-" + _id}`)}>
                                                <FaRocketchat className="text-lg text-green-500" />
                                            </button>
                                        </div>
                                    </td>
                                    <td class='p-3'>
                                        <div class='flex justify-center'>
                                            <button onClick={() => navigate(`/dashboard/candidate-details/${_id}`)}>
                                                <BsInfoCircleFill className="text-lg text-blue-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ApplyCandidate;