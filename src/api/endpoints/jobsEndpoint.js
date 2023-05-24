import { apiSlice } from "../apiSlice";

export const jobSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/jobs",
      providesTags: ["Jobs"],
    }),
    getSingleJob: builder.query({
      query: (id) => `/jobs/${id}`,
    }),
    getAllJobs: builder.query({
      query: () => `/jobs/alljobs`,
    }),
    addJob: builder.mutation({
      query: (data) => ({
        url: "/jobs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    toggleJob: builder.mutation({
      query: (data) => ({
        url: `/jobs?id=${data.id}`,
        method: "PUT",
        body: { action: data.action },
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const { useAddJobMutation } = jobSlice;
export const { useGetJobsQuery } = jobSlice;
export const { useGetAllJobsQuery } = jobSlice;
export const { useGetSingleJobQuery } = jobSlice;
export const { useToggleJobMutation } = jobSlice;
