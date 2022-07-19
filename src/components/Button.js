
const Button = ({ cName, name, click }) => {
  


// const makeActive = (name) => {
//     setActive(!active);
//     console.log(name.target.innerText);
// }


    return ( 
        <div className={cName} onClick={click}>{name}</div>
     );
}
 
export default Button;