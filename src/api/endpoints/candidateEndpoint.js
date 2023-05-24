import { apiSlice } from "../apiSlice";

export const candidateSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCandidates: builder.query({
      query: () => "/jobs",
      providesTags: ["Jobs"],
    }),
    getCurrentCandidate: builder.query({
        
      query: () => `/candidate/currentcandidate`,
    }),
  }),
});

export const { useGetCandidatesQuery } = candidateSlice;
export const { useGetCurrentCandidateQuery } = candidateSlice;
