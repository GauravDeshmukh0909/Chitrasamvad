import CallList from '@/components/CallList'
import React from 'react'

function Upcomming() {
  return (
    <section className="flex size-full flex-col gap-5 text-white">
        <h1 className='text-3xl font-bold'>
            Upcomming
        </h1>
        <CallList type="upcoming"/>
    </section>
  )
}

export default Upcomming
