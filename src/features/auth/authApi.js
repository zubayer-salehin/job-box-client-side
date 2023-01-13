import { getUser } from "./authSlice";
import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/user",
                body: data
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    dispatch(getUser(data.email));
                } catch (error) {
                    // kiso nai 
                }
            }
        })
    })
})

export const { useRegisterMutation } = authApi