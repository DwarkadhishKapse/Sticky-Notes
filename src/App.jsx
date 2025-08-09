import React, { useState } from 'react'
import './App.css'
import { IoAdd, IoEllipsisHorizontal, IoSettingsOutline, IoClose, IoSearch, IoCheckmark, IoList, IoTrash } from 'react-icons/io5'
import Btn from './components/Btn'

const App = () => {

  const blankNote = {
    text: '',
    createdon: null,
    bgcolor: '#feff9c',
    view: true,
    options: false
  }

  const colorArr = ['#feff9b', '#fff742', '#7afcff', '#ff65a4', '#ff7eb9', '#e4eefe', '#d2ccf4', '#c8a8d7']
  const [notes, setNotes] = useState([])
  const [listview, setListview] = useState(true)
  const [search, setSearch] = useState('')
  const [filternotes, setFilternotes] = useState([])

  const addNote = (val) => {
    let newNotes = [...notes]
    val.createdon = (new Date()).toDateString()
    newNotes.push(val)
    setNotes(newNotes)
  }

  const updateNote = (val, i) => {
    let newNotes = [...notes]
    newNotes[i].text = val
    setNotes(newNotes)
  }

  const updateColor = (val, i) => {
    let newNotes = [...notes]
    newNotes[i].bgcolor = val
    setNotes(newNotes)
  }

  const updateView = (i) => {
    let newNotes = [...notes]
    newNotes[i].view = !newNotes[i].view
    setNotes(newNotes)
  }

  const updateOpt = (i) => {
    let newNotes = [...notes]
    newNotes[i].options = !newNotes[i].options
    setNotes(newNotes)
  }

  const searchNote = () =>{
    let newNotes = [...notes]
    let filterData = newNotes.filter(x => x.text.includes(search))
    setFilternotes(filterData)
  }

  const deleteNote = (index) =>{
    let newNotes = [...notes]
    newNotes.splice(index, 1)
    setNotes(newNotes)
  }

  return (
    <div className="flex p-5 flex-row">
      <div className={`noteslist ${listview ? `scale-100 w-[280px] h-full mr-2 bg-[#f1f1f1] border` : `scale-0 w-[0px] h-0`} flex-shrink-0 rounded overflow-hidden transition-all linear duration-700`}>
        <div className="toolbar flex justify-between bg-black/10 items-center">
          <Btn click={() => addNote(blankNote)} icon={<IoAdd size={20}></IoAdd>}/>
          <div className='flex'>
            <Btn click={() => addNote()} icon={<IoSettingsOutline size={18}></IoSettingsOutline>}/>
            <Btn click={() => setListview(listview)} icon={<IoClose size={20}></IoClose>}/>
          </div>
        </div>
        <h1 className='text-2xl p-2'>Sticky Notes</h1>
        <div className="flex m-2 bg-slate-300 justify-center items-center">
          <input value={search} onChange={(e) => setSearch(e.target.value)} className='bg-transparent w-full p-1 focus-visible:outline-none' type="text" placeholder='Search...'/>
          <Btn click={() => searchNote()} icon={<IoSearch size={20}></IoSearch>}/>
        </div>
        {search == '' && notes.length > 0 && notes.map((x, i)=> {
          return <div className="m-2 relative cursor-pointer" onClick={() => updateView(i)}>
            <div className={`noteview ${x.view ? 'active' : ''} flex flex-col w-full p-2`} style={{backgroundColor:`${x.bgcolor}`}}>
              <div className="flex justify-end">
                <span className="text-xs">{x.createdon}</span>
              </div>
              <textarea value={x.text} readOnly placeholder='Take a note...' className='w-full cursor-pointer bg-transparent resize-none focus-visible:outline-none' name="" id=""></textarea>
            </div>
          </div>
        })}
        {search != '' && filternotes.length > 0 && filternotes.map((x, i)=> {
          return <div className="m-2 relative cursor-pointer" onClick={() => updateView(i)}>
            <div className={`noteview ${x.view ? 'active' : ''} flex flex-col w-full p-2`} style={{backgroundColor:`${x.bgcolor}`}}>
              <div className="flex justify-end">
                <span className="text-xs">{x.createdon}</span>
              </div>
              <textarea value={x.text} readOnly placeholder='Take a note...' className='w-full cursor-pointer bg-transparent resize-none focus-visible:outline-none' name="" id=""></textarea>
            </div>
          </div>
        })}
      </div>
      <div className="notesview w-full">
        {notes.length > 0 && notes.map((x, i)=> {
          if(x.view){
            return <div className="flex flex-col rounded overflow-hidden w-[400px] pb-1 mb-2" style={{backgroundColor:`${x.bgcolor}`}}>
              <div className="toolbar flex justify-between bg-black/10 items-center">
                <Btn click={() => addNote(blankNote)} icon={<IoAdd size={20}></IoAdd>}/>
                <div className='flex'>
                  <Btn click={() => updateOpt(i)} icon={<IoEllipsisHorizontal size={18}></IoEllipsisHorizontal>}/>
                  <Btn click={() => updateView(i)} icon={<IoClose size={20}></IoClose>}/>
                </div>
              </div>
              {x.options && 
              <div className="toolarea flex flex-col bg-gray-100">
              <div className='colorarea w-full flex'>
                {colorArr.map((color, cindex) => {
                  return <span onClick={() => updateColor(color, i)} className='flex flex-row w-full h-8 justify-center items-center cursor-pointer' style={{backgroundColor:`${color}`}}>
                    {x.bgcolor == color ? <IoCheckmark size={20}/> : <></> }
                  </span>
                })}
              </div>
              
              <button onClick={() => setListview(!listview)} className='flex justify-start items-center hover:bg-slate-200 py-1 px-2'>
                <IoList className='mr-2'></IoList> Notes List
              </button>
              <button className='flex justify-start items-center hover:bg-slate-200 py-1 px-2'>
                <IoTrash onClick={() => deleteNote(i)} className='mr-2'></IoTrash> Delete Note
              </button>
              </div>
              }
              <textarea value={x.text} onChange={(e) => updateNote(e.target.value, i)} className='w-full bg-transparent focus-visible:outline-none p-2' placeholder='Take a note...' name="" id="" rows={4}></textarea>
            </div>
          }
        })}
      </div>
    </div>
  )
}

export default App