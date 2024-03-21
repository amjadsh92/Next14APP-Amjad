"use client"
import { useState } from 'react'
import Styles from "./to-do-app.module.css"



export default function TodoApp() {

  const [items, setItems] = useState([])
  const [itemToShow, setItemToShow] = useState(null)


  function addItem(itemtoadd) {
    setItems([...items, itemtoadd])
  }

  function removeItem(idOfElementToRemove) {
    if (itemToShow !== null) {
      if (idOfElementToRemove === itemToShow.id) {
        setItemToShow(null)
      }
    }

    setItems(items.filter(i => i.id !== idOfElementToRemove))
  }

  function showItem(idToShow) {
    items.map((i) => {
      if (i.id === idToShow) {
        return (setItemToShow(i))
      }
    })
  }

  function hideItem() {
    setItemToShow(null)
  }

  return (
  
    
    <div className={Styles.main}>
      <h2 className={Styles.title}>Welcome to To-do-list application!</h2>
      <TodoItem newItem={addItem} />
      <TodoOverviewList items={items} toDelete={removeItem} toShow={showItem} />
      <TodoItemDetails showitem={itemToShow} hide={hideItem} />
    </div>
  );
  
}

function TodoItem({ newItem }) {
  const [val, setVal] = useState('')
  const [des, setDes] = useState('')

  const task = { id: crypto.randomUUID(), name: val, description: des }

  const handleVal = (event) => {
    setVal(event.target.value)
  }

  const handleDescription = (event) => {
    setDes(event.target.value)
  }

  function handleClick() {
    newItem(task);
    setVal('');
    setDes('');
  }

  return (<>
    <fieldset className={Styles.fieldset}>
      <legend className={Styles.legend}>To-do</legend>
      <label className={Styles.label}>
        Enter task:<br />
        <input type="text" value={val} onChange={handleVal} />
      </label>
      <input type="submit" value="Add" onClick={handleClick} className={Styles.button} /><br />

      <label for="description" className={Styles.label} >
        Enter description:<br />
        <textarea id="description" name="description" type="text" value={des} onChange={handleDescription} className={Styles.largeinput}></textarea>
      </label>
    </fieldset>
  </>);
}

function TodoOverviewList({ items, toDelete, toShow }) {
  return (<>
    <fieldset className={Styles.fieldset}>
      <legend className={Styles.legend}>  To-do-items</legend>
      {items.map((it) => < RenderOverviewList item={it} toDelete={toDelete} toShow={toShow} key={it.id} />
      )}
    </fieldset>
  </>)
}

function RenderOverviewList({ item, toDelete, toShow }) {
  return (<>
    <div key={item.id} className={Styles.div1} >
      <p className={Styles.task}> Task: {item.name} </p>
      <button className={Styles.button} type="submit" onClick={() => toDelete(item.id)} > Delete </button>
      <button className={Styles.button} type="submit" onClick={() => toShow(item.id)} > Show </button>
    </div>
  </>)
}

function TodoItemDetails({ showitem, hide }) {
  return (<>
    <fieldset className={Styles.fieldset}>
      <legend className={Styles.legend}> Details</legend>
      <RenderItemDetails showitem={showitem} hide={hide} />
    </fieldset>
  </>)
}

function RenderItemDetails({ showitem, hide }) {
  if (showitem !== null) {
    return (<div className={Styles.div} ><ul className={Styles.ul} >
      <li   >Item ID:<p style={{ color: "Maroon" }} >{showitem.id}</p></li>
      <li>Item title:<p style={{ color: "Maroon" }}>{showitem.name}</p></li>
      <li> Item description:<p style={{ color: "Maroon" }}>{showitem.description}</p></li>
    </ul>
      <button className={Styles.hide} type="submit" onClick={hide} > Hide </button>
    </div>)
  }
}
