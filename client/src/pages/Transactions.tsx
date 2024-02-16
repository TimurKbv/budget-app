import { FC } from "react";
import TransactionForm from "../components/TransactionForm";
import { instance } from "../api/axios.api";
import { ICategory, IResponseTransactionLoader, ITransaction } from "../types/types";
import { toast } from "react-toastify";
import TransationsTable from "../components/TransationsTable";
import { useLoaderData } from "react-router-dom";
import { formatToUSD } from "../helper/currency.helper";
import Chart from "../components/Chart";

export const transactionLoader = async () => {
    const categories = await instance.get<ICategory[]>('/categories')
    const transactions = await instance.get<ITransaction[]>('/transactions')
    const totalIncome = await instance.get<number>('/transactions/income/find')
    const totalExpense = await instance.get<number>('/transactions/expense/find')
        
    const data = {
        categories: categories.data,
        transactions: transactions.data,
        totalIncome: totalIncome.data,
        totalExpense: totalExpense.data
    }
    return data
}
export const transactionAction = async ({ request }: any) => {
    switch (request.method) {
        case 'POST': {
            const formData = await request.formData()
            const newTransation = {
                title: formData.get('title'),
                amount: Number(formData.get('amount')),
                category: formData.get('category'),
                type: formData.get('type')
            }
            await instance.post('/transactions', newTransation)
            toast.success('Transaction added.')
            return null
        }
        case 'DELETE': {
            const formData = await request.formData()
            const transactionId = formData.get('id')
            await instance.delete(`/transactions/transaction/${transactionId}`)
            toast.success('Transaction deleted')
        }
        return null
    }
}

const Transactions: FC = () => {
    const { totalIncome, totalExpense } = useLoaderData() as IResponseTransactionLoader
    
    return <>
        <div className="grid grid-cols-3 gap-4 mt-4 items-start">
            {/* Add Transaction From */}
            <div className="grid col-span-2"><TransactionForm /></div>

            {/* Statistic blocks */}
            <div className="rounded-md bg-slate-800 p-3">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <p className="uppercase text-md font-bold text-center">Total income:</p>
                        <p className="bg-green-600 mt-2 rounded-sm p-1 text-center">
                            {formatToUSD.format(totalIncome)}
                        </p>
                    </div>
                    <div>
                        <p className="uppercase text-md font-bold text-center">Total expense:</p>
                        <p className="bg-red-500 mt-2 rounded-sm p-1 text-center">
                        {formatToUSD.format(totalExpense)}
                        </p>
                    </div>
                </div>
                <Chart totalExpense={totalExpense} totalIncome={totalIncome} />
                <>Chart</>
            </div>
        </div>

        {/* Transactions table */}
        <h1 className="my-5"> <TransationsTable limit={5} /> </h1>
    </>
}

export default Transactions;
 