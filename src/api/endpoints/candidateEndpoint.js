import { apiSlice } from "../apiSlice";

export const candidateSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCandidates: builder.query({
      query: () => "/candidate",
      providesTags: ["Candidate"],
    }),
    getSingleCandidate: builder.query({
      query: (id) => `/candidate/${id}`,
    }),
    updateJobStatus: builder.mutation({
      query: (data) => ({
        url: `/candidate/updatestatus?id=${data.id}`,
        method: "PUT",
        body: { status: data.status, jobId: data.jobId },
      }),
      invalidatesTags: ["Candidate"],
    }),
    getCurrentCandidate: builder.query({
      query: () => `/candidate/currentcandidate`,
    }),
  }),
});

export const { useGetCandidatesQuery } = candidateSlice;
export const { useGetSingleCandidateQuery } = candidateSlice;
export const { useGetCurrentCandidateQuery } = candidateSlice;
export const { useUpdateJobStatusMutation } = candidateSlice;
