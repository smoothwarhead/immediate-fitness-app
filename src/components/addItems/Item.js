import { FaTimes } from 'react-icons/fa';

const Item = ({ newItem, removeItem }) => {

    const handleRemoveItem = () =>{
        removeItem(newItem.id);
    }
    return (  
        <>
            <div className="one_item">
                {newItem.item}
                <div className="item_cancel_icon" onClick={handleRemoveItem}><FaTimes /></div>
            </div>
        </>
    );
}
 
export default Item;