import { FC } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form } from 'react-router-dom'

const TransactionForm: FC = () => {
  return (
    <div className='rounded-md bg-slate-800 p-4'>
      <Form className='grid gap-2'
        method='post'
        action='/transactions'
      >
        <label className='grid' htmlFor="title">
            <span>Title</span>
            <input type="text" className='input border-slate-700' placeholder='Title...' name='title' required />
        </label>
        <label className='grid' htmlFor="amount">
            <span>Amount</span>
            <input type="number" className='input border-slate-700 ' placeholder='Amount...' name='amount' required />
        </label>

        {/* Select */}
        <label htmlFor="category" className='grid'>
            <span>Category</span>
            <select name="category" className='input border-slate-700' required>
                <option value="1">Salary</option>
                <option value="2">Gift</option>
                <option value="3">Grossery</option>

            </select>
        </label>

        {/* Add category */}
        <button
          className="max-w-fit mt-2 flex items-center gap-2 text-white/50 hover:text-white "
        //   onClick={() => setVisibleModal(true)}
        >
          <FaPlus />
          <span>Manage categories</span>

        </button>

        {/* Rdio buttons */}
        <div className="flex gap-4 items-center">
            <label className='flex cursor-pointer items-center gap-2'>
                <input type="radio" name='type' value={'income'} className='form-radio text-blue-600' />
                <span>Income</span>
            </label>
            <label className='flex cursor-pointer items-center gap-2'>
                <input type="radio" name='type' value={'expense'} className='form-radio text-blue-600' />
                <span>Expense</span>
            </label>
        </div>

        {/* Submit button */}
        <button className='btn btn-green max-w-fit mt-2'>Submit</button>

      </Form>
    </div>
  )
}

export default TransactionForm
