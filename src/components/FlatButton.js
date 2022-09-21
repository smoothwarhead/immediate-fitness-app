const FlatButton = ({ name, cName, action }) => {
    return ( 
        <>
            <div className={`flat_btn ${cName}`} onClick={action}>{name}</div>
        </>
     );
}
 
export default FlatButton;