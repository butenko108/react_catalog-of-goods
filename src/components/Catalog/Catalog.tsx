import React from 'react'
import { Filters } from '../Filters/Filters'
import { GoogList } from '../GoodsList/GoodList'

export const Catalog: React.FC = () => {
  return (
    <>
      <Filters />
      <GoogList />
    </>
  )
}
