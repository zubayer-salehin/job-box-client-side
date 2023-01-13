import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        postJob: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/job",
                body: data
            }),
            invalidatesTags: ["Jobs"]
        }),
        apply: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/apply",
                body: data
            })
        }),
        question: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/query",
                body: data
            }),
            invalidatesTags: ["Job"]
        }),
        reply: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/reply",
                body: data
            }),
            invalidatesTags: ["Job"]
        }),
        chatInsert: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/chat",
                body: data
            })
        }),
        selectCandidate: builder.mutation({
            query: (data) => ({
                method: "PATCH",
                url: "/selected-candidate",
                body: data
            }),
            invalidatesTags: ["CandidateInfo"]
        }),
        getAppliedJobs: builder.query({
            query: (email) => ({
                url: `/applied-jobs/${email}`
            })
        }),
        getPostedJobs: builder.query({
            query: (id) => ({
                url: `/posted-jobs/${id}`
            }),
            providesTags: ["postedJob"]
        }),
        getApplyCandidate: builder.query({
            query: (jobId) => ({
                url: `/apply-candidates/${jobId}`
            }),
            providesTags: ["CandidateInfo"]
        }),
        getJobs: builder.query({
            query: () => ({
                url: "/jobs"
            }),
            providesTags: ["Jobs"]
        }),
        jobById: builder.query({
            query: (id) => ({
                url: `/job/${id}`
            }),
            providesTags: ["Job"]
        }),
        candidateById: builder.query({
            query: (id) => ({
                url: `/candidate-details/${id}`
            })
        }),
        getChatByJobId: builder.query({
            query: (jobId) => ({
                url: `/chat/${jobId}`
            })
        }),
        removePost: builder.mutation({
            query: (id) => ({
                method: "DELETE",
                url: `/deletePost/${id}`
            }),
            invalidatesTags: ["postedJob"]
        })
    })
})

export const { usePostJobMutation, useGetJobsQuery, useJobByIdQuery, useApplyMutation, useGetAppliedJobsQuery, useQuestionMutation, useReplyMutation, useGetPostedJobsQuery, useGetApplyCandidateQuery, useCandidateByIdQuery, useRemovePostMutation, useChatInsertMutation, useGetChatByJobIdQuery, useSelectCandidateMutation } = jobApi;