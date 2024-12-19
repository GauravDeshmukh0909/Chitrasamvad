import CallList from '@/components/CallList'
import React from 'react'

function PreviousRoom() {
  return (
    <section className="flex size-full flex-col gap-5 text-white">
        <h1 className='text-3xl font-bold'>
            PreviousRoom
        </h1>

        <CallList type='ended'/>

    </section>
  )
}

export default PreviousRoom
