import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery:fetchBaseQuery({ 
        baseUrl: `${process.env.REACT_APP_BASE_URL}` 
    }),
    reducerPath: "AdminApi",
    tagTypes:["User","Products","Order","Customers","Transactions","Dashboard"],
    endpoints: (build) =>({
        getUser: build.query({
            query: (id) => `general/user/${id}`, 
            providesTags:["User"]
        }),
        getProducts: build.query({
            query: () => 'client/products',
            providesTags:["Products"]
        }),
        getOrder: build.query({
            query: () => 'client/order',
            providesTags:["Order"]
        }),
        getCustomers: build.query({
            query: () => 'client/customers',
            providesTags:["Customers"]
        }),
        getTransactions: build.query({
            query:({ page,pageSize,sort,search }) =>({
                url:'client/transactions',
                method:'GET',
                params:{page,pageSize,sort,search}
            }),
            providesTags:["Transactions"]
        }),
        getDashboard: build.query({
            query:() => 'general/dashboard',
            providesTags:["Dashboard"]
        })
    })
})

export const { useGetUserQuery,useGetProductsQuery,useGetOrderQuery,useGetCustomersQuery,useGetTransactionsQuery,useGetDashboardQuery } = api