import React from 'react'

const NbrPersone = () => {

  const nbrPersonneSelect = () => {
    const options = [];
    for(let i = 1; i <= 10; i++) {
      options.push(
      <option key={i}>
        {i}
      </option>)
    }
    return <select className=' rounded hover:bg-slate-100 cursor-pointer' name="nbrPersonne" id="nbrPersonne">{options}</select>
  }
  return (
    <div className='flex flex-col w-1/2'>
      <label htmlFor="nbrPersonne">Nombre de personne</label>
      {nbrPersonneSelect()}
    </div>
  )
}

export default NbrPersone