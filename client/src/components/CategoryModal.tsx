import { FC } from 'react'
import { Form } from 'react-router-dom'

interface ICategoryModal {
    type: 'post' | 'patch'
    id?: number
    setVisibleModal: (visible: boolean) => void
}

const CategoryModal: FC<ICategoryModal> = ({ type, setVisibleModal, id }) => {


  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center'>
      <Form 
        action='/categories'
        method={type}
        onSubmit={() => setVisibleModal(false)}
        className='flex flex-col gap-2 w-[300px] p-5 bg-slate-900 rounded-md'
      >
        <label htmlFor="">
            <small>Category Title</small>
            <input className='input w-full' type="text" name='title' placeholder='Title... ' autoFocus={true} />
            <input type="hidden" value={id} name='id' />
        </label>

        <div className='flex items-center gap-2'>
            <button className='btn btn-green' type='submit'>
                { type === 'patch' ? 'Save' : 'Create' }
            </button>
            <button onClick={() => setVisibleModal(false)} className='btn btn-red'>Close</button>
        </div>
      </Form>
    </div>
  )
}

export default CategoryModal
