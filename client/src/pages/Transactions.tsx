import { FC } from "react";
import TransactionForm from "../components/TransactionForm";


const Transactions: FC = () => {
    return <>
        <div className="grid grid-cols-3 gap-4 mt-4 items-start">
            {/* Add Transaction From */}
            <div className="grid col-span-2"><TransactionForm /></div>

            {/* Statistic blocks */}
            <div className="rounded-md bg-slate-800 p-3">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <p className="uppercase text-md font-bold text-center">Total income:</p>
                        <p className="bg-green-600 mt-2 rounded-sm p-1 text-center">1000€</p>
                    </div>
                    <div>
                        <p className="uppercase text-md font-bold text-center">Total expense:</p>
                        <p className="bg-red-500 mt-2 rounded-sm p-1 text-center">1000€</p>
                    </div>
                </div>
                <>Chart</>
            </div>
        </div>

        {/* Transactions table */}
        <h1 className="my-5">Table</h1>
    </>
}

export default Transactions;
 