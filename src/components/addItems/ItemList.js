import Item from './Item';


const ItemList = ({ items, removeItem }) => {


    

    return ( 
        <>
            <div className="item_list">
                {items.map((item) => (
                    <Item key={item.id} newItem={item} removeItem={removeItem} />
                ))}
            </div>
        </>
     );
}
 
export default ItemList;