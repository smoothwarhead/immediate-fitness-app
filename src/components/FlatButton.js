const FlatButton = ({ name, cName }) => {
    return ( 
        <>
            <div className={`flat_btn ${cName}`}>{name}</div>
        </>
     );
}
 
export default FlatButton;