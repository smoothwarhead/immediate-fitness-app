import { useState, useCallback  } from "react";

const ItemForm = ({ addItem, placeholder }) => {

    
    const[newItem, setNewItem] = useState({
        id: "",
        item: ""
    });

    const handleItemChange = useCallback(e => {
        const value = e.target.value;
        setNewItem({ ...newItem, item: value})
    }, [newItem]);


    const handleSubmit = (e) => {

        e.preventDefault();
        const id = Math.floor(Math.random() * 10000);

        
        if(newItem.item.trim()){

            addItem({ ...newItem, id: id});

            // reset task input
            setNewItem({ ...newItem, item: ""})
            
        }
    }


    return ( 
        <>
            <div className="add_item_container">
                <input 
                    type="text"
                    className="add_item_input"
                    name="item"
                    value={newItem.item}
                    onChange={handleItemChange}
                    placeholder={placeholder}
                />
                <button className="add_item_input_btn"onClick={handleSubmit}>Add</button>
            </div>
        
        </>
     );
}
 
export default ItemForm;