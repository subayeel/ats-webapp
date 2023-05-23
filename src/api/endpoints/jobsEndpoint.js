import { apiSlice } from "../apiSlice";

export const jobSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/jobs",
      providesTags: ["Jobs"],
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
      invalidatesTags:["Jobs"]
    }),
  }),
});

export const { useAddJobMutation } = jobSlice;
export const { useGetJobsQuery } = jobSlice;
export const { useToggleJobMutation } = jobSlice;
